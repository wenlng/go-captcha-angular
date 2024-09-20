import {Component, ElementRef, Input, ViewChild, ViewEncapsulation} from '@angular/core'
import {checkTargetFather} from "../../helper/helper";
import {defaultSlideRegionConfig, SlideRegionConfig, SlideRegionData, SlideRegionEvent} from "./slide-region-instance";

@Component({
    selector: 'go-captcha-slide-region',
    templateUrl: 'slide-region.component.html',
    styleUrls: ['slide-region.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class SlideRegionComponent {
    @Input()
    config?: SlideRegionConfig = defaultSlideRegionConfig()
    @Input()
    data: SlideRegionData = {
        thumbX: 0,
        thumbY: 0,
        thumbWidth: 0,
        thumbHeight: 0,
        image: "",
        thumb: ""
    } as SlideRegionData
    @Input()
    events?: SlideRegionEvent = {}

    @ViewChild('containerRef', {static: false})
    containerRef: ElementRef

    @ViewChild('dragBlockRef', {static: false})
    dragBlockRef: ElementRef

    @ViewChild('dragBarRef', {static: false})
    dragBarRef: ElementRef

    @ViewChild('tileRef', {static: false})
    tileRef: ElementRef

    state: {x: number, y: number} = {x: this.data.thumbX || 0, y: this.data.thumbY || 0}

    ngAfterViewInit() {
        this.tileRef.nativeElement.addEventListener('dragstart', (event: any) => event.preventDefault());
    }

    clear = () => {
        this.state.x = this.data.thumbX || 0
        this.state.y = this.data.thumbY || 0
    }

    dragEvent(e: Event|any) {
        const touch = e.touches && e.touches[0];
        const offsetLeft = this.tileRef.nativeElement.offsetLeft
        const offsetTop = this.tileRef.nativeElement.offsetTop
        const width = this.containerRef.nativeElement.offsetWidth
        const height = this.containerRef.nativeElement.offsetHeight
        const tileWidth = this.tileRef.nativeElement.offsetWidth
        const tileHeight = this.tileRef.nativeElement.offsetHeight
        const maxWidth = width - tileWidth
        const maxHeight = height - tileHeight

        let isMoving = false
        let tmpLeaveDragEvent: Event|any = null
        let startX = 0
        let startY = 0
        let tileLeft = 0
        let tileTop = 0
        if (touch) {
            startX = touch.pageX - offsetLeft
            startY = touch.pageY - offsetTop
        } else {
            startX = e.clientX - offsetLeft
            startY = e.clientY - offsetTop
        }

        const moveEvent = (e: Event|any) => {
            isMoving = true
            const mTouche = e.touches && e.touches[0];

            let left = 0;
            let top = 0;
            if (mTouche) {
                left = mTouche.pageX - startX
                top = mTouche.pageY - startY
            } else {
                left = e.clientX - startX
                top = e.clientY - startY
            }

            if (left <= 0) {
                left = 0
            }

            if (top <= 0) {
                top = 0
            }

            if (left >= maxWidth) {
                left = maxWidth
            }

            if (top >= maxHeight) {
                top = maxHeight
            }

            this.state.x = left
            this.state.y = top
            tileLeft = left
            tileTop = top
            this.events.move && this.events.move(left, top)

            e.cancelBubble = true
            e.preventDefault()
        }

        const upEvent = (e: Event|any) => {
            if (!checkTargetFather(this.containerRef.nativeElement, e)) {
                return
            }

            if (!isMoving) {
                return
            }
            isMoving = false
            clearEvent()

            this.events.confirm && this.events.confirm({x: tileLeft, y: tileTop}, () => {
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
            this.containerRef.nativeElement.removeEventListener("mousemove", moveEvent, false)
            this.containerRef.nativeElement.removeEventListener("touchmove", moveEvent, { passive: false })

            this.containerRef.nativeElement.removeEventListener( "mouseup", upEvent, false)
            // this.containerRef.nativeElement.removeEventListener( "mouseout", upEvent, false)
            this.containerRef.nativeElement.removeEventListener( "mouseenter", enterDragBlockEvent, false)
            this.containerRef.nativeElement.removeEventListener( "mouseleave", leaveDragBlockEvent, false)
            this.containerRef.nativeElement.removeEventListener("touchend", upEvent, false)

            document.body.removeEventListener("mouseleave", upEvent, false)
            document.body.removeEventListener("mouseup", leaveUpEvent, false)
        }

        this.containerRef.nativeElement.addEventListener("mousemove", moveEvent, false)
        this.containerRef.nativeElement.addEventListener("touchmove", moveEvent, { passive: false })
        this.containerRef.nativeElement.addEventListener( "mouseup", upEvent, false)
        // this.containerRef.nativeElement.addEventListener( "mouseout", upEvent, false)
        this.containerRef.nativeElement.addEventListener( "mouseenter", enterDragBlockEvent, false)
        this.containerRef.nativeElement.addEventListener( "mouseleave", leaveDragBlockEvent, false)
        this.containerRef.nativeElement.addEventListener("touchend", upEvent, false)

        document.body.addEventListener("mouseleave", upEvent, false)
        document.body.addEventListener("mouseup", leaveUpEvent, false)
    }

    closeEvent(e: Event|any){
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
