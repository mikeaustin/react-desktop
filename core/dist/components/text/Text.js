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
import { jsx as _jsx } from "react/jsx-runtime";
import { useRef, useContext, useLayoutEffect, useState } from 'react';
import clsx from 'clsx';
import { useStyles } from './styles.js';
import { useFontSizeStyles } from '../../styles/fontSizeStyles.js';
import { useFontWeightStyles } from '../../styles/fontWeightStyles.js';
import { useTextColorStyles } from '../../styles/textColorStyles.js';
import TextContext from './TextContext.js';
function Text(_a) {
    var _b, _c, _d;
    var flex = _a.flex, contain = _a.contain, light = _a.light, caps = _a.caps, fontSize = _a.fontSize, fontWeight = _a.fontWeight, textColor = _a.textColor, textAlign = _a.textAlign, className = _a.className, children = _a.children, props = __rest(_a, ["flex", "contain", "light", "caps", "fontSize", "fontWeight", "textColor", "textAlign", "className", "children"]);
    var isTextParent = useContext(TextContext);
    var _e = useState(contain), isHidden = _e[0], setIsHidden = _e[1];
    var textElementRef = useRef(null);
    var styles = useStyles();
    var fontSizeStyles = useFontSizeStyles();
    var fontWeightStyles = useFontWeightStyles();
    var textColorStyles = useTextColorStyles();
    useLayoutEffect(function () {
        if (contain && textElementRef.current) {
            // textElementRef.current.style.width = `${textElementRef.current.parentElement?.offsetWidth}px`;
        }
        setIsHidden(false);
    }, [contain]);
    var textClassName = clsx(styles.Text, isTextParent && styles.textParent, flex && styles.flex, light && styles.light, caps && styles.caps, isHidden && styles.hidden, (_b = (fontSize && fontSizeStyles[fontSize])) !== null && _b !== void 0 ? _b : (!isTextParent && fontSizeStyles.default), (_c = (fontWeight && fontWeightStyles[fontWeight])) !== null && _c !== void 0 ? _c : (!isTextParent && fontWeightStyles.normal), (_d = (textColor && textColorStyles[textColor])) !== null && _d !== void 0 ? _d : (!isTextParent && textColorStyles['theme-text']), textAlign && styles[textAlign], className);
    var childrenElement = typeof children === 'string'
        ? children.split('\\n').reduce(function (title, word, index) { return (index > 0 ? __spreadArray(__spreadArray([], title, true), [_jsx("br", {}), word], false) : __spreadArray(__spreadArray([], title, true), [word], false)); }, [])
        : children;
    return (_jsx(TextContext.Provider, __assign({ value: true }, { children: _jsx("span", __assign({ ref: textElementRef, className: textClassName }, props, { children: childrenElement })) })));
}
export default Text;
