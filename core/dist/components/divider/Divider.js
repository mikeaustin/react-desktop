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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import View from '../view/index.js';
import Spacer from '../spacer/index.js';
var Divider = function (_a) {
    var _b = _a.color, color = _b === void 0 ? 'theme-divider' : _b, spacing = _a.spacing, props = __rest(_a, ["color", "spacing"]);
    return (_jsxs(_Fragment, { children: [spacing && _jsx(Spacer, { size: spacing }), _jsx(View, __assign({ fillColor: color, style: { minHeight: 1, minWidth: 1 } }, props)), spacing && _jsx(Spacer, { size: spacing })] }));
};
export default Divider;
