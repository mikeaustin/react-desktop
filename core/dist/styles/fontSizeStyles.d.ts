declare const useFontSizeStyles: (data?: {
    theme?: Jss.Theme | undefined;
} | undefined) => import("jss").Classes<"xsmall" | "large" | "medium" | "small" | "default" | "xlarge">;
export { useFontSizeStyles };
