import { createUseStyles } from 'react-jss';
var useStyles = createUseStyles({
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
    }
});
export default useStyles;
