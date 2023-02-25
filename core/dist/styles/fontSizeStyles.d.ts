declare const useFontSizeStyles: (data?: {
    theme?: Jss.Theme | undefined;
} | undefined) => import("jss").Classes<"small" | "default" | "xsmall" | "medium" | "large" | "xlarge">;
export { useFontSizeStyles };
