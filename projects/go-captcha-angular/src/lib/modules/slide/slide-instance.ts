/**
 * @Author Awen
 * @Date 2024/05/25
 * @Email wengaolng@gmail.com
 **/

export interface SlideConfig {
    width?: number;
    height?: number;
    thumbWidth?: number;
    thumbHeight?: number;
    verticalPadding?: number;
    horizontalPadding?: number;
    showTheme?: boolean;
    title?: string;
}

export const defaultSlideConfig = ():SlideConfig => ({
    width: 300,
    height: 220,
    thumbWidth: 150,
    thumbHeight: 40,
    verticalPadding: 16,
    horizontalPadding: 12,
    showTheme: true,
    title: "请拖动滑块完成拼图",
})

export interface SlideData {
    thumbX: number;
    thumbY: number;
    thumbWidth: number;
    thumbHeight: number;
    image: string;
    thumb: string;
}

export interface SlidePoint {
    x: number,
    y: number,
}

export interface SlideEvent {
    move?: (x: number, y: number) => void;
    refresh?: () => void;
    close?: () => void;
    confirm?: (point: SlidePoint, clear:(fn: Function) => void) => void;
}

export interface SlideInstance {
    data: SlideData,
    config?: SlideConfig;
    events?: SlideEvent,
}
