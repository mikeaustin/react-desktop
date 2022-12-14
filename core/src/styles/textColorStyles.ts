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

const yellow = {
  'yellow-0': {
    color: OpenColor.blue[0],
  },
  'yellow-1': {
    color: OpenColor.blue[1],
  },
  'yellow-2': {
    color: OpenColor.blue[2],
  },
  'yellow-3': {
    color: OpenColor.blue[3],
  },
  'yellow-4': {
    color: OpenColor.blue[4],
  },
  'yellow-5': {
    color: OpenColor.blue[5],
  },
  'yellow-6': {
    color: OpenColor.blue[6],
  },
  'yellow-7': {
    color: OpenColor.blue[7],
  },
  'yellow-8': {
    color: OpenColor.blue[8],
  },
  'yellow-9': {
    color: OpenColor.blue[9],
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
  ...blue,
  ...yellow,
});

export {
  useTextColorStyles
};
