import React from 'react';
import { groupWith } from 'rambda';

import { View, Text, Icon, Spacer, Divider, Stack } from 'core';

import './App.css';

const types = [
  { title: 'Story', icon: 'book', color: 'green-4' },
  { title: 'Task', icon: 'gear', color: 'blue-4' },
  { title: 'Bug', icon: 'bug', color: 'red-4' }
];

const statuses = [
  { title: 'Draft', color: 'gray-4' },
  { title: 'Sprint Ready', color: 'violet-2' },
  { title: 'In Progress', color: 'blue-2' },
  { title: 'In Review', color: 'teal-2' },
  { title: 'Complete', color: 'lime-3' },
  { title: 'Blocked', color: 'orange-3' },
];

function Story({ title, statusId, typeId, blockedById }: any) {
  return (
    <Stack draggable fillColor="white">
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
          <View fillColor="gray-2" align="center" style={{ width: 32, marginLeft: -5, borderRadius: 1000, boxShadow: '0 0 0 1px white' }}>
            <Text fontSize="small" fontWeight="semi-bold">AJ</Text>
          </View>
          <View fillColor="gray-2" align="center" style={{ width: 32, marginLeft: -5, borderRadius: 1000, boxShadow: '0 0 0 1px white' }}>
            <Text fontSize="small" fontWeight="semi-bold">MR</Text>
          </View>
          <View fillColor="gray-2" align="center" style={{ width: 32, marginLeft: -5, borderRadius: '50%', boxShadow: '0 0 0 1px white' }}>
            <Icon icon="ellipsis" />
          </View>
        </View>
      </Stack>
      {/* {blockedById !== undefined && (
        <View padding="small medium" fillColor="orange-2" style={{ margin: '0 16px 6px 42px' }}>
          <Text>Blocked by</Text>
        </View>
      )} */}
    </Stack>
  );
}

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

function App() {
  return (
    <Stack flex horizontal divider className="App">
      <View padding="medium" style={{ minWidth: 256 }}>
        GEMTASK
      </View>
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
            <View key={index}>
              <View horizontal>
                <View padding="small medium">
                  <Spacer size="small" />
                  <Text caps>{epics[group[0].epicId].title}</Text>
                </View>
                <Spacer flex size="small" />
                <View padding="small medium" align="bottom right">
                  <Icon size="lg" icon="square-plus" color="gray-6" style={{ margin: 0, width: 20 }} />
                </View>
              </View>
              <Divider />
              <Stack divider>
                {group.map(story => (
                  <Story key={story.id} title={story.title} statusId={story.statusId} typeId={story.typeId} blockedById={story.blockedById} />
                ))}
              </Stack>
              <Divider />
            </View>
          ))}
        </View>
        <Spacer size="xlarge" />
      </View>
    </Stack>
  );
}

export default App;
