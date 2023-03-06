import React, { useEffect, useState } from 'react';

import { View, Text, Icon, Button, Input, Spacer, Divider, Stack } from 'core';

import Field from '../../../../../shared/components/field';

const Comments = () => {
  return (
    <Stack divider spacing="medium" padding="medium" style={{ flexBasis: '100%', flexShrink: 0, scrollSnapAlign: 'start' }}>
      <View>
        <View horizontal>
          <View fillColor="gray-2" align="center" style={{ width: 32, height: 32, margin: '-1px 0', borderRadius: 1000, boxShadow: '0 0 0 1px white' }}>
            <Text fontSize="small" fontWeight="semi-bold">BH</Text>
          </View>
          <Spacer size="small" />
          <View style={{ width: 200 }}>
            <Text>Beckett Hawkins</Text>
            <Spacer size="small" />
            <Text light fontSize="small">ux, figma, zeplin</Text>
          </View>
        </View>
        <Spacer size="medium" />
        <Text>
          The row displays after clicking Add Story, but it is not optimized. We should update the cache with writeQuery so we don't need to fetch all epics again.
        </Text>
        <Spacer size="medium" />
        <View horizontal align="center">
          <Field flex placeholder="Reply to thread..." />
          <Spacer size="small" />
          <Button solid primary title="Reply" />
        </View>
      </View>
      <View>
        <Text>hi</Text>
      </View>
    </Stack>
  );
};

export default Comments;
