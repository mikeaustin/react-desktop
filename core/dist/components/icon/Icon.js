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
import OpenColor from 'open-color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function Icon(_a) {
    var _b;
    var icon = _a.icon, _c = _a.color, color = _c === void 0 ? 'gray-8' : _c, style = _a.style, props = __rest(_a, ["icon", "color", "style"]);
    var _d = (_b = color === null || color === void 0 ? void 0 : color.split('-')) !== null && _b !== void 0 ? _b : [], xcolor = _d[0], level = _d[1];
    var iconColor = level ? OpenColor[xcolor][level] : OpenColor[xcolor];
    var iconStyle = __assign({ marginTop: -4, marginBottom: -4 }, style);
    return (_jsx(FontAwesomeIcon, __assign({ fixedWidth: true, icon: icon, color: iconColor, style: iconStyle }, props)));
}
export default Icon;
