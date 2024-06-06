import {Component, Input, ViewEncapsulation} from '@angular/core'
import {ClickConfig, ClickData, ClickDot, ClickEvent, defaultClickConfig} from "./click-instance";
import {getDomXY} from "../../helper/helper";

@Component({
    selector: 'go-captcha-click',
    templateUrl: 'click.component.html',
    styleUrls: ['click.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ClickComponent {
    @Input()
    config?: ClickConfig = defaultClickConfig()
    @Input()
    data: ClickData = {image: "", thumb: ""} as ClickData
    @Input()
    events?: ClickEvent = {}

    dots: Array<ClickDot> = []


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
        const list = this.dots
        list.push({key: date.getTime(), index: index + 1, x: xx, y: yy})
        this.dots = list

        this.events.click && this.events.click(xx, yy)
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

        this.events.confirm && this.events.confirm(dots, () => {
            this.dots = []
        })
        e.cancelBubble = true
        e.preventDefault()
        return false
    }

    closeEvent(e: Event|any){
        this.events.close && this.events.close()
        this.dots = []
        e.cancelBubble = true
        e.preventDefault()
        return false
    }

    refreshEvent(e: Event|any){
        this.events.refresh && this.events.refresh()
        this.dots = []
        e.cancelBubble = true
        e.preventDefault()
        return false
    }
}
