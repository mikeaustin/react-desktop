import { Styles as JSSStyles, StyleSheet as JSSStyleSheet } from 'jss';
declare class StyleSheet {
    static create<Name extends string | number | symbol>(styles: JSSStyles<Name, any, undefined>): JSSStyleSheet['classes'];
}
export { StyleSheet };
