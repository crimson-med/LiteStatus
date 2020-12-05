interface Status {
    online: boolean
    info: string
    date?: Date
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
    id?: string
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



export class MonthGraph {
    data: Status[]
    source: HTMLElement
    foundSource: boolean = false
    currentConfig: WeekGraphConfig
    initDate: Date
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
                this.source = sourceElement
                this.initDate = new Date()
                this.data = data
                this.render()
                this.renderStatus()
            }
        } catch (error) {
            console.log(error)
            console.log(`Could not locate source`)
            return null
        }
    }

    render() {
        const wrappingDiv = createDiv({ classes: ["month-graph", (this.currentConfig.externalBorder) ? "border" : ""] })
        for (let i = 0; i < 5; i++) {
            const weekDiv = createDiv({ id: `week-${i}`, classes: ["week", (this.currentConfig.externalBorder) ? "border" : ""] })
            for (let j = 1; j < 7; j++) {
                const dayDiv = createDiv({ id: `week-${i}-day-${j}`, classes: ["weekday", "disabled", (this.currentConfig.externalBorder) ? "border" : ""] })
                weekDiv.append(dayDiv)
            }
            // handle sunday
            const dayDiv = createDiv({ id: `week-${i}-day-7`, classes: ["weekday", "disabled", (this.currentConfig.externalBorder) ? "border" : ""] })
            weekDiv.append(dayDiv)
            wrappingDiv.append(weekDiv)
        }
        this.source.append(wrappingDiv)
    }

    renderStatus() {
        this.data.forEach(element => {
            const week = getWeekOfMonth(element.date)
            const day = (element.date.getDay() === 0) ? 7 : element.date.getDay();
            const dateDiv = document.getElementById(`week-${week}-day-${day}`);
            if (dateDiv) {
                dateDiv.classList.remove("disabled")
                dateDiv.classList.add((element.online) ? "online" : "offline")
                //element.classList.remove("mystyle");
            }
        });
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

// german version - week starts with monday
export function getWeekOfMonth(date: Date) {
    var firstWeekday = new Date(date.getFullYear(), date.getMonth(), 1).getDay() - 1;
    if (firstWeekday < 0) firstWeekday = 6;
    var offsetDate = date.getDate() + firstWeekday - 1;
    return Math.floor(offsetDate / 7);
}



function createDiv(divParam: DivParam) {
    let workingDiv = document.createElement('div');
    if (divParam && divParam.content) {
        workingDiv.textContent = divParam.content
    }
    if (divParam && divParam.classes && Array.isArray(divParam.classes)) {
        workingDiv.setAttribute('class', divParam.classes.join(" "));
    }
    if (divParam && divParam.id) {
        workingDiv.setAttribute('id', divParam.id);
    }
    if (divParam && divParam.classes && typeof divParam.classes === "string") {
        workingDiv.setAttribute('class', divParam.classes);
    }
    return workingDiv
}