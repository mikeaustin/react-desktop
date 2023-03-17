import React from 'react';
import Color from '../../types/Color.js';
import Weight from '../../types/Weight.js';
declare type Child<TProps> = string | number | React.ReactElement<TProps | HTMLBRElement>;
declare type Size = 'xsmall' | 'small' | 'default' | 'medium' | 'large' | 'xlarge';
interface TextProps extends React.ComponentProps<'span'> {
    flex?: boolean;
    contain?: boolean;
    light?: boolean;
    caps?: boolean;
    fontSize?: Size;
    fontWeight?: Weight;
    textColor?: Color | 'theme-text';
    textAlign?: 'center';
    autoFocus?: boolean;
    noEvents?: boolean;
    className?: string;
    testId?: string;
    children?: Child<TextProps> | Child<TextProps>[];
}
declare function Text({ flex, contain, light, caps, fontSize, fontWeight, textColor, textAlign, autoFocus, noEvents, className, testId, children, ...props }: TextProps): JSX.Element;
export default Text;
