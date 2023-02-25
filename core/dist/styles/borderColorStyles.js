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
var yellow = {
    'yellow-0': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.blue[0]),
    },
    'yellow-1': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.blue[1]),
    },
    'yellow-2': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.blue[2]),
    },
    'yellow-3': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.blue[3]),
    },
    'yellow-4': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.blue[4]),
    },
    'yellow-5': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.blue[5]),
    },
    'yellow-6': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.blue[6]),
    },
    'yellow-7': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.blue[7]),
    },
    'yellow-8': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.blue[8]),
    },
    'yellow-9': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.blue[9]),
    },
};
var useBorderColorStyles = createUseStyles(__assign(__assign(__assign({ 'transparent': {
        background: 'transparent'
    }, 'black': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.black),
    }, 'white': {
        boxShadow: "inset 0 0 0 1px ".concat(OpenColor.white),
    } }, gray), blue), yellow));
export { useBorderColorStyles, };
