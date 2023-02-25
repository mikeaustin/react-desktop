declare const useAlignVerticalStyles: (data?: {
    theme?: Jss.Theme | undefined;
} | undefined) => import("jss").Classes<"center" | "start" | "end">;
declare const useAlignHorizontalStyles: (data?: {
    theme?: Jss.Theme | undefined;
} | undefined) => import("jss").Classes<"center" | "start" | "end">;
export { useAlignVerticalStyles, useAlignHorizontalStyles, };
