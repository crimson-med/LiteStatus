interface Status {
    online: boolean
    info: string
}

interface WeekGraphConfig {
    externalBorder: boolean
    internalBorder: boolean
}

const defaultWeekConfig: WeekGraphConfig = {
    externalBorder: true,
    internalBorder: true
}


interface DivParam {
    content?: string
    classes?: string | string[]
}

export class WeekGraph {
    data: Status[]
    source: HTMLElement
    foundSource: boolean = false
    currentConfig: WeekGraphConfig
    constructor(data: Status[], source: string, configWeekGraph: WeekGraphConfig | null = null) {
        if (configWeekGraph && configWeekGraph !== null) {
            this.currentConfig = { ...defaultWeekConfig, ...configWeekGraph }
        } else {
            this.currentConfig = defaultWeekConfig
        }
        try {
            const sourceElement = document.getElementById(source);
            this.foundSource = (sourceElement) ? true : false
            if (this.foundSource) {
                console.log(`source was found`)
                this.source = sourceElement
            }
        } catch (error) {
            console.log(`Could not locate source`)
            return null
        }
        const wrappingDiv = createDiv({ classes: ["week-graph", (this.currentConfig.externalBorder) ? "border" : ""] })
        data.map(element => {
            const dayInfo = createDiv({ content: element.info, classes: "info" })
            const day = createDiv({ classes: ["day", (element.online) ? "online" : "offline", (this.currentConfig.internalBorder) ? "border" : ""] })
            day.append(dayInfo)
            wrappingDiv.append(day)
        })
        this.source.append(wrappingDiv)
    }
}

export function getDaysInMonth(month: number, year: number) {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days;
}


function createDiv(divParam: DivParam) {
    let workingDiv = document.createElement('div');
    if (divParam && divParam.content) {
        workingDiv.textContent = divParam.content
    }
    if (divParam && divParam.classes && Array.isArray(divParam.classes)) {
        workingDiv.setAttribute('class', divParam.classes.join(" "));
    }
    if (divParam && divParam.classes && typeof divParam.classes === "string") {
        workingDiv.setAttribute('class', divParam.classes);
    }
    return workingDiv
}