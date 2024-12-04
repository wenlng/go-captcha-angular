import {Component, ElementRef, Input, ViewChild, ViewEncapsulation} from '@angular/core'
import {checkTargetFather, mergeTo} from "../../helper/helper";
import {defaultRotateConfig, defaultRotateData, RotateConfig, RotateData, RotateEvent} from "./rotate-instance";

@Component({
    selector: 'go-captcha-rotate',
    templateUrl: 'rotate.component.html',
    styleUrls: ['rotate.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class RotateComponent {
    localConfig?: RotateConfig = defaultRotateConfig()
    localData: RotateData = defaultRotateData()
    localEvents?: RotateEvent = {}

    @ViewChild('rootRef', {static: false})
    rootRef: ElementRef

    @ViewChild('dragBlockRef', {static: false})
    dragBlockRef: ElementRef

    @ViewChild('dragBarRef', {static: false})
    dragBarRef: ElementRef

    dragLeft: number = 0
    thumbAngle: number = this.localData.angle || 0
    isFreeze: boolean = false

    @Input()
    set config(config: RotateConfig) {
        mergeTo(this.localConfig, config)
        this.localConfig = config
    }

    @Input()
    set data(data: RotateData) {
        mergeTo(this.localData, data)
        this.localData = data
        this.updateState()
    }

    @Input()
    set events(events: RotateEvent) {
        mergeTo(this.localEvents, events)
        this.localEvents = events
    }

    get hasDisplayWrapperState() {
        return (this.localConfig.width || 0) > 0 || (this.localConfig.height || 0) > 0
    }

    get hasDisplayImageState() {
        return this.localData.image != '' || this.localData.thumb != ''
    }

    get size() {
        return (this.localConfig.size || 0) > 0 ? this.localConfig.size : defaultRotateConfig().size
    }

    private dsFn = (event: any) => event.preventDefault()
    ngAfterViewInit() {
        this.dragBlockRef.nativeElement && this.dragBlockRef.nativeElement.addEventListener('dragstart', this.dsFn);
    }

    ngOnDestroy() {
        this.dragBlockRef.nativeElement && this.dragBlockRef.nativeElement.removeEventListener('dragstart', this.dsFn);
    }

    updateState() {
        if (!this.isFreeze) {
            this.thumbAngle = (this.localData.angle || 0)
        }
    }

    dragEvent = (e: Event|any) => {
        if (!checkTargetFather(this.dragBarRef.nativeElement, e)) {
            return
        }

        const touch = e.touches && e.touches[0];

        const offsetLeft = this.dragBlockRef.nativeElement.offsetLeft
        const width = this.dragBarRef.nativeElement.offsetWidth
        const blockWidth = this.dragBlockRef.nativeElement.offsetWidth
        const maxWidth = width - blockWidth
        const maxAngle = 360
        const p = (maxAngle - this.localData.angle) / maxWidth

        let angle = 0
        let isMoving = false
        let tmpLeaveDragEvent: Event|any = null
        let startX = 0;
        let currentAngle = 0
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

            angle = this.localData.angle + (left * p)

            if (left >= maxWidth) {
                this.dragLeft = maxWidth
                this.thumbAngle = currentAngle = maxAngle
                return
            }

            if (left <= 0) {
                this.dragLeft = 0
                this.thumbAngle = currentAngle = this.localData.angle
                return
            }

            this.dragLeft = left
            currentAngle = angle
            this.thumbAngle = angle

            this.localEvents.rotate && this.localEvents.rotate(angle)

            e.cancelBubble = true
            e.preventDefault()
        }

        const upEvent = (e: Event|any) => {
            if (!checkTargetFather(this.dragBarRef.nativeElement, e)) {
                return
            }

            clearEvent()
            if (!isMoving) {
                return
            }

            isMoving = false

            if (currentAngle < 0) {
                return
            }

            this.localEvents.confirm && this.localEvents.confirm(parseInt(currentAngle.toString()), () => {
                this.reset()
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

        const scope = this.localConfig.scope
        const dragDom = scope ? this.rootRef.nativeElement : this.dragBarRef.nativeElement
        const scopeDom = scope ? this.rootRef.nativeElement : document.body

        const clearEvent = () => {
            scopeDom.removeEventListener("mousemove", moveEvent, false)
            scopeDom.removeEventListener("touchmove", moveEvent, { passive: false })

            dragDom.removeEventListener( "mouseup", upEvent, false)
            dragDom.removeEventListener( "mouseenter", enterDragBlockEvent, false)
            dragDom.removeEventListener( "mouseleave", leaveDragBlockEvent, false)
            dragDom.removeEventListener("touchend", upEvent, false)

            scopeDom.removeEventListener("mouseleave", upEvent, false)
            scopeDom.removeEventListener("mouseup", leaveUpEvent, false)
        }

        scopeDom.addEventListener("mousemove", moveEvent, false)
        scopeDom.addEventListener("touchmove", moveEvent, { passive: false })

        dragDom.addEventListener( "mouseup", upEvent, false)
        dragDom.addEventListener( "mouseenter", enterDragBlockEvent, false)
        dragDom.addEventListener( "mouseleave", leaveDragBlockEvent, false)
        dragDom.addEventListener("touchend", upEvent, false)

        scopeDom.addEventListener("mouseleave", upEvent, false)
        scopeDom.addEventListener("mouseup", leaveUpEvent, false)
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
        this.dragLeft = 0
        this.thumbAngle = this.localData.angle
    }

    clear(){
        this.reset()
        setTimeout(()=> {
            this.localData.image = ''
            this.localData.thumb = ''
            this.localData.angle = 0
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
