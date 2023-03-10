var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import OpenColor from 'open-color';
import { createUseStyles } from 'react-jss';
var gray = {
    'gray-0': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.gray[0]),
    },
    'gray-1': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.gray[1]),
    },
    'gray-2': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.gray[2]),
    },
    'gray-3': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.gray[3]),
    },
    'gray-4': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.gray[4]),
    },
    'gray-5': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.gray[5]),
    },
    'gray-6': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.gray[6]),
    },
    'gray-7': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.gray[7]),
    },
    'gray-8': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.gray[8]),
    },
    'gray-9': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.gray[9]),
    },
};
var red = {
    'red-0': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.red[0]),
    },
    'red-1': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.red[1]),
    },
    'red-2': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.red[2]),
    },
    'red-3': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.red[3]),
    },
    'red-4': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.red[4]),
    },
    'red-5': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.red[5]),
    },
    'red-6': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.red[6]),
    },
    'red-7': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.red[7]),
    },
    'red-8': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.red[8]),
    },
    'red-9': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.red[9]),
    },
};
var grape = {
    'grape-0': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.grape[0]),
    },
    'grape-1': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.grape[1]),
    },
    'grape-2': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.grape[2]),
    },
    'grape-3': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.grape[3]),
    },
    'grape-4': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.grape[4]),
    },
    'grape-5': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.grape[5]),
    },
    'grape-6': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.grape[6]),
    },
    'grape-7': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.grape[7]),
    },
    'grape-8': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.grape[8]),
    },
    'grape-9': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.grape[9]),
    },
};
var violet = {
    'violet-0': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.violet[0]),
    },
    'violet-1': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.violet[1]),
    },
    'violet-2': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.violet[2]),
    },
    'violet-3': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.violet[3]),
    },
    'violet-4': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.violet[4]),
    },
    'violet-5': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.violet[5]),
    },
    'violet-6': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.violet[6]),
    },
    'violet-7': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.violet[7]),
    },
    'violet-8': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.violet[8]),
    },
    'violet-9': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.violet[9]),
    },
};
var indigo = {
    'indigo-0': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.indigo[0]),
    },
    'indigo-1': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.indigo[1]),
    },
    'indigo-2': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.indigo[2]),
    },
    'indigo-3': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.indigo[3]),
    },
    'indigo-4': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.indigo[4]),
    },
    'indigo-5': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.indigo[5]),
    },
    'indigo-6': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.indigo[6]),
    },
    'indigo-7': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.indigo[7]),
    },
    'indigo-8': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.indigo[8]),
    },
    'indigo-9': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.indigo[9]),
    },
};
var blue = {
    'blue-0': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.blue[0]),
    },
    'blue-1': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.blue[1]),
    },
    'blue-2': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.blue[2]),
    },
    'blue-3': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.blue[3]),
    },
    'blue-4': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.blue[4]),
    },
    'blue-5': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.blue[5]),
    },
    'blue-6': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.blue[6]),
    },
    'blue-7': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.blue[7]),
    },
    'blue-8': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.blue[8]),
    },
    'blue-9': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.blue[9]),
    },
};
var cyan = {
    'cyan-0': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.cyan[0]),
    },
    'cyan-1': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.cyan[1]),
    },
    'cyan-2': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.cyan[2]),
    },
    'cyan-3': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.cyan[3]),
    },
    'cyan-4': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.cyan[4]),
    },
    'cyan-5': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.cyan[5]),
    },
    'cyan-6': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.cyan[6]),
    },
    'cyan-7': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.cyan[7]),
    },
    'cyan-8': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.cyan[8]),
    },
    'cyan-9': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.cyan[9]),
    },
};
var teal = {
    'teal-0': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.teal[0]),
    },
    'teal-1': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.teal[1]),
    },
    'teal-2': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.teal[2]),
    },
    'teal-3': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.teal[3]),
    },
    'teal-4': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.teal[4]),
    },
    'teal-5': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.teal[5]),
    },
    'teal-6': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.teal[6]),
    },
    'teal-7': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.teal[7]),
    },
    'teal-8': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.teal[8]),
    },
    'teal-9': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.teal[9]),
    },
};
var green = {
    'green-0': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.green[0]),
    },
    'green-1': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.green[1]),
    },
    'green-2': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.green[2]),
    },
    'green-3': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.green[3]),
    },
    'green-4': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.green[4]),
    },
    'green-5': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.green[5]),
    },
    'green-6': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.green[6]),
    },
    'green-7': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.green[7]),
    },
    'green-8': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.green[8]),
    },
    'green-9': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.green[9]),
    },
};
var lime = {
    'lime-0': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.lime[0]),
    },
    'lime-1': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.lime[1]),
    },
    'lime-2': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.lime[2]),
    },
    'lime-3': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.lime[3]),
    },
    'lime-4': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.lime[4]),
    },
    'lime-5': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.lime[5]),
    },
    'lime-6': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.lime[6]),
    },
    'lime-7': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.lime[7]),
    },
    'lime-8': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.lime[8]),
    },
    'lime-9': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.lime[9]),
    },
};
var yellow = {
    'yellow-0': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.yellow[0]),
    },
    'yellow-1': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.yellow[1]),
    },
    'yellow-2': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.yellow[2]),
    },
    'yellow-3': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.yellow[3]),
    },
    'yellow-4': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.yellow[4]),
    },
    'yellow-5': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.yellow[5]),
    },
    'yellow-6': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.yellow[6]),
    },
    'yellow-7': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.yellow[7]),
    },
    'yellow-8': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.yellow[8]),
    },
    'yellow-9': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.yellow[9]),
    },
};
var orange = {
    'orange-0': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.orange[0]),
    },
    'orange-1': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.orange[1]),
    },
    'orange-2': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.orange[2]),
    },
    'orange-3': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.orange[3]),
    },
    'orange-4': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.orange[4]),
    },
    'orange-5': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.orange[5]),
    },
    'orange-6': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.orange[6]),
    },
    'orange-7': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.orange[7]),
    },
    'orange-8': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.orange[8]),
    },
    'orange-9': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.orange[9]),
    },
};
var useBorderColorStyles = createUseStyles(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({ 'transparent': {
        background: 'transparent'
    }, 'black': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.black),
    }, 'white': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.white),
    } }, gray), red), grape), violet), indigo), blue), cyan), teal), green), lime), yellow), orange));
export { useBorderColorStyles, };
