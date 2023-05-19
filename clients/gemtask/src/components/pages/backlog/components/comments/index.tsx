import React, { useEffect, useState } from 'react';

import { View, Text, Icon, Button, Input, Spacer, Divider, Stack } from 'core';

import Field from '../../../../../shared/components/field';

const Comments = () => {
  return (
    <View id="comments" fillColor="gray-1" style={{ flexBasis: '100%', flexShrink: 0, overflowY: 'auto', scrollSnapAlign: 'start' }}>
      <View horizontal padding="small medium" fillColor="white" align="left">
        <Field flex placeholder="Ask a new question..." />
        <Spacer size="small" />
        <Button primary size="small" title="Ask Question" />
      </View>
      <Divider />

      <View padding="small medium" fillColor="gray-1">
        <Spacer size="small" />
        <Text light caps fontSize="small">Unresolved Questions</Text>
      </View>
      <Divider />
      <Stack fillColor="gray-1">
        <View fillColor="white">
          <View horizontal padding="small medium" fillColor="white">
            <View fillColor="gray-2" align="center" style={{ width: 32, height: 32, margin: '-1px 0', borderRadius: 1000, boxShadow: '0 0 0 1px white' }}>
              <Text fontSize="small" fontWeight="semi-bold">BH</Text>
            </View>
            <Spacer size="small" />
            <View>
              <Text fontWeight="medium">Beckett Hawkins</Text>
              <Spacer size="small" />
              <Text light fontSize="small">Mon, Mar 6, 2023</Text>
            </View>
            <Spacer flex size="small" />
            <View horizontal align="left">
              <Icon icon="question-circle" color="gray-5" />
              <Spacer size="xsmall" />
              <Text light >Unresolved</Text>
            </View>
          </View>
          <Divider style={{ marginLeft: 16 }} />
          <Spacer size="small" />
          <View padding="small medium">
            <Text>
              The row displays after clicking Add Story, but it is not optimized. Should we update the cache with writeQuery so we don't need to fetch all epics again?
            </Text>
            <Spacer size="medium" />
            <View horizontal>
              <View fillColor="gray-1" align="center" style={{ minWidth: 32, height: 32, borderRadius: 1000 }}>
                <Text fontSize="small" fontWeight="semi-bold">AW</Text>
              </View>
              <Spacer size="small" />
              <View padding="small medium" fillColor="gray-1" hoverable="a" style={{ borderRadius: 4, position: 'relative' }}>
                <Button solid primary size="small" icon="circle-check" hovered="a" style={{ position: 'absolute', right: 16, bottom: -10 }} />
                <Text>In reply to your question, yes, we should update the cache with writeQuery</Text>
                <Spacer size="small" />
                <Text light fontSize="small">Annabelle Webber &nbsp;&middot;&nbsp; Mon, Mar 6, 2023</Text>
              </View>
            </View>
            <Spacer size="small" />
            <View horizontal align="center" fillColor="white">
              <Field flex placeholder="Reply to thread..." style={{ marginLeft: 41 }} />
              <Spacer size="small" />
              <Button solid primary size="small" title="Reply" />
            </View>
          </View>
        </View>
      </Stack>

      <Divider />

      <View padding="small medium" fillColor="gray-1">
        <Spacer size="small" />
        <Text light caps fontSize="small">Resolved Questions</Text>
      </View>
      <Divider />

      <Stack fillColor="gray-1">
        <View fillColor="white">
          <View horizontal padding="small medium" fillColor="white">
            <View fillColor="gray-2" align="center" style={{ width: 32, height: 32, margin: '-1px 0', borderRadius: 1000 }}>
              <Text fontSize="small" fontWeight="semi-bold">BH</Text>
            </View>
            <Spacer size="small" />
            <View flex horizontal align="left">
              <View>
                <Text fontWeight="medium">Beckett Hawkins</Text>
                <Spacer size="small" />
                <Text light fontSize="small">Mon, Mar 6, 2023</Text>
              </View>
              <Spacer flex size="small" />
              <View horizontal align="left">
                <Icon icon="circle-check" color="green-5" />
                <Spacer size="xsmall" />
                <Text fontWeight="semi-bold" textColor="green-6">Resolved</Text>
              </View>
            </View>
          </View>
          <Divider style={{ marginLeft: 16 }} />
          <Spacer size="small" />
          <View padding="small medium">
            <Text>
              The row displays after clicking Add Story, but it is not optimized. Should we update the cache with writeQuery so we don't need to fetch all epics again?
            </Text>
            <Spacer size="medium" />
            <View horizontal>
              <View fillColor="gray-1" align="center" style={{ minWidth: 32, height: 32, borderRadius: 1000 }}>
                <Text fontSize="small" fontWeight="semi-bold">AW</Text>
              </View>
              <Spacer size="small" />
              <View padding="small medium" fillColor="gray-1" style={{ borderRadius: 4 }}>
                <Text>In reply to your question, yes, we should update the cache with writeQuery</Text>
                <Spacer size="small" />
                <Text light fontSize="small">Annabelle Webber &nbsp;&middot;&nbsp; Mon, Mar 6, 2023</Text>
              </View>
            </View>
            <Spacer size="small" />
            <View horizontal>
              <View fillColor="gray-1" align="center" style={{ minWidth: 32, height: 32, borderRadius: 1000 }}>
                <Text fontSize="small" fontWeight="semi-bold">AW</Text>
              </View>
              <Spacer size="small" />
              <View padding="small medium" fillColor="gray-1" style={{ borderRadius: 4, position: 'relative' }}>
                <Icon icon="circle-check" color="green-5" style={{ position: 'absolute', right: -10, top: 10 }} />
                <Text>Yes, we should update the cache with writeQuery</Text>
                <Spacer size="small" />
                <Text light fontSize="small">Annabelle Webber &nbsp;&middot;&nbsp; Mon, Mar 6, 2023</Text>
              </View>
            </View>
          </View>
        </View>
      </Stack>

      <Divider />

    </View>
  );
};

export default Comments;
