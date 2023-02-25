declare const useStyles: (data?: {
    theme?: Jss.Theme | undefined;
} | undefined) => import("jss").Classes<"small" | "Button" | "solid" | "hover">;
export default useStyles;
