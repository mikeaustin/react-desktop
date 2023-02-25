/// <reference types="react" />
import View from '../view/index.js';
interface InputProps extends React.ComponentProps<typeof View> {
    label?: string;
}
declare function Input({ label, }: InputProps): JSX.Element;
export default Input;
