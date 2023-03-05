import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useHotkeys } from 'react-hotkeys-hook';
import { groupWith } from 'rambda';

import { View, Text, Icon, Button, Input, Spacer, Divider, Stack } from 'core';

import styles from '../../../App.module.scss';

function Field({ label, initialValue, placeholder, options, fontSize, autoFocus, ...props }: any) {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(initialValue ?? '');
  }, [initialValue]);

  const editor = options ? (
    <select value={initialValue} className={styles.Select}>
      {options.map((option: any) => (
        <option value={option.value}>{option.label}</option>
      ))}
    </select>
  ) : (
    <View className={styles.Field}>
      <Text contentEditable autoFocus={autoFocus} fontSize={fontSize} style={{ fontStyle: value.length === 0 ? 'italic' : undefined }}>
        {value.length === 0 ? placeholder : value}
      </Text>
    </View>
  );

  return (
    <View {...props}>
      {label && (
        <>
          <View horizontal>
            <Text light caps fontSize="small">{label}</Text>
            {options && <Icon icon="caret-down" color="gray-5" />}
          </View>
          <Spacer size="small" />
        </>
      )}
      {editor}
    </View>
  );
}

export default Field;
