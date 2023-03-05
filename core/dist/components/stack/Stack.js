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
import React from 'react';
import View from '../view/index.js';
import Divider from '../divider/index.js';
import Spacer from '../spacer/index.js';
var Stack = function (_a, ref) {
    var divider = _a.divider, spacing = _a.spacing, spacingColor = _a.spacingColor, children = _a.children, props = __rest(_a, ["divider", "spacing", "spacingColor", "children"]);
    return (_jsx(View, __assign({ ref: ref }, props, { children: React.Children.map(children, function (child, index) { return (React.isValidElement(child) && _jsxs(_Fragment, { children: [divider && index > 0 && (_jsx(Divider, { spacing: spacing })), spacing && !divider && index > 0 && (_jsx(Spacer, { size: spacing, color: spacingColor })), child] })); }) })));
};
export default React.forwardRef(Stack);
