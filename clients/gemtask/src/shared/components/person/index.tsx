import { useState } from 'react';
import { View, Text, Icon, Button, Input, Spacer, Divider, Stack } from 'core';

interface PersonProps {
  name: string;
  tags: string;
}

const Person = ({ name, tags }: PersonProps) => {
  return (
    <View horizontal hoverable="b" fillColor="gray-1" padding="xxsmall" align="left" style={{ borderRadius: 1000, position: 'relative' }}>
      <View fillColor="white" align="center" style={{ width: 32, height: 32, borderRadius: 1000 }}>
        <Text fontSize="small" fontWeight="semi-bold">{name.split(' ').map(n => n[0]).join('')}</Text>
      </View>
      <View padding="none small" >
        <Text>{name}</Text>
        <Spacer size="xsmall" />
        <Text light fontSize="small">{tags}</Text>
      </View>
      <View hovered="b" fillColor="red-5" align="center" style={{ width: 32, height: 32, borderRadius: 1000, position: 'absolute', right: 4, cursor: 'pointer' }}>
        <Icon icon="xmark" />
      </View>
    </View>
  );
};

export default Person;
