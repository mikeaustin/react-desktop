import React, { useEffect, useState } from 'react';

import { View, Text, Icon, Button, Input, Spacer, Divider, Stack } from 'core';

import Field from '../../../../../shared/components/field';

const Comments = () => {
  return (
    <View padding="medium" style={{ flexBasis: '100%', flexShrink: 0, scrollSnapAlign: 'start' }}>
      <View>
        <Text light caps fontSize="small">Unanswered Questions</Text>
        <Spacer size="small" />
      </View>

      <Stack spacing="medium" >
        <View fillColor="gray-0" style={{ border: '1px solid #dee2e6', borderRadius: 4 }}>
          <View horizontal padding="small medium">
            <View fillColor="gray-2" align="center" style={{ width: 32, height: 32, margin: '-1px 0', borderRadius: 1000, boxShadow: '0 0 0 1px white' }}>
              <Text fontSize="small" fontWeight="semi-bold">BH</Text>
            </View>
            <Spacer size="small" />
            <View style={{ width: 200 }}>
              <Text>Beckett Hawkins</Text>
              <Spacer size="small" />
              <Text light fontSize="small">Mon, Mar 6, 2023</Text>
            </View>
            <Spacer flex size="small" />
            <Button solid size="small" title="Resolve Question" />
          </View>
          <Divider />
          <View padding="medium">
            <Text>
              The row displays after clicking Add Story, but it is not optimized. Should we update the cache with writeQuery so we don't need to fetch all epics again.
            </Text>
            <Spacer size="medium" />
            <View padding="medium" fillColor="gray-2" style={{ borderRadius: 4 }}>
              <Text light fontSize="small" fontWeight="semi-bold">Annabelle Webber @ Mon, Mar 6, 2023</Text>
              <Spacer size="small" />
              <Text>In reply to your question, yes, we should update the cache with writeQuery</Text>
            </View>
            <Spacer size="medium" />
            <View padding="medium" fillColor="gray-2" style={{ borderRadius: 4 }}>
              <Text light fontSize="small" fontWeight="semi-bold">Annabelle Webber @ Mon, Mar 6, 2023</Text>
              <Spacer size="small" />
              <Text>In reply to your question, yes, we should update the cache with writeQuery</Text>
            </View>
          </View>
          <Divider />
          <View horizontal align="center" padding="small medium" fillColor="white">
            <Field flex placeholder="Reply to thread..." />
            <Spacer size="small" />
            <Button solid primary size="small" title="Reply" />
          </View>
        </View>

        <View fillColor="gray-0" style={{ border: '1px solid #dee2e6', borderRadius: 4 }}>
          <View horizontal padding="small medium">
            <View fillColor="gray-2" align="center" style={{ width: 32, height: 32, margin: '-1px 0', borderRadius: 1000, boxShadow: '0 0 0 1px white' }}>
              <Text fontSize="small" fontWeight="semi-bold">BH</Text>
            </View>
            <Spacer size="small" />
            <View style={{ width: 200 }}>
              <Text>Beckett Hawkins</Text>
              <Spacer size="small" />
              <Text light fontSize="small">Mon, Mar 6, 2023</Text>
            </View>
            <Spacer flex size="small" />
            <Button solid size="small" title="Resolve" />
          </View>
          <Divider />
          <View padding="medium">
            <Text>
              The row displays after clicking Add Story, but it is not optimized. We should update the cache with writeQuery so we don't need to fetch all epics again.
            </Text>
            <Spacer size="medium" />
            <View padding="medium" fillColor="gray-2" style={{ borderRadius: 4 }}>
              <Text light fontSize="small" fontWeight="semi-bold">Annabelle Webber @ Mon, Mar 6, 2023</Text>
              <Spacer size="small" />
              <Text>In reply to your question, yes, we should update the cache with writeQuery</Text>
            </View>
          </View>
          <Divider />
          <View horizontal align="center" padding="small medium" fillColor="white">
            <Field flex placeholder="Reply to thread..." />
            <Spacer size="small" />
            <Button solid primary size="small" title="Reply" />
          </View>
        </View>
      </Stack>

      <View>
        <Spacer size="medium" />
        <Text light caps fontSize="small">Story Updates</Text>
        <Spacer size="small" />
      </View>

      <Stack spacing="medium" >
        <View fillColor="gray-0" style={{ border: '1px solid #dee2e6', borderRadius: 4 }}>
          <View horizontal padding="small medium">
            <View fillColor="gray-2" align="center" style={{ width: 32, height: 32, margin: '-1px 0', borderRadius: 1000, boxShadow: '0 0 0 1px white' }}>
              <Text fontSize="small" fontWeight="semi-bold">BH</Text>
            </View>
            <Spacer size="small" />
            <View style={{ width: 200 }}>
              <Text>Beckett Hawkins</Text>
              <Spacer size="small" />
              <Text light fontSize="small">Mon, Mar 6, 2023</Text>
            </View>
          </View>
          <Divider />
          <View padding="medium">
            <Text>
              The row displays after clicking Add Story, but it is not optimized. We should update the cache with writeQuery so we don't need to fetch all epics again.
            </Text>
          </View>
        </View>
      </Stack>

    </View>
  );
};

export default Comments;
