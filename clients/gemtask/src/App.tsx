import React from 'react';
import { groupWith } from 'rambda';
import { Outlet, Link } from 'react-router-dom';

import { View, Text, Icon, Button, Spacer, Divider, Stack } from 'core';

import styles from './App.module.scss';

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

function App() {
  return (
    <Stack flex horizontal divider className={styles.App}>
      <View padding="medium" style={{ minWidth: 256 }}>
        <Text>GEMTASK</Text>
        <Spacer size="medium" />
        <Link to="backlog">Backlog</Link>
      </View>
      <Outlet />
    </Stack>
  );
}

export default App;
