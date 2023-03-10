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
import React, { useCallback, useEffect } from 'react';
import OpenColor from 'open-color';
import clsx from 'clsx';
import useStyles from './styles.js';
import { useBorderColorStyles } from '../../styles/borderColorStyles.js';
import { useAlignVerticalStyles, useAlignHorizontalStyles } from '../../styles/alignStyles.js';
import { usePaddingVerticalStyles, usePaddingHorizontalStyles } from '../../styles/paddingStyles.js';
import useFillColorStyles from '../../styles/fillColorStyles.js';
import ViewContext from './ViewContext.js';
function paddingToStyle(padding) {
    switch (padding) {
        case 'xsmall':
            return ['xsmall', 'xsmall'];
        case 'small':
            return ['small', 'small'];
        case 'medium':
            return ['medium', 'medium'];
        case 'large':
            return ['large', 'large'];
        case 'none xsmall':
            return ['none', 'xsmall'];
        case 'none small':
            return ['none', 'small'];
        case 'none medium':
            return ['none', 'medium'];
        case 'none large':
            return ['none', 'large'];
        case 'xsmall none':
            return ['xsmall', 'none'];
        case 'xsmall small':
            return ['xsmall', 'small'];
        case 'xsmall medium':
            return ['xsmall', 'medium'];
        case 'small none':
            return ['small', 'none'];
        case 'small medium':
            return ['small', 'medium'];
        case 'small large':
            return ['small', 'large'];
        case 'medium none':
            return ['medium', 'none'];
        case 'medium small':
            return ['medium', 'small'];
        default:
            return [undefined, undefined];
    }
}
function alignToStyle(align) {
    switch (align) {
        case 'top left':
            return ['start', 'start'];
        case 'top':
            return ['start', 'center'];
        case 'top right':
            return ['start', 'end'];
        case 'left':
            return ['center', 'start'];
        case 'center':
            return ['center', 'center'];
        case 'right':
            return ['center', 'end'];
        case 'bottom left':
            return ['end', 'start'];
        case 'bottom':
            return ['end', 'center'];
        case 'bottom right':
            return ['end', 'end'];
        default:
            return [undefined, undefined];
    }
}
var View = function (_a, ref) {
    var _b = _a.as, Component = _b === void 0 ? 'div' : _b, flex = _a.flex, horizontal = _a.horizontal, align = _a.align, fillColor = _a.fillColor, padding = _a.padding, border = _a.border, borderColor = _a.borderColor, disabled = _a.disabled, viewBox = _a.viewBox, hoverable = _a.hoverable, hovered = _a.hovered, className = _a.className, children = _a.children, props = __rest(_a, ["as", "flex", "horizontal", "align", "fillColor", "padding", "border", "borderColor", "disabled", "viewBox", "hoverable", "hovered", "className", "children"]);
    var handleWindowMessage = useCallback(function (event) {
        if (event.data.type === 'setColorTheme') {
            document.documentElement.style.setProperty('--theme-content-color', event.data.theme.contentColor);
            document.documentElement.style.setProperty('--theme-panel-color', event.data.theme.panelColor);
            document.documentElement.style.setProperty('--theme-divider-color', event.data.theme.dividerColor);
            document.documentElement.style.setProperty('--theme-text-color', event.data.theme.textColor);
            document.documentElement.style.setProperty('--theme-button-color', event.data.theme.buttonColor);
        }
    }, []);
    useEffect(function () {
        document.documentElement.style.setProperty('--theme-content-color', OpenColor.white);
        document.documentElement.style.setProperty('--theme-panel-color', OpenColor.gray[1]);
        document.documentElement.style.setProperty('--theme-divider-color', OpenColor.gray[3]);
        document.documentElement.style.setProperty('--theme-text-color', OpenColor.gray[8]);
        document.documentElement.style.setProperty('--theme-button-color', OpenColor.gray[3]);
        window.addEventListener('message', handleWindowMessage);
        return function () {
            window.removeEventListener('message', handleWindowMessage);
        };
    }, [handleWindowMessage]);
    var handleDragOver = function (event) {
        event.preventDefault();
    };
    var styles = useStyles();
    var borderColorStyles = useBorderColorStyles();
    var alignVerticalStyles = useAlignVerticalStyles();
    var alignHorizontalStyles = useAlignHorizontalStyles();
    var paddingVerticalStyles = usePaddingVerticalStyles();
    var paddingHorizontalStyles = usePaddingHorizontalStyles();
    var fillColorStyles = useFillColorStyles();
    var _c = paddingToStyle(padding), paddingVertical = _c[0], paddingHorizontal = _c[1];
    var _d = alignToStyle(align), alignVertical = _d[0], alignHorizontal = _d[1];
    var viewClassName = clsx(styles.View, flex && styles.flex, horizontal && styles.horizontal, fillColor && fillColorStyles[fillColor], border && borderColorStyles[borderColor !== null && borderColor !== void 0 ? borderColor : 'gray-3'], alignVertical && alignVerticalStyles[alignVertical], alignHorizontal && alignHorizontalStyles[alignHorizontal], paddingVertical && paddingVerticalStyles[paddingVertical], paddingHorizontal && paddingHorizontalStyles[paddingHorizontal], hoverable && styles["hoverable-".concat(hoverable)], hovered && styles["hovered-".concat(hovered)], className);
    return (_jsx(ViewContext.Provider, __assign({ value: { isHorizontal: horizontal !== null && horizontal !== void 0 ? horizontal : false } }, { children: _jsx(Component, __assign({ ref: ref, disabled: disabled, viewBox: viewBox, className: viewClassName, onDragOver: handleDragOver, onDragEnter: handleDragOver }, props, { children: children })) })));
};
export default React.forwardRef(View);
