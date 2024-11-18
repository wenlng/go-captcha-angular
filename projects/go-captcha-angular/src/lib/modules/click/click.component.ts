import {Component, Input, ViewEncapsulation} from '@angular/core'
import {ClickConfig, ClickData, ClickDot, ClickEvent, defaultClickConfig, defaultData} from "./click-instance";
import {getDomXY, mergeTo} from "../../helper/helper";

@Component({
    selector: 'go-captcha-click',
    templateUrl: 'click.component.html',
    styleUrls: ['click.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ClickComponent {
    localConfig?: ClickConfig = defaultClickConfig()
    localData: ClickData = defaultData() as ClickData
    localEvents?: ClickEvent = {}

    dots: Array<ClickDot> = []

    @Input()
    set config(config: ClickConfig) {
        mergeTo(this.localConfig, config)
        this.localConfig = config
    }

    @Input()
    set data(data: ClickData) {
        mergeTo(this.localData, data)
        this.localData = data
    }

    @Input()
    set events(events: ClickEvent) {
        mergeTo(this.localEvents, events)
        this.localEvents = events
    }

    get hasDisplayWrapperState() {
        return (this.localConfig.width || 0) > 0 || (this.localConfig.height || 0) > 0
    }

    get hasDisplayImageState() {
        return this.localData.image != '' || this.localData.thumb != ''
    }

    clickEvent(e: Event|any){
        const dom = e.currentTarget
        const xy = getDomXY(dom)

        const mouseX = e.pageX || e.clientX
        const mouseY = e.pageY || e.clientY

        const domX = xy.domX
        const domY = xy.domY

        const xPos = mouseX - domX;
        const yPos = mouseY - domY;

        const xx = parseInt(xPos.toString())
        const yy = parseInt(yPos.toString())
        const date = new Date()
        const index = this.dots.length

        this.dots.push({key: date.getTime(), index: index + 1, x: xx, y: yy})

        this.localEvents.click && this.localEvents.click(xx, yy)
        e.cancelBubble = true
        e.preventDefault()
        return false
    }

    confirmEvent(e: Event|any) {
        const dotsStr = JSON.stringify(this.dots)
        let dots: Array<ClickDot> = []
        try {
            dots = JSON.parse(dotsStr)
        } catch (e) {
            console.warn("parse dots error", e)
        }

        this.localEvents.confirm && this.localEvents.confirm(dots, () => {
            this.dots = []
        })
        e.cancelBubble = true
        e.preventDefault()
        return false
    }

    closeEvent(e: Event|any){
        this.close()
        e.cancelBubble = true
        e.preventDefault()
        return false
    }

    refreshEvent(e: Event|any) {
        this.refresh()
        e.cancelBubble = true
        e.preventDefault()
        return false
    }

    reset(){
        this.dots = []
    }

    clear(){
        this.reset()
        setTimeout(()=> {
            this.localData.image = ''
            this.localData.thumb = ''
        }, 0)
    }

    close() {
        this.localEvents.close && this.localEvents.close()
        this.reset()
    }

    refresh() {
        this.localEvents.refresh && this.localEvents.refresh()
        this.reset()
    }
}
