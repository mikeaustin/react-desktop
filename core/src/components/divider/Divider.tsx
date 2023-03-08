import View from '../view/index.js';
import Spacer from '../spacer/index.js';

import Spacing from '../../types/Spacing.js';

import Color from '../../types/Color.js';

interface DividerProps extends React.ComponentProps<typeof View> {
  color?: Color | 'theme-divider',
  spacing?: Spacing,
  style?: React.CSSProperties,
}

const Divider = ({
  color = 'theme-divider',
  spacing,
  style,
  ...props
}: DividerProps) => {
  const dividerStyle = {
    minHeight: 1,
    minWidth: 1,
    ...style,
  };

  return (
    <>
      {spacing && <Spacer size={spacing} />}
      <View fillColor={color} style={dividerStyle} {...props} />
      {spacing && <Spacer size={spacing} />}
    </>
  );
};

export default Divider;
