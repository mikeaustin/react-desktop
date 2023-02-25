import { CSSProperties } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/free-solid-svg-icons';
import Color from '../../types/Color.js';
interface IconProps extends React.ComponentProps<typeof FontAwesomeIcon> {
    icon: IconName;
    color?: Color;
    style?: CSSProperties;
}
declare function Icon({ icon, color, style, ...props }: IconProps): JSX.Element;
export default Icon;
