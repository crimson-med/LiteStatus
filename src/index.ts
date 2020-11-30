interface Status {
    online: boolean
    info: string
}

interface DivParam {
    content?: string
    classes?: string | string[]
}

export class WeekGraph {
    data: Status[]
    source: HTMLElement
    foundSource: boolean = false
    constructor(data: Status[], source: string) {
        console.log(`loaded constructor`)
        try {
            console.log(`trying to find source`)
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
        const wrappingDiv = createDiv({ classes: "flex" })
        data.map(element => {
            const dayInfo = createDiv({ content: element.info, classes: "info" })
            const day = createDiv({ classes: ["day", (element.online) ? "online" : "offline"] })
            day.append(dayInfo)
            wrappingDiv.append(day)
        })
        this.source.append(wrappingDiv)
    }
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