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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useEffect } from 'react';
import OpenColor from 'open-color';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import useStyles from './styles.js';
import View from '../view/index.js';
import Text from '../text/index.js';
import Spacer from '../spacer/index.js';
library.add(fas);
function getFillColor(_a) {
    var primary = _a.primary, solid = _a.solid;
    switch (true) {
        case primary && solid:
            return 'blue-5';
        case solid:
            return 'theme-button';
        default:
            return 'transparent';
    }
}
function getBorderColor(_a) {
    var primary = _a.primary, solid = _a.solid, hover = _a.hover;
    switch (true) {
        case hover:
            return undefined;
        case !primary && solid:
            return undefined;
        case !primary && !solid:
            return 'gray-3';
        case primary && !solid:
            return 'blue-5';
        case primary && solid:
            return undefined;
        default:
            return undefined;
    }
}
function getTextColor(_a) {
    var primary = _a.primary, solid = _a.solid;
    switch (true) {
        case primary && solid:
            return 'white';
        case primary:
            return 'blue-5';
        default:
            return undefined;
    }
}
function Button(_a) {
    var _b;
    var icon = _a.icon, title = _a.title, primary = _a.primary, solid = _a.solid, hover = _a.hover, size = _a.size, data = _a.data, disabled = _a.disabled, _c = _a.titleFontWeight, titleFontWeight = _c === void 0 ? 'bold' : _c, _d = _a.titleAlign, titleAlign = _d === void 0 ? 'center' : _d, className = _a.className, onClick = _a.onClick, props = __rest(_a, ["icon", "title", "primary", "solid", "hover", "size", "data", "disabled", "titleFontWeight", "titleAlign", "className", "onClick"]);
    var buttonElementRef = useRef(null);
    var styles = useStyles();
    var fillColor = getFillColor({ primary: primary, solid: solid });
    var borderColor = getBorderColor({ primary: primary, solid: solid, hover: hover });
    var textColor = getTextColor({ primary: primary, solid: solid });
    var handleClick = function (event) {
        if (onClick) {
            onClick(event, data);
        }
    };
    useEffect(function () {
        if (buttonElementRef.current && borderColor) {
            var _a = borderColor.split('-'), color_1 = _a[0], level_1 = _a[1];
            buttonElementRef.current.style.setProperty('--border-color', OpenColor[color_1][level_1]);
        }
    }, [borderColor]);
    var buttonClassName = clsx(styles.Button, solid && !primary && styles.solid, hover && styles.hover, size && styles[size], className);
    var _e = (_b = textColor === null || textColor === void 0 ? void 0 : textColor.split('-')) !== null && _b !== void 0 ? _b : [], color = _e[0], level = _e[1];
    var iconColor = level ? OpenColor[color][level] : OpenColor[color];
    var titleElement = title === null || title === void 0 ? void 0 : title.split('\\n').reduce(function (title, word, index) { return (index > 0 ? __spreadArray(__spreadArray([], title, true), [_jsx("br", {}), word], false) : __spreadArray(__spreadArray([], title, true), [word], false)); }, []);
    return (_jsxs(View, __assign({ ref: buttonElementRef, as: "button", horizontal: true, border: borderColor !== undefined, align: titleAlign, fillColor: fillColor, borderColor: borderColor, disabled: disabled, className: buttonClassName, onClick: handleClick }, props, { children: [icon && (_jsx(FontAwesomeIcon, { fixedWidth: true, icon: icon, color: iconColor, style: { marginTop: -4, marginBottom: -4 } })), icon && title && (_jsx(Spacer, { size: "small" })), _jsx(Text, __assign({ noEvents: true, fontWeight: titleFontWeight, textColor: textColor }, { children: titleElement !== null && titleElement !== void 0 ? titleElement : '​' }))] })));
}
;
export default Button;
