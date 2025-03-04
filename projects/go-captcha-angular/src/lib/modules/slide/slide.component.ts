import {Component, ElementRef, Input, SimpleChanges, ViewChild, ViewEncapsulation} from '@angular/core'
import {checkTargetFather, mergeTo, mergeToOver} from "../../helper/helper";
import {defaultSlideConfig, defaultSlideData, SlideConfig, SlideData, SlideEvent} from "./slide-instance";

@Component({
    selector: 'go-captcha-slide',
    templateUrl: 'slide.component.html',
    styleUrls: ['slide.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class SlideComponent {
    localConfig?: SlideConfig = {...defaultSlideConfig()}
    localData: SlideData = {...defaultSlideData()}
    localEvents?: SlideEvent = {}

    @ViewChild('rootRef', {static: false})
    rootRef: ElementRef

    @ViewChild('containerRef', {static: false})
    containerRef: ElementRef

    @ViewChild('dragBlockRef', {static: false})
    dragBlockRef: ElementRef

    @ViewChild('dragBarRef', {static: false})
    dragBarRef: ElementRef

    @ViewChild('tileRef', {static: false})
    tileRef: ElementRef

    state: {dragLeft: number, thumbLeft: number} = {dragLeft: 0, thumbLeft: this.localData.thumbX || 0}
    isFreeze: boolean = false

    @Input()
    set config(config: SlideConfig) {
        mergeTo(this.localConfig, config)
        this.localConfig = config
    }

    @Input()
    set data(data: SlideData) {
        mergeTo(this.localData, data)
        this.localData = data
        this.updateState()
    }

    @Input()
    set events(events: SlideEvent) {
        mergeTo(this.localEvents, events)
        this.localEvents = events
    }

    get hasDisplayWrapperState() {
        return (this.localConfig.width || 0) > 0 || (this.localConfig.height || 0) > 0
    }

    get hasDisplayImageState() {
        return (this.localData.image && this.localData.image.length > 0) || (this.localData.thumb && this.localData.thumb.length > 0)
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
            this.state.thumbLeft = (this.localData.thumbX || 0)
        }
    }

    dragEvent (e: Event|any) {
        if (!checkTargetFather(this.dragBarRef.nativeElement, e)) {
            return
        }

        const touch = e.touches && e.touches[0];
        const offsetLeft = this.dragBlockRef.nativeElement.offsetLeft
        const width = this.containerRef.nativeElement.offsetWidth
        const blockWidth = this.dragBlockRef.nativeElement.offsetWidth
        const maxWidth = width - blockWidth

        const tileWith  = this.tileRef.nativeElement.offsetWidth
        const tileOffsetLeft = this.tileRef.nativeElement.offsetLeft
        const containerMaxWidth = width - tileWith
        const tileMaxWith = width - (tileWith + tileOffsetLeft)
        const ratio = tileMaxWith / maxWidth

        let isMoving = false
        let tmpLeaveDragEvent: Event|any = null
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

            const ctX = tileOffsetLeft + (left * ratio)
            if (left >= maxWidth) {
                this.state.dragLeft = maxWidth
                currentThumbX = containerMaxWidth
                this.state.thumbLeft = currentThumbX
                return
            }

            if (left <= 0) {
                this.state.dragLeft = 0
                currentThumbX = tileOffsetLeft
                this.state.thumbLeft = currentThumbX
                return
            }

            this.state.dragLeft = left
            currentThumbX = currentThumbX = ctX
            this.state.thumbLeft = currentThumbX

            this.localEvents.move && this.localEvents.move(currentThumbX, this.localData.thumbY || 0)

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

            if (currentThumbX < 0) {
                return
            }

            this.localEvents.confirm && this.localEvents.confirm({x: parseInt(currentThumbX.toString()), y: this.localData.thumbY || 0}, () => {
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
            this.isFreeze = false
        }
        this.isFreeze = true

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
        this.state.dragLeft = 0
        this.state.thumbLeft = this.localData.thumbX || 0
    }

    clear(){
        this.reset()
        setTimeout(()=> {
            this.localData.image = ''
            this.localData.thumb = ''
            this.localData.thumbX = 0
            this.localData.thumbY = 0
            this.localData.thumbHeight = 0
            this.localData.thumbWidth = 0
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
