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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import useStyles from './styles.js';
import View from '../view/index.js';
import Text from '../text/index.js';
import Spacer from '../spacer/index.js';
function Input(_a) {
    var label = _a.label;
    var styles = useStyles();
    if (label) {
        return (_jsxs(View, { children: [_jsx(Text, __assign({ light: true, fontWeight: "medium", fontSize: "xsmall" }, { children: label.toLocaleUpperCase() })), _jsx(Spacer, { size: "xsmall" }), _jsx(View, __assign({ border: true, fillColor: "white", className: styles.Input }, { children: _jsx("input", {}) }))] }));
    }
    return (_jsx(View, __assign({ border: true, fillColor: "white", className: styles.Input }, { children: _jsx("input", {}) })));
}
export default Input;
