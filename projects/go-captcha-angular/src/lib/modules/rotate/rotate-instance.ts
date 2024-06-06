export interface RotateConfig {
    width?: number;
    height?: number;
    size?: number;
    verticalPadding?: number;
    horizontalPadding?: number;
    showTheme?: boolean;
    title?: string;
}

export const defaultRotateConfig = ():RotateConfig => ({
    width: 300,
    height: 220,
    size: 220,
    verticalPadding: 16,
    horizontalPadding: 12,
    showTheme: true,
    title: "请拖动滑块完成拼图",
})

export interface RotateData {
    angle: number;
    image: string;
    thumb: string;
}

export interface RotateEvent {
    rotate?: (angle: number) => void;
    refresh?: () => void;
    close?: () => void;
    confirm?: (angle: number, clear:(fn: Function) => void) => void;
}

export interface RotateInstance {
    data: RotateData,
    config?: RotateConfig;
    events?: RotateEvent,
}
