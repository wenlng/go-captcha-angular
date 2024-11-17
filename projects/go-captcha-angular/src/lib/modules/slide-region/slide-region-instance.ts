/**
 * @Author Awen
 * @Date 2024/06/01
 * @Email wengaolng@gmail.com
 **/

export interface SlideRegionRef {
    reset: () => void,
    clear: () => void,
    refresh: () => void,
    close: () => void,
}

export interface SlideRegionConfig {
    width?: number;
    height?: number;
    verticalPadding?: number;
    horizontalPadding?: number;
    showTheme?: boolean;
    title?: string;
    iconSize?: number;
    scope ?: boolean;
}

export const defaultSlideRegionConfig = ():SlideRegionConfig => ({
    width: 300,
    height: 220,
    verticalPadding: 16,
    horizontalPadding: 12,
    showTheme: true,
    title: "请拖动滑块完成拼图",
    iconSize: 22,
    scope: true,
})

export interface SlideRegionData {
    thumbX: number;
    thumbY: number;
    thumbWidth: number;
    thumbHeight: number;
    image: string;
    thumb: string;
}

export interface SlideRegionPoint {
    x: number,
    y: number,
}

export interface SlideRegionEvent {
    move?: (x: number, y: number) => void;
    refresh?: () => void;
    close?: () => void;
    confirm?: (point: SlideRegionPoint, clear:(fn: Function) => void) => void;
}

export interface SlideRegionInstance {
    data: SlideRegionData,
    config?: SlideRegionConfig;
    events?: SlideRegionEvent,
}
