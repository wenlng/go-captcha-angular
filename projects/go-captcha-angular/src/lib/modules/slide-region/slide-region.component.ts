import {Component, ElementRef, Input, ViewChild, ViewEncapsulation} from '@angular/core'
import {checkTargetFather, mergeTo} from "../../helper/helper";
import {defaultSlideRegionConfig, SlideRegionConfig, SlideRegionData, SlideRegionEvent} from "./slide-region-instance";

@Component({
    selector: 'go-captcha-slide-region',
    templateUrl: 'slide-region.component.html',
    styleUrls: ['slide-region.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class SlideRegionComponent {
    @Input()
    localConfig?: SlideRegionConfig = defaultSlideRegionConfig()
    @Input()
    localData: SlideRegionData = {
        thumbX: 0,
        thumbY: 0,
        thumbWidth: 0,
        thumbHeight: 0,
        image: "",
        thumb: ""
    } as SlideRegionData
    @Input()
    localEvents?: SlideRegionEvent = {}

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

    state: {x: number, y: number} = {x: this.localData.thumbX || 0, y: this.localData.thumbY || 0}
    isFreeze: boolean = false

    @Input()
    set config(config: SlideRegionConfig) {
        mergeTo(this.localConfig, config)
        this.localConfig = config
    }

    @Input()
    set data(data: SlideRegionData) {
        mergeTo(this.localData, data)
        this.localData = data
        this.updateState()
    }

    @Input()
    set events(events: SlideRegionEvent) {
        mergeTo(this.localEvents, events)
        this.localEvents = events
    }

    get hasDisplayWrapperState() {
        return (this.localConfig.width || 0) > 0 || (this.localConfig.height || 0) > 0
    }

    get hasDisplayImageState() {
        return this.localData.image != '' && this.localData.thumb != ''
    }

    ngAfterViewInit() {
        this.tileRef.nativeElement.addEventListener('dragstart', (event: any) => event.preventDefault());
    }

    updateState() {
        if (!this.isFreeze) {
            this.state.x = (this.localData.thumbX || 0)
            this.state.y = (this.localData.thumbY || 0)
        }
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
            this.localEvents.move && this.localEvents.move(left, top)

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

            if (tileLeft < 0 || tileTop < 0) {
                return
            }

            this.localEvents.confirm && this.localEvents.confirm({x: tileLeft, y: tileTop}, () => {
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
        this.state.x = this.localData.thumbX || 0
        this.state.y = this.localData.thumbY || 0
    }

    clear(){
        this.reset()
        this.localData.image = ''
        this.localData.thumb = ''
        this.localData.thumbX = 0
        this.localData.thumbY = 0
        this.localData.thumbHeight = 0
        this.localData.thumbWidth = 0
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
