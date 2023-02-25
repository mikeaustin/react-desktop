import jss from 'jss';
var StyleSheet = /** @class */ (function () {
    function StyleSheet() {
    }
    StyleSheet.create = function (styles) {
        return jss.createStyleSheet(styles).attach().classes;
    };
    return StyleSheet;
}());
export { StyleSheet };
