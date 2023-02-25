declare const useFontWeightStyles: (data?: {
    theme?: Jss.Theme | undefined;
} | undefined) => import("jss").Classes<"bold" | "normal" | "medium" | "light" | "semi-bold" | "extra-bold">;
export { useFontWeightStyles };
