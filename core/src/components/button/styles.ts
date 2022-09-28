import OpenColor from 'open-color';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  Button: {
    position: 'relative',
    appearance: 'none',
    border: 'none',
    outline: 'none',
    padding: '9px 12px',
    borderRadius: 2.5,

    // '&:focus': {
    //   boxShadow: `inset 0 0 0 2px ${OpenColor.blue[5]}`
    // },

    // '&:focus:before': {
    //   position: 'absolute',
    //   top: 0,
    //   right: 0,
    //   bottom: 0,
    //   left: 0,
    //   content: '""',
    //   borderRadius: 2.5,
    //   boxShadow: 'inset 0 0 0 2px hsla(0, 0%, 0%, 0.25)',
    // }

    '&:focus:before': {
      position: 'absolute',
      top: -1,
      right: -1,
      bottom: -1,
      left: -1,
      content: '""',
      // background: 'red'
      // border: '1px solid transparent',
      borderRadius: '3px',
      // border: `2px dotted ${OpenColor.gray[5]}`,
      // boxShadow: '0 0 0 2px hsla(0, 0%, 0%, 0.5)',
      boxShadow: `0 0 0 2px ${OpenColor.blue[5]}`
    }
  }
});

export default useStyles;
