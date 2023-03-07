/// <reference types="react" />
import View from '../view/index.js';
import Spacing from '../../types/Spacing.js';
import Color from '../../types/Color.js';
interface DividerProps extends React.ComponentProps<typeof View> {
    color?: Color | 'theme-divider';
    spacing?: Spacing;
    style?: React.CSSProperties;
}
declare const Divider: ({ color, spacing, style, ...props }: DividerProps) => JSX.Element;
export default Divider;
