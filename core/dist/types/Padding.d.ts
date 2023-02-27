declare type PaddingVertical = 'none xsmall' | 'none small' | 'none medium' | 'none large' | 'xsmall none' | 'xsmall small' | 'xsmall medium' | 'small none' | 'small small' | 'small medium' | 'small large' | 'medium none' | 'medium small' | 'medium medium' | 'medium large' | 'large none' | 'large small' | 'large medium' | 'large large';
declare type Padding = 'none' | 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge';
declare type CombinedPadding = Padding | PaddingVertical;
export default Padding;
export { type CombinedPadding, };
