import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  View: {
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
  },
  horizontal: {
    flexDirection: 'row',
  },
  flex: {
    flex: 1,
  },
  'hovered-a': {
    opacity: 0.0,
    transition: 'opacity 0.1s 0.1s',
  },
  'hoverable-a': {
    '@media (hover: hover)': {
      '&:hover $hovered-a': {
        opacity: 1.0,
      }
    }
  },
  'hovered-b': {
    opacity: 0.0,
    transition: 'opacity 0.1s 0.1s',
  },
  'hoverable-b': {
    '@media (hover: hover)': {
      '&:hover $hovered-b': {
        opacity: 1.0,
      }
    }
  },
});

export default useStyles;
