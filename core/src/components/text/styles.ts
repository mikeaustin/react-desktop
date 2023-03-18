import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  Text: {
    display: 'block',
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Consolas', 'Droid Sans', 'Helvetica Neue',
    sans-serif`,
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    cursor: 'default',
    '&[contenteditable], &:active': {
      cursor: 'text'
    }
  },
  textParent: {
    display: 'inline',
  },
  flex: {
    flex: 1,
  },
  light: {
    opacity: 0.6,
  },
  caps: {
    textTransform: 'uppercase',
  },
  hidden: {
    display: 'none',
  },
  noEvents: {
    pointerEvents: 'none',
  },
  center: {
    textAlign: 'center',
  }
});

export {
  useStyles,
};
