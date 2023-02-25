/// <reference types="react" />
import View from '../view/index.js';
import Spacing from '../../types/Spacing.js';
import Color from '../../types/Color.js';
interface DividerProps extends React.ComponentProps<typeof View> {
    color?: Color | 'theme-divider';
    spacing?: Spacing;
}
declare const Divider: ({ color, spacing, ...props }: DividerProps) => JSX.Element;
export default Divider;
