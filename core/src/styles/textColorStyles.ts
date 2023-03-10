import OpenColor from 'open-color';
import { createUseStyles } from 'react-jss';

const gray = {
  'gray-0': {
    color: OpenColor.gray[0]
  },
  'gray-1': {
    color: OpenColor.gray[1],
  },
  'gray-2': {
    color: OpenColor.gray[2],
  },
  'gray-3': {
    color: OpenColor.gray[3],
  },
  'gray-4': {
    color: OpenColor.gray[4],
  },
  'gray-5': {
    color: OpenColor.gray[5],
  },
  'gray-6': {
    color: OpenColor.gray[6],
  },
  'gray-7': {
    color: OpenColor.gray[7],
  },
  'gray-8': {
    color: OpenColor.gray[8],
  },
  'gray-9': {
    color: OpenColor.gray[9],
  },
};

const red = {
  'red-0': {
    color: OpenColor.red[0]
  },
  'red-1': {
    color: OpenColor.red[1],
  },
  'red-2': {
    color: OpenColor.red[2],
  },
  'red-3': {
    color: OpenColor.red[3],
  },
  'red-4': {
    color: OpenColor.red[4],
  },
  'red-5': {
    color: OpenColor.red[5],
  },
  'red-6': {
    color: OpenColor.red[6],
  },
  'red-7': {
    color: OpenColor.red[7],
  },
  'red-8': {
    color: OpenColor.red[8],
  },
  'red-9': {
    color: OpenColor.red[9],
  },
};

const grape = {
  'grape-0': {
    color: OpenColor.grape[0]
  },
  'grape-1': {
    color: OpenColor.grape[1],
  },
  'grape-2': {
    color: OpenColor.grape[2],
  },
  'grape-3': {
    color: OpenColor.grape[3],
  },
  'grape-4': {
    color: OpenColor.grape[4],
  },
  'grape-5': {
    color: OpenColor.grape[5],
  },
  'grape-6': {
    color: OpenColor.grape[6],
  },
  'grape-7': {
    color: OpenColor.grape[7],
  },
  'grape-8': {
    color: OpenColor.grape[8],
  },
  'grape-9': {
    color: OpenColor.grape[9],
  },
};

const violet = {
  'violet-0': {
    color: OpenColor.violet[0]
  },
  'violet-1': {
    color: OpenColor.violet[1],
  },
  'violet-2': {
    color: OpenColor.violet[2],
  },
  'violet-3': {
    color: OpenColor.violet[3],
  },
  'violet-4': {
    color: OpenColor.violet[4],
  },
  'violet-5': {
    color: OpenColor.violet[5],
  },
  'violet-6': {
    color: OpenColor.violet[6],
  },
  'violet-7': {
    color: OpenColor.violet[7],
  },
  'violet-8': {
    color: OpenColor.violet[8],
  },
  'violet-9': {
    color: OpenColor.violet[9],
  },
};

const indigo = {
  'indigo-0': {
    color: OpenColor.indigo[0]
  },
  'indigo-1': {
    color: OpenColor.indigo[1],
  },
  'indigo-2': {
    color: OpenColor.indigo[2],
  },
  'indigo-3': {
    color: OpenColor.indigo[3],
  },
  'indigo-4': {
    color: OpenColor.indigo[4],
  },
  'indigo-5': {
    color: OpenColor.indigo[5],
  },
  'indigo-6': {
    color: OpenColor.indigo[6],
  },
  'indigo-7': {
    color: OpenColor.indigo[7],
  },
  'indigo-8': {
    color: OpenColor.indigo[8],
  },
  'indigo-9': {
    color: OpenColor.indigo[9],
  },
};

const blue = {
  'blue-0': {
    color: OpenColor.blue[0],
  },
  'blue-1': {
    color: OpenColor.blue[1],
  },
  'blue-2': {
    color: OpenColor.blue[2],
  },
  'blue-3': {
    color: OpenColor.blue[3],
  },
  'blue-4': {
    color: OpenColor.blue[4],
  },
  'blue-5': {
    color: OpenColor.blue[5],
  },
  'blue-6': {
    color: OpenColor.blue[6],
  },
  'blue-7': {
    color: OpenColor.blue[7],
  },
  'blue-8': {
    color: OpenColor.blue[8],
  },
  'blue-9': {
    color: OpenColor.blue[9],
  },
};

const cyan = {
  'cyan-0': {
    color: OpenColor.cyan[0],
  },
  'cyan-1': {
    color: OpenColor.cyan[1],
  },
  'cyan-2': {
    color: OpenColor.cyan[2],
  },
  'cyan-3': {
    color: OpenColor.cyan[3],
  },
  'cyan-4': {
    color: OpenColor.cyan[4],
  },
  'cyan-5': {
    color: OpenColor.cyan[5],
  },
  'cyan-6': {
    color: OpenColor.cyan[6],
  },
  'cyan-7': {
    color: OpenColor.cyan[7],
  },
  'cyan-8': {
    color: OpenColor.cyan[8],
  },
  'cyan-9': {
    color: OpenColor.cyan[9],
  },
};

const teal = {
  'teal-0': {
    color: OpenColor.teal[0],
  },
  'teal-1': {
    color: OpenColor.teal[1],
  },
  'teal-2': {
    color: OpenColor.teal[2],
  },
  'teal-3': {
    color: OpenColor.teal[3],
  },
  'teal-4': {
    color: OpenColor.teal[4],
  },
  'teal-5': {
    color: OpenColor.teal[5],
  },
  'teal-6': {
    color: OpenColor.teal[6],
  },
  'teal-7': {
    color: OpenColor.teal[7],
  },
  'teal-8': {
    color: OpenColor.teal[8],
  },
  'teal-9': {
    color: OpenColor.teal[9],
  },
};

const green = {
  'green-0': {
    color: OpenColor.green[0],
  },
  'green-1': {
    color: OpenColor.green[1],
  },
  'green-2': {
    color: OpenColor.green[2],
  },
  'green-3': {
    color: OpenColor.green[3],
  },
  'green-4': {
    color: OpenColor.green[4],
  },
  'green-5': {
    color: OpenColor.green[5],
  },
  'green-6': {
    color: OpenColor.green[6],
  },
  'green-7': {
    color: OpenColor.green[7],
  },
  'green-8': {
    color: OpenColor.green[8],
  },
  'green-9': {
    color: OpenColor.green[9],
  },
};

const lime = {
  'lime-0': {
    color: OpenColor.lime[0],
  },
  'lime-1': {
    color: OpenColor.lime[1],
  },
  'lime-2': {
    color: OpenColor.lime[2],
  },
  'lime-3': {
    color: OpenColor.lime[3],
  },
  'lime-4': {
    color: OpenColor.lime[4],
  },
  'lime-5': {
    color: OpenColor.lime[5],
  },
  'lime-6': {
    color: OpenColor.lime[6],
  },
  'lime-7': {
    color: OpenColor.lime[7],
  },
  'lime-8': {
    color: OpenColor.lime[8],
  },
  'lime-9': {
    color: OpenColor.lime[9],
  },
};

const yellow = {
  'yellow-0': {
    color: OpenColor.yellow[0],
  },
  'yellow-1': {
    color: OpenColor.yellow[1],
  },
  'yellow-2': {
    color: OpenColor.yellow[2],
  },
  'yellow-3': {
    color: OpenColor.yellow[3],
  },
  'yellow-4': {
    color: OpenColor.yellow[4],
  },
  'yellow-5': {
    color: OpenColor.yellow[5],
  },
  'yellow-6': {
    color: OpenColor.yellow[6],
  },
  'yellow-7': {
    color: OpenColor.yellow[7],
  },
  'yellow-8': {
    color: OpenColor.yellow[8],
  },
  'yellow-9': {
    color: OpenColor.yellow[9],
  },
};

const orange = {
  'orange-0': {
    color: OpenColor.orange[0],
  },
  'orange-1': {
    color: OpenColor.orange[1],
  },
  'orange-2': {
    color: OpenColor.orange[2],
  },
  'orange-3': {
    color: OpenColor.orange[3],
  },
  'orange-4': {
    color: OpenColor.orange[4],
  },
  'orange-5': {
    color: OpenColor.orange[5],
  },
  'orange-6': {
    color: OpenColor.orange[6],
  },
  'orange-7': {
    color: OpenColor.orange[7],
  },
  'orange-8': {
    color: OpenColor.orange[8],
  },
  'orange-9': {
    color: OpenColor.orange[9],
  },
};

const useTextColorStyles = createUseStyles({
  'theme-text': {
    color: 'var(--theme-text-color)',
  },
  'transparent': {
    color: 'transparent'
  },
  'black': {
    color: OpenColor.black
  },
  'white': {
    color: OpenColor.white
  },
  ...gray,
  ...red,
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
  useTextColorStyles
};
