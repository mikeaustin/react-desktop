import { View, Text, Icon, Button, Spacer, Divider, Stack } from 'core';
import { useState } from 'react';

import Field from '../../../../../shared/components/field';

import Story from '../../components/story';

const epics = [
  { title: 'Basic Authentication' },
  { title: 'Organization and Polish' },
];

const Group = ({ group, selectedItemId, onStorySelect }: any) => {
  const [isAddStoryInlineOpen, setIsAddStoryInlineOpen] = useState(false);

  return (
    <View padding="none medium" hoverable="a">
      <View horizontal align="bottom left">
        <View padding="small none">
          <Spacer size="small" />
          <Text caps fontSize="small" textColor="gray-6">{epics[group[0].epicId].title}</Text>
        </View>
        <Spacer flex size="small" />
        <Stack horizontal padding="small medium" hovered="a">
          {isAddStoryInlineOpen ? (
            <Text textColor="blue-5" style={{ marginBottom: -5 }} onClick={() => setIsAddStoryInlineOpen(false)}>Cancel</Text>
          ) : (
            <Text textColor="blue-5" style={{ marginBottom: -5 }} onClick={() => setIsAddStoryInlineOpen(true)}>Add Story</Text>
          )}
        </Stack>
      </View>
      <View>
        <Stack divider fillColor="white" style={{ borderRadius: 4, overflow: 'hidden', border: '1px solid #dee2e6' }}>
          {group.map((story: any) => (
            <Story key={story.id} selected={story.id === selectedItemId} {...story} onSelect={onStorySelect} />
          ))}
          {isAddStoryInlineOpen && (
            <View horizontal padding="small medium" align="left">
              <Field flex placeholder="A short title..." />
              <Spacer size="small" />
              <Button primary size="small" title="Add Story" />
            </View>
          )}
        </Stack>
      </View>
    </View>
  );
};

export default Group;
