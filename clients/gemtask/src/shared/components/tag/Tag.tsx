import { View, Text, Icon, Button, Spacer, Divider, Stack } from 'core';

const Tag = ({ label, light = true, bold = false, color = 'gray-1', ...props }: any) => {
  return (
    <View padding="xsmall small" fillColor={color} style={{ padding: '3px 4px', margin: '-3px 0', borderRadius: 2 }} {...props}>
      <Text light={light} fontSize="small" fontWeight={bold ? "semi-bold" : undefined} style={{ whiteSpace: 'nowrap' }}>
        {label}
      </Text>
    </View>
  );
};

export default Tag;
