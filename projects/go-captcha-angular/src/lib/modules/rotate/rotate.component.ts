import {Component, ElementRef, Input, ViewChild, ViewEncapsulation} from '@angular/core'
import {checkTargetFather} from "../../helper/helper";
import {defaultRotateConfig, RotateConfig, RotateData, RotateEvent} from "./rotate-instance";

@Component({
    selector: 'go-captcha-rotate',
    templateUrl: 'rotate.component.html',
    styleUrls: ['rotate.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class RotateComponent {
    @Input()
    config?: RotateConfig = defaultRotateConfig()
    @Input()
    data: RotateData = {angle: 0, image: "", thumb: ""} as RotateData
    @Input()
    events?: RotateEvent = {}

    @ViewChild('dragBlockRef', {static: false})
    dragBlockRef: ElementRef

    @ViewChild('dragBarRef', {static: false})
    dragBarRef: ElementRef

    dragLeft: number = 0
    thumbAngle: number = this.data.angle || 0

    ngAfterViewInit() {
        this.dragBlockRef.nativeElement.addEventListener('dragstart', (event: any) => event.preventDefault());
    }

    clear = () => {
        this.dragLeft = 0
        this.thumbAngle = 0
    }

    dragEvent = (e: Event|any) => {
        const touch = e.touches && e.touches[0];

        const offsetLeft = this.dragBlockRef.nativeElement.offsetLeft
        const width = this.dragBarRef.nativeElement.offsetWidth
        const blockWidth = this.dragBlockRef.nativeElement.offsetWidth
        const maxWidth = width - blockWidth
        const p = 360 / maxWidth

        let angle = 0
        let isMoving = false
        let tmpLeaveDragEvent: Event|any = null
        let startX = 0;
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
                this.dragLeft = maxWidth
                return
            }

            if (left <= 0) {
                this.dragLeft = 0
                return
            }

            this.dragLeft = left
            angle = (left * p)
            this.thumbAngle = angle

            this.events.rotate && this.events.rotate(angle)

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

            isMoving = false
            clearEvent()
            this.events.confirm && this.events.confirm(parseInt(angle.toString()), () => {
                this.clear()
            })

            e.cancelBubble = true
            e.preventDefault()
        }

        const leaveDragBlockEvent = (e: Event|any) => {
            tmpLeaveDragEvent = e
        }

        const enterDragBlockEvent = () => {
            tmpLeaveDragEvent = null
        }

        const leaveUpEvent = (_: Event|any) => {
            if(!tmpLeaveDragEvent) {
                return
            }

            upEvent(tmpLeaveDragEvent)
            clearEvent()
        }

        const clearEvent = () => {
            this.dragBarRef.nativeElement.removeEventListener("mousemove", moveEvent, false)
            this.dragBarRef.nativeElement.removeEventListener("touchmove", moveEvent, { passive: false })

            this.dragBarRef.nativeElement.removeEventListener( "mouseup", upEvent, false)
            // this.dragBarRef.nativeElement.removeEventListener( "mouseout", upEvent, false)
            this.dragBarRef.nativeElement.removeEventListener( "mouseenter", enterDragBlockEvent, false)
            this.dragBarRef.nativeElement.removeEventListener( "mouseleave", leaveDragBlockEvent, false)
            this.dragBarRef.nativeElement.removeEventListener("touchend", upEvent, false)

            document.body.removeEventListener("mouseleave", upEvent, false)
            document.body.removeEventListener("mouseup", leaveUpEvent, false)
        }

        this.dragBarRef.nativeElement.addEventListener("mousemove", moveEvent, false)
        this.dragBarRef.nativeElement.addEventListener("touchmove", moveEvent, { passive: false })
        this.dragBarRef.nativeElement.addEventListener( "mouseup", upEvent, false)
        // this.dragBarRef.nativeElement.addEventListener( "mouseout", upEvent, false)
        this.dragBarRef.nativeElement.addEventListener( "mouseenter", enterDragBlockEvent, false)
        this.dragBarRef.nativeElement.addEventListener( "mouseleave", leaveDragBlockEvent, false)
        this.dragBarRef.nativeElement.addEventListener("touchend", upEvent, false)

        document.body.addEventListener("mouseleave", upEvent, false)
        document.body.addEventListener("mouseup", leaveUpEvent, false)
    }

    closeEvent = (e: Event|any) => {
        this.events.close && this.events.close()
        this.clear()
        e.cancelBubble = true
        e.preventDefault()
        return false
    }

    refreshEvent = (e: Event|any) => {
        this.events.refresh && this.events.refresh()
        this.clear()
        e.cancelBubble = true
        e.preventDefault()
        return false
    }

}
