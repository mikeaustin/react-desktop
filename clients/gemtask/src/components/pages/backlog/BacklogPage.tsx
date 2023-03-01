import React, { useState } from 'react';
import { groupWith } from 'rambda';
import { useParams } from 'react-router-dom';

import { View, Text, Icon, Button, Input, Spacer, Divider, Stack } from 'core';

import styles from '../../../App.module.scss';

const types = [
  { title: 'Story', icon: 'book', color: 'green-5' },
  { title: 'Task', icon: 'gear', color: 'blue-5' },
  { title: 'Bug', icon: 'bug', color: 'red-5' }
];

const statuses = [
  { title: 'Draft', color: 'gray-4' },
  { title: 'Sprint Ready', color: 'violet-2' },
  { title: 'In Progress', color: 'blue-2' },
  { title: 'In Review', color: 'teal-2' },
  { title: 'Complete', color: 'lime-3' },
  { title: 'Blocked', color: 'orange-3' },
];

function Story({ id, title, statusId, typeId, blockedById, selected, onSelect }: any) {
  return (
    <Stack draggable fillColor={selected ? 'blue-0' : 'white'} onClick={() => onSelect(id)}>
      {/* <View style={{ width: 5 }} fillColor={types[typeId].color as any} /> */}
      <Stack flex horizontal spacing="xlarge" padding="small medium">
        <View flex horizontal>
          <Icon size="sm" icon={types[typeId].icon as any} style={{ marginTop: -1 }} color={types[typeId].color as any} />
          {/* <View style={{ width: 12, height: 12, borderRadius: 1000 }} fillColor={statuses[statusId].color as any} /> */}
          <Spacer size="small" />
          <View>
            <Text fontWeight="semi-bold">{title}</Text>
            <Spacer size="small" />
            <Stack horizontal spacing="medium">
              <View horizontal>
                {/* <Icon size="sm" icon={types[typeId].icon as any} style={{ marginTop: -1 }} color={types[typeId].color as any} />
                <Spacer size="xsmall" /> */}
                <Text light fontSize="small">GEM-42</Text>
              </View>
              <View padding="xsmall small" fillColor="gray-1" style={{ padding: '2px 4px', margin: '-2px 0', borderRadius: 2 }}>
                <Text light fontSize="small">front-end</Text>
              </View>
            </Stack>
          </View>
        </View>

        <View style={{ alignItems: 'flex-end' }}>
          <View padding="xsmall small" align="center" fillColor={statuses[statusId].color as any} style={{ borderRadius: 10, width: 30 }}>
            <Text fontSize="xsmall" fontWeight="bold" style={{ fontSize: 11, lineHeight: '18px' }}>2</Text>
          </View>
          <Spacer size="xsmall" />
          <Text fontSize="small" fontWeight="normal">{statuses[statusId].title}</Text>
        </View>

        <View horizontal>
          <View fillColor="gray-2" align="center" style={{ width: 30, marginLeft: -5, borderRadius: 1000, boxShadow: '0 0 0 1px white' }}>
            <Text fontSize="small" fontWeight="semi-bold">AJ</Text>
          </View>
          <View fillColor="gray-2" align="center" style={{ width: 30, marginLeft: -5, borderRadius: 1000, boxShadow: '0 0 0 1px white' }}>
            <Text fontSize="small" fontWeight="semi-bold">MR</Text>
          </View>
          <View fillColor="gray-2" align="center" style={{ width: 30, marginLeft: -5, borderRadius: '50%', boxShadow: '0 0 0 1px white' }}>
            <Icon icon="ellipsis" />
          </View>
        </View>
      </Stack>
      {blockedById !== undefined && (
        <View horizontal>
          <View padding="small medium" fillColor="yellow-0" style={{ margin: '0 16px 6px 42px', borderRadius: 4 }}>
            <Text>Dependent on a story in the “DevOps” project</Text>
          </View>
        </View>
      )}
    </Stack>
  );
}

const Assignees = () => {
  return (
    <Stack divider>
      <Stack horizontal spacing="medium" padding="small none">
        <View horizontal>
          <View fillColor="gray-2" align="center" style={{ width: 32, height: 32, margin: '-1px 0', borderRadius: 1000, boxShadow: '0 0 0 1px white' }}>
            <Text fontSize="small" fontWeight="semi-bold">MR</Text>
          </View>
          <Spacer size="small" />
          <View style={{ width: 200 }}>
            <Text>Annabelle Webber</Text>
            <Spacer size="small" />
            <Text light fontSize="small">c#, microservice, aws</Text>
          </View>
        </View>
        <Text light contentEditable>Responsibilities...</Text>
      </Stack>
      <Stack horizontal spacing="medium" padding="small none">
        <View horizontal>
          <View fillColor="gray-2" align="center" style={{ width: 32, height: 32, margin: '-1px 0', borderRadius: 1000, boxShadow: '0 0 0 1px white' }}>
            <Text fontSize="small" fontWeight="semi-bold">BH</Text>
          </View>
          <Spacer size="small" />
          <View style={{ width: 200 }}>
            <Text>Beckett Hawkins</Text>
            <Spacer size="small" />
            <Text light fontSize="small">ui, react, integration</Text>
          </View>
        </View>
        <View>
          <Text contentEditable>Front-end integration and regression testing</Text>
        </View>
      </Stack>
    </Stack>
  );
};

const epics = [
  { title: 'Basic Authentication' },
  { title: 'Organization and Polish' },
];

const stories = [
  { id: 5, title: 'Asdf asdf ccalability is tested', epicId: 1, statusId: 5, typeId: 0, blockedById: 2 },
  { id: 0, title: 'Basic UI for logging in is created', epicId: 0, statusId: 4, typeId: 0, },
  { id: 1, title: 'User can log in and view stories', epicId: 0, statusId: 3, typeId: 1 },
  { id: 2, title: 'User can create new account and log in', epicId: 0, statusId: 2, typeId: 2 },
  { id: 3, title: 'Scroll to selected card in Kanban view', epicId: 1, statusId: 1, typeId: 0 },
  { id: 4, title: 'Scalability is tested', epicId: 1, statusId: 0, typeId: 0 },
];

const groupedStories = groupWith((a, b) => a.epicId === b.epicId, stories);

function BacklogPage() {
  const params = useParams();

  console.log(params);

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const handleStorySelect = (storyId: number) => {
    console.log('here', storyId);

    setSelectedItemId(storyId);
  };

  return (
    <View flex horizontal>
      <View flex fillColor="gray-1">
        <View padding="small medium" fillColor="gray-0">
          <Spacer size="small" />
          <Text fontSize="large">Product Backlog</Text>
          <Spacer size="medium" />
          <Stack horizontal spacing="medium">
            <Text textColor="blue-7">Assigned to Me</Text>
            <Text textColor="blue-7">Flagged Items</Text>
          </Stack>
        </View>
        <Divider />
        <View>
          {groupedStories.map((group, index) => (
            <View key={index} className={styles.hoverable}>
              <View horizontal>
                <View padding="small medium">
                  <Spacer size="small" />
                  <Text caps>{epics[group[0].epicId].title}</Text>
                </View>
                <Spacer flex size="small" />
                <Stack horizontal spacing="medium" padding="xsmall medium" align="bottom right" className={styles.onHover}>
                  <Icon size="lg" icon="sliders" color="gray-6" style={{ marginTop: 0, marginBottom: 2, width: 24 }} />
                  <Icon size="xl" icon="square-plus" color="gray-6" style={{ margin: 0, width: 24 }} />
                </Stack>
              </View>
              <Divider />
              <Stack divider>
                {group.map(story => (
                  <Story key={story.id} id={story.id} title={story.title} statusId={story.statusId} typeId={story.typeId} blockedById={story.blockedById} selected={story.id === selectedItemId} onSelect={handleStorySelect} />
                ))}
              </Stack>
              <Divider />
            </View>
          ))}
          <View horizontal padding="medium">
            <Button solid title="Add Item" />
          </View>
        </View>
      </View>
      {params.itemId && (
        <>
          <Divider />
          <View flex>
            <View padding="small medium" fillColor="gray-0">
              <Spacer size="small" />
              <Text fontSize="large">{stories.find((story) => story.id === selectedItemId)?.title}</Text>
              <Spacer size="medium" />
              <Stack horizontal spacing="large">
                <View>
                  <Text light caps fontSize="small">Estimate</Text>
                  <Spacer size="small" />
                  <Text>2 – A few hours</Text>
                </View>
                <View>
                  <Text light caps fontSize="small">Status</Text>
                  <Spacer size="small" />
                  <Text>In Progress</Text>
                </View>
              </Stack>
              <Spacer size="large" />
              <Text fontSize="medium">Details</Text>
            </View>
            <Divider />
            <View padding="medium" fillColor="white">
              <Spacer size="small" />
              <Text light caps fontSize="small">Description</Text>
              <Spacer size="small" />
              <Text>Blah blah blah</Text>
              <Spacer size="large" />
              <Text light caps fontSize="small">Acceptance Criteria</Text>
              <View contentEditable placeholder="This item is done when">
                <Spacer size="small" />
                <Text>This item is done when...</Text>
                {/* <ul>
                  <li></li>
                </ul> */}
              </View>
              <Spacer size="large" />
              <Text light caps fontSize="small">Assignees</Text>
              <Spacer size="small" />
              <Divider />
              <Assignees />
              <Divider />
            </View>
          </View>
        </>
      )}
    </View>
  );
}

export default BacklogPage;
