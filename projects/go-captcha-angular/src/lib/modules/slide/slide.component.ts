import {Component, ElementRef, Input, ViewChild, ViewEncapsulation} from '@angular/core'
import {checkTargetFather} from "../../helper/helper";
import {defaultSlideConfig, SlideConfig, SlideData, SlideEvent} from "./slide-instance";

@Component({
    selector: 'go-captcha-slide',
    templateUrl: 'slide.component.html',
    styleUrls: ['slide.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class SlideComponent {
    @Input()
    config?: SlideConfig = defaultSlideConfig()
    @Input()
    data: SlideData = {
        thumbX: 0,
        thumbY: 0,
        thumbWidth: 0,
        thumbHeight: 0,
        image: "",
        thumb: ""
    } as SlideData
    @Input()
    events?: SlideEvent = {}

    @ViewChild('containerRef', {static: false})
    containerRef: ElementRef

    @ViewChild('dragBlockRef', {static: false})
    dragBlockRef: ElementRef

    @ViewChild('dragBarRef', {static: false})
    dragBarRef: ElementRef

    @ViewChild('tileRef', {static: false})
    tileRef: ElementRef

    state: {dragLeft: number, thumbLeft: number} = {dragLeft: 0, thumbLeft: this.data.thumbX || 0}

    ngAfterViewInit() {
        this.dragBlockRef.nativeElement.addEventListener('dragstart', (event: any) => event.preventDefault());
    }

    clear = () => {
        this.state.dragLeft = 0
        this.state.thumbLeft = 0
    }

    dragEvent (e: Event|any) {
        const touch = e.touches && e.touches[0];
        const offsetLeft = this.dragBlockRef.nativeElement.offsetLeft
        const width = this.containerRef.nativeElement.offsetWidth
        const blockWidth = this.dragBlockRef.nativeElement.offsetWidth
        const maxWidth =width - blockWidth
        const thumbX = this.data.thumbX || 0

        const tileWith  = this.tileRef.nativeElement.offsetWidth
        const ad = blockWidth - tileWith
        const ratio = ((maxWidth - thumbX) + ad) / maxWidth

        let isMoving = false
        let startX = 0
        let currentThumbX = 0
        if (touch) {
            startX = touch.pageX - offsetLeft
        } else {
            startX = e.clientX - offsetLeft
        }

        const moveEvent = (e: Event|any) => {
            isMoving = true
            const mTouche = e.touches && e.touches[0];

            let left = 0;
            if (mTouche) {
                left = mTouche.pageX - startX
            } else {
                left = e.clientX - startX
            }

            if (left >= maxWidth) {
                this.state.dragLeft = maxWidth
                return
            }

            if (left <= 0) {
                this.state.dragLeft = 0
                return
            }

            this.state.dragLeft = left
            currentThumbX = thumbX + (left * ratio)
            this.state.thumbLeft = currentThumbX

            this.events.move && this.events.move(currentThumbX, this.data.thumbY || 0)

            e.cancelBubble = true
            e.preventDefault()
        }

        const upEvent = (e: Event|any) => {
            if (!checkTargetFather(this.dragBarRef.nativeElement, e)) {
                return
            }

            if (!isMoving) {
                return
            }

            this.dragBarRef.nativeElement.removeEventListener("mousemove", moveEvent, false)
            this.dragBarRef.nativeElement.removeEventListener("touchmove", moveEvent, { passive: false })

            this.dragBarRef.nativeElement.removeEventListener( "mouseup", upEvent, false)
            this.dragBarRef.nativeElement.removeEventListener( "mouseout", upEvent, false)
            this.dragBarRef.nativeElement.removeEventListener("touchend", upEvent, false)

            isMoving = false
            this.events.confirm && this.events.confirm({x: parseInt(currentThumbX.toString()), y: this.data.thumbY || 0}, () => {
                this.clear()
            })

            e.cancelBubble = true
            e.preventDefault()
        }

        this.dragBarRef.nativeElement.addEventListener("mousemove", moveEvent, false)
        this.dragBarRef.nativeElement.addEventListener("touchmove", moveEvent, { passive: false })
        this.dragBarRef.nativeElement.addEventListener( "mouseup", upEvent, false)
        this.dragBarRef.nativeElement.addEventListener( "mouseout", upEvent, false)
        this.dragBarRef.nativeElement.addEventListener("touchend", upEvent, false)
    }

    closeEvent(e: Event|any) {
        this.events.close && this.events.close()
        this.clear()
        e.cancelBubble = true
        e.preventDefault()
        return false
    }

    refreshEvent(e: Event|any) {
        this.events.refresh && this.events.refresh()
        this.clear()
        e.cancelBubble = true
        e.preventDefault()
        return false
    }


}
