import OpenColor from 'open-color';
import { createUseStyles } from 'react-jss';

const gray = {
  'gray-0': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.gray[0]}`,
  },
  'gray-1': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.gray[1]}`,
  },
  'gray-2': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.gray[2]}`,
  },
  'gray-3': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.gray[3]}`,
  },
  'gray-4': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.gray[4]}`,
  },
  'gray-5': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.gray[5]}`,
  },
  'gray-6': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.gray[6]}`,
  },
  'gray-7': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.gray[7]}`,
  },
  'gray-8': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.gray[8]}`,
  },
  'gray-9': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.gray[9]}`,
  },
};

const grape = {
  'grape-0': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.grape[0]}`,
  },
  'grape-1': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.grape[1]}`,
  },
  'grape-2': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.grape[2]}`,
  },
  'grape-3': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.grape[3]}`,
  },
  'grape-4': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.grape[4]}`,
  },
  'grape-5': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.grape[5]}`,
  },
  'grape-6': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.grape[6]}`,
  },
  'grape-7': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.grape[7]}`,
  },
  'grape-8': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.grape[8]}`,
  },
  'grape-9': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.grape[9]}`,
  },
};

const violet = {
  'violet-0': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.violet[0]}`,
  },
  'violet-1': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.violet[1]}`,
  },
  'violet-2': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.violet[2]}`,
  },
  'violet-3': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.violet[3]}`,
  },
  'violet-4': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.violet[4]}`,
  },
  'violet-5': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.violet[5]}`,
  },
  'violet-6': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.violet[6]}`,
  },
  'violet-7': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.violet[7]}`,
  },
  'violet-8': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.violet[8]}`,
  },
  'violet-9': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.violet[9]}`,
  },
};

const indigo = {
  'indigo-0': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.indigo[0]}`,
  },
  'indigo-1': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.indigo[1]}`,
  },
  'indigo-2': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.indigo[2]}`,
  },
  'indigo-3': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.indigo[3]}`,
  },
  'indigo-4': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.indigo[4]}`,
  },
  'indigo-5': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.indigo[5]}`,
  },
  'indigo-6': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.indigo[6]}`,
  },
  'indigo-7': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.indigo[7]}`,
  },
  'indigo-8': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.indigo[8]}`,
  },
  'indigo-9': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.indigo[9]}`,
  },
};

const blue = {
  'blue-0': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.blue[0]}`,
  },
  'blue-1': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.blue[1]}`,
  },
  'blue-2': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.blue[2]}`,
  },
  'blue-3': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.blue[3]}`,
  },
  'blue-4': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.blue[4]}`,
  },
  'blue-5': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.blue[5]}`,
  },
  'blue-6': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.blue[6]}`,
  },
  'blue-7': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.blue[7]}`,
  },
  'blue-8': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.blue[8]}`,
  },
  'blue-9': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.blue[9]}`,
  },
};

const cyan = {
  'cyan-0': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.cyan[0]}`,
  },
  'cyan-1': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.cyan[1]}`,
  },
  'cyan-2': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.cyan[2]}`,
  },
  'cyan-3': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.cyan[3]}`,
  },
  'cyan-4': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.cyan[4]}`,
  },
  'cyan-5': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.cyan[5]}`,
  },
  'cyan-6': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.cyan[6]}`,
  },
  'cyan-7': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.cyan[7]}`,
  },
  'cyan-8': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.cyan[8]}`,
  },
  'cyan-9': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.cyan[9]}`,
  },
};

const teal = {
  'teal-0': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.teal[0]}`,
  },
  'teal-1': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.teal[1]}`,
  },
  'teal-2': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.teal[2]}`,
  },
  'teal-3': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.teal[3]}`,
  },
  'teal-4': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.teal[4]}`,
  },
  'teal-5': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.teal[5]}`,
  },
  'teal-6': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.teal[6]}`,
  },
  'teal-7': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.teal[7]}`,
  },
  'teal-8': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.teal[8]}`,
  },
  'teal-9': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.teal[9]}`,
  },
};

const green = {
  'green-0': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.green[0]}`,
  },
  'green-1': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.green[1]}`,
  },
  'green-2': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.green[2]}`,
  },
  'green-3': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.green[3]}`,
  },
  'green-4': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.green[4]}`,
  },
  'green-5': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.green[5]}`,
  },
  'green-6': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.green[6]}`,
  },
  'green-7': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.green[7]}`,
  },
  'green-8': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.green[8]}`,
  },
  'green-9': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.green[9]}`,
  },
};

const lime = {
  'lime-0': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.lime[0]}`,
  },
  'lime-1': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.lime[1]}`,
  },
  'lime-2': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.lime[2]}`,
  },
  'lime-3': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.lime[3]}`,
  },
  'lime-4': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.lime[4]}`,
  },
  'lime-5': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.lime[5]}`,
  },
  'lime-6': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.lime[6]}`,
  },
  'lime-7': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.lime[7]}`,
  },
  'lime-8': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.lime[8]}`,
  },
  'lime-9': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.lime[9]}`,
  },
};

const yellow = {
  'yellow-0': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.yellow[0]}`,
  },
  'yellow-1': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.yellow[1]}`,
  },
  'yellow-2': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.yellow[2]}`,
  },
  'yellow-3': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.yellow[3]}`,
  },
  'yellow-4': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.yellow[4]}`,
  },
  'yellow-5': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.yellow[5]}`,
  },
  'yellow-6': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.yellow[6]}`,
  },
  'yellow-7': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.yellow[7]}`,
  },
  'yellow-8': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.yellow[8]}`,
  },
  'yellow-9': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.yellow[9]}`,
  },
};

const orange = {
  'orange-0': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.orange[0]}`,
  },
  'orange-1': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.orange[1]}`,
  },
  'orange-2': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.orange[2]}`,
  },
  'orange-3': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.orange[3]}`,
  },
  'orange-4': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.orange[4]}`,
  },
  'orange-5': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.orange[5]}`,
  },
  'orange-6': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.orange[6]}`,
  },
  'orange-7': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.orange[7]}`,
  },
  'orange-8': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.orange[8]}`,
  },
  'orange-9': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.orange[9]}`,
  },
};

const useBorderColorStyles = createUseStyles({
  'transparent': {
    background: 'transparent'
  },
  'black': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.black}`,
  },
  'white': {
    boxShadow: `inset 0 0 0 1px ${OpenColor.white}`,
  },
  ...gray,
  ...grape,
  ...violet,
  ...indigo,
  ...blue,
  ...cyan,
  ...teal,
  ...green,
  ...lime,
  ...yellow,
  ...orange,
});

export {
  useBorderColorStyles,
};
