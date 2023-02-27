import OpenColor from 'open-color';
import { createUseStyles } from 'react-jss';

const gray = {
  'gray-0': {
    background: OpenColor.gray[0],
  },
  'gray-1': {
    background: OpenColor.gray[1],
  },
  'gray-2': {
    background: OpenColor.gray[2],
  },
  'gray-3': {
    background: OpenColor.gray[3],
  },
  'gray-4': {
    background: OpenColor.gray[4],
  },
  'gray-5': {
    background: OpenColor.gray[5],
  },
  'gray-6': {
    background: OpenColor.gray[6],
  },
  'gray-7': {
    background: OpenColor.gray[7],
  },
  'gray-8': {
    background: OpenColor.gray[8],
  },
  'gray-9': {
    background: OpenColor.gray[9],
  },
};

const grape = {
  'grape-0': {
    background: OpenColor.grape[0],
  },
  'grape-1': {
    background: OpenColor.grape[1],
  },
  'grape-2': {
    background: OpenColor.grape[2],
  },
  'grape-3': {
    background: OpenColor.grape[3],
  },
  'grape-4': {
    background: OpenColor.grape[4],
  },
  'grape-5': {
    background: OpenColor.grape[5],
  },
  'grape-6': {
    background: OpenColor.grape[6],
  },
  'grape-7': {
    background: OpenColor.grape[7],
  },
  'grape-8': {
    background: OpenColor.grape[8],
  },
  'grape-9': {
    background: OpenColor.grape[9],
  },
};

const violet = {
  'violet-0': {
    background: OpenColor.violet[0],
  },
  'violet-1': {
    background: OpenColor.violet[1],
  },
  'violet-2': {
    background: OpenColor.violet[2],
  },
  'violet-3': {
    background: OpenColor.violet[3],
  },
  'violet-4': {
    background: OpenColor.violet[4],
  },
  'violet-5': {
    background: OpenColor.violet[5],
  },
  'violet-6': {
    background: OpenColor.violet[6],
  },
  'violet-7': {
    background: OpenColor.violet[7],
  },
  'violet-8': {
    background: OpenColor.violet[8],
  },
  'violet-9': {
    background: OpenColor.violet[9],
  },
};

const indigo = {
  'indigo-0': {
    background: OpenColor.indigo[0],
  },
  'indigo-1': {
    background: OpenColor.indigo[1],
  },
  'indigo-2': {
    background: OpenColor.indigo[2],
  },
  'indigo-3': {
    background: OpenColor.indigo[3],
  },
  'indigo-4': {
    background: OpenColor.indigo[4],
  },
  'indigo-5': {
    background: OpenColor.indigo[5],
  },
  'indigo-6': {
    background: OpenColor.indigo[6],
  },
  'indigo-7': {
    background: OpenColor.indigo[7],
  },
  'indigo-8': {
    background: OpenColor.indigo[8],
  },
  'indigo-9': {
    background: OpenColor.indigo[9],
  },
};

const blue = {
  'blue-0': {
    background: OpenColor.blue[0],
  },
  'blue-1': {
    background: OpenColor.blue[1],
  },
  'blue-2': {
    background: OpenColor.blue[2],
  },
  'blue-3': {
    background: OpenColor.blue[3],
  },
  'blue-4': {
    background: OpenColor.blue[4],
  },
  'blue-5': {
    background: OpenColor.blue[5],
  },
  'blue-6': {
    background: OpenColor.blue[6],
  },
  'blue-7': {
    background: OpenColor.blue[7],
  },
  'blue-8': {
    background: OpenColor.blue[8],
  },
  'blue-9': {
    background: OpenColor.blue[9],
  },
};

const cyan = {
  'cyan-0': {
    background: OpenColor.cyan[0],
  },
  'cyan-1': {
    background: OpenColor.cyan[1],
  },
  'cyan-2': {
    background: OpenColor.cyan[2],
  },
  'cyan-3': {
    background: OpenColor.cyan[3],
  },
  'cyan-4': {
    background: OpenColor.cyan[4],
  },
  'cyan-5': {
    background: OpenColor.cyan[5],
  },
  'cyan-6': {
    background: OpenColor.cyan[6],
  },
  'cyan-7': {
    background: OpenColor.cyan[7],
  },
  'cyan-8': {
    background: OpenColor.cyan[8],
  },
  'cyan-9': {
    background: OpenColor.cyan[9],
  },
};

const teal = {
  'teal-0': {
    background: OpenColor.teal[0],
  },
  'teal-1': {
    background: OpenColor.teal[1],
  },
  'teal-2': {
    background: OpenColor.teal[2],
  },
  'teal-3': {
    background: OpenColor.teal[3],
  },
  'teal-4': {
    background: OpenColor.teal[4],
  },
  'teal-5': {
    background: OpenColor.teal[5],
  },
  'teal-6': {
    background: OpenColor.teal[6],
  },
  'teal-7': {
    background: OpenColor.teal[7],
  },
  'teal-8': {
    background: OpenColor.teal[8],
  },
  'teal-9': {
    background: OpenColor.teal[9],
  },
};

const green = {
  'green-0': {
    background: OpenColor.green[0],
  },
  'green-1': {
    background: OpenColor.green[1],
  },
  'green-2': {
    background: OpenColor.green[2],
  },
  'green-3': {
    background: OpenColor.green[3],
  },
  'green-4': {
    background: OpenColor.green[4],
  },
  'green-5': {
    background: OpenColor.green[5],
  },
  'green-6': {
    background: OpenColor.green[6],
  },
  'green-7': {
    background: OpenColor.green[7],
  },
  'green-8': {
    background: OpenColor.green[8],
  },
  'green-9': {
    background: OpenColor.green[9],
  },
};

const lime = {
  'lime-0': {
    background: OpenColor.lime[0],
  },
  'lime-1': {
    background: OpenColor.lime[1],
  },
  'lime-2': {
    background: OpenColor.lime[2],
  },
  'lime-3': {
    background: OpenColor.lime[3],
  },
  'lime-4': {
    background: OpenColor.lime[4],
  },
  'lime-5': {
    background: OpenColor.lime[5],
  },
  'lime-6': {
    background: OpenColor.lime[6],
  },
  'lime-7': {
    background: OpenColor.lime[7],
  },
  'lime-8': {
    background: OpenColor.lime[8],
  },
  'lime-9': {
    background: OpenColor.lime[9],
  },
};

const yellow = {
  'yellow-0': {
    background: OpenColor.yellow[0],
  },
  'yellow-1': {
    background: OpenColor.yellow[1],
  },
  'yellow-2': {
    background: OpenColor.yellow[2],
  },
  'yellow-3': {
    background: OpenColor.yellow[3],
  },
  'yellow-4': {
    background: OpenColor.yellow[4],
  },
  'yellow-5': {
    background: OpenColor.yellow[5],
  },
  'yellow-6': {
    background: OpenColor.yellow[6],
  },
  'yellow-7': {
    background: OpenColor.yellow[7],
  },
  'yellow-8': {
    background: OpenColor.yellow[8],
  },
  'yellow-9': {
    background: OpenColor.yellow[9],
  },
};

const orange = {
  'orange-0': {
    background: OpenColor.orange[0],
  },
  'orange-1': {
    background: OpenColor.orange[1],
  },
  'orange-2': {
    background: OpenColor.orange[2],
  },
  'orange-3': {
    background: OpenColor.orange[3],
  },
  'orange-4': {
    background: OpenColor.orange[4],
  },
  'orange-5': {
    background: OpenColor.orange[5],
  },
  'orange-6': {
    background: OpenColor.orange[6],
  },
  'orange-7': {
    background: OpenColor.orange[7],
  },
  'orange-8': {
    background: OpenColor.orange[8],
  },
  'orange-9': {
    background: OpenColor.orange[9],
  },
};

const useFillColorStyles = createUseStyles({
  'theme-content': {
    background: 'var(--theme-content-color)',
  },
  'theme-panel': {
    background: 'var(--theme-panel-color)',
  },
  'theme-divider': {
    background: 'var(--theme-divider-color)',
  },
  'theme-button': {
    background: 'var(--theme-button-color)',
  },
  'transparent': {
    background: 'transparent'
  },
  'black': {
    background: OpenColor.black
  },
  'white': {
    background: OpenColor.white
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

export default useFillColorStyles;
