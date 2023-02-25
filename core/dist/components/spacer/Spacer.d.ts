/// <reference types="react" />
import View from '../view/index.js';
import Spacing from '../../types/Spacing';
import Color from '../../types/Color';
interface SpacerProps extends React.ComponentProps<typeof View> {
    size: Spacing;
    color?: Color;
}
declare const Spacer: ({ size, color, ...props }: SpacerProps) => JSX.Element;
export default Spacer;
