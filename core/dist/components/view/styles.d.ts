declare const useStyles: (data?: {
    theme?: Jss.Theme | undefined;
} | undefined) => import("jss").Classes<"flex" | "View" | "horizontal">;
export default useStyles;
