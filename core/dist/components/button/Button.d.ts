import React from 'react';
import { IconName } from '@fortawesome/free-solid-svg-icons';
import View from '../view/index.js';
import Weight from '../../types/Weight.js';
import { ShorthandAlign } from '../../types/Align.js';
interface ButtonProps<TData = unknown> extends React.ComponentProps<typeof View> {
    icon?: IconName;
    title?: string;
    primary?: boolean;
    solid?: boolean;
    hover?: boolean;
    size?: 'small';
    data?: TData;
    disabled?: boolean;
    titleFontWeight?: Weight;
    titleAlign?: ShorthandAlign;
    className?: string;
    onClick?: (event: React.PointerEvent<HTMLDivElement>, data?: TData) => void;
}
declare function Button<TData>({ icon, title, primary, solid, hover, size, data, disabled, titleFontWeight, titleAlign, className, onClick, ...props }: ButtonProps<TData>): JSX.Element;
export default Button;
