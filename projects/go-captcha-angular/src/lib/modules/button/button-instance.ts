export interface ButtonConfig {
    width?: number;
    height?: number;
    verticalPadding?: number;
    horizontalPadding?: number;
}

export const defaultButtonConfig = ():ButtonConfig => ({
    width: 330,
    height: 44,
    verticalPadding: 12,
    horizontalPadding: 16,
})

export type ButtonType = "default" | "warn" | "error" | "success";

export interface ButtonInstance {
    config?: ButtonConfig;
    clickEvent?: () => void;
    disabled?: boolean;
    type?: ButtonType;
    title?: string;
}
