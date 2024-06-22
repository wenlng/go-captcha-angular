
export interface ClickConfig {
    width?: number;
    height?: number;
    thumbWidth?: number;
    thumbHeight?: number;
    verticalPadding?: number;
    horizontalPadding?: number;
    showTheme?: boolean;
    title?: string;
    buttonText?: string;
}

export const defaultClickConfig = ():ClickConfig => ({
    width: 300,
    height: 220,
    thumbWidth: 150,
    thumbHeight: 40,
    verticalPadding: 16,
    horizontalPadding: 12,
    showTheme: true,
    title: "请在下图依次点击",
    buttonText: "确认"
})

export interface ClickData {
    image: string;
    thumb: string;
}

export interface ClickDot {
    key: number,
    index: number,
    x: number,
    y: number,
}

export interface ClickEvent {
    click?: (x: number, y: number) => void;
    callback?: () => void;
    refresh?: () => void;
    close?: () => void;
    confirm?:(dots: Array<ClickDot>, clear:(fn: Function) => void) => void;
}

export interface ClickInstance {
    data: ClickData,
    config?: ClickConfig;
    events?: ClickEvent,
}
