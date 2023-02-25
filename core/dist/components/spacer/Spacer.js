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
import { jsx as _jsx } from "react/jsx-runtime";
import { useContext } from 'react';
import View from '../view/index.js';
import clsx from 'clsx';
import { useStyles } from './style.js';
import { useSpacingStyles } from '../../styles/spacingStyles.js';
import ViewContext from '../view/ViewContext.js';
var Spacer = function (_a) {
    var size = _a.size, color = _a.color, props = __rest(_a, ["size", "color"]);
    var isHorizontal = useContext(ViewContext).isHorizontal;
    var styles = useStyles();
    var spacingStyles = useSpacingStyles();
    var spacerClassName = clsx(styles.Spacer, spacingStyles["".concat(isHorizontal ? 'horizontal-' : '').concat(size)]);
    return (_jsx(View, __assign({ fillColor: color, className: spacerClassName }, props)));
};
export default Spacer;
