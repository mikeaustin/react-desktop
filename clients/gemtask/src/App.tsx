import React, { useRef, useState } from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import { groupWith } from 'rambda';
import Joyride from 'react-joyride';

import { View, Text, Icon, Button, Spacer, Divider, Stack } from 'core';

import Modal from './shared/components/modal';

import { storySteps, detailsSteps } from './tourSteps';

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

const agilePages = [
  <View flex padding="small" align="left" style={{ justifyContent: 'center' }}>
    <Text textAlign="center" style={{ fontSize: 40, fontWeight: 200, lineHeight: 1.25 }}>
      “Small, autonomous, cross-functional<br />
      teams that deliver continuous, incremental<br /> value
      to a product.”
    </Text>
  </View>,
  <View>
    <Text fontSize="medium">What does it mean to be "agile"?</Text>
    <Spacer size="large" />
    <Text fontSize="large">It’s all about the product</Text>
    <Spacer size="large" />
    <Text fontSize="medium">
      First off, Agile is a philosophy, or a way of thinking. It puts focus on the working product and the communication between people making the product, rather than extensive requirements or rigorous processes. It’s also about incremental development, and working closely with the customer to ensure what you build is actually what they want.
    </Text>
    <Spacer size="large" />
    <Text fontSize="medium">
      Priorities change. Unknowns are the norm. A tight feedback loops means the product is never far off course.
    </Text>
  </View>,
  <View>
    <Text fontSize="large" fontWeight="bold">Common Roles</Text>
    <Spacer size="medium" />
    <Text>Scrum has Roles, that allow people to represent different areas.</Text>
    <Spacer size="large" />
    <Text fontSize="medium" fontWeight="bold">The Product Owner</Text>
    <Spacer size="medium" />
    <Text fontSize="medium">
      The Product Owner is responsible for managing and prioritizing the work requested by the customer. He or she breaks up the work into User Stories, and ensures the team understands them.
    </Text>
    <Spacer size="large" />
    <Text fontSize="medium" fontWeight="bold">The Dev Team Lead</Text>
    <Spacer size="medium" />
    <Text fontSize="medium">
      Scrum Master helps lead and coach the team in agile practices. He or she ensures SCRUM meetings are held and are timely and usefull, and unblocks people so they can be efficient.
    </Text>
    <Spacer size="large" />
    <Text fontSize="medium" fontWeight="bold">The Development Team</Text>
    <Spacer size="medium" />
    <Text fontSize="medium">
      Development Team is the group of people who actually make the working product. It's not only developers, but possibly also artists, designers, level designers, and so on.
    </Text>
  </View>
];

function App() {
  const [agilePageIndex, setAgilePageIndex] = useState(0);
  const [isAgileModalOpen, setIsAgileModalOpen] = useState(false);

  return (
    <>
      {/* <Joyride
        steps={storySteps}
        continuous={true}
        spotlightPadding={8}
        styles={{ options: { primaryColor: '#339af0' } }}
        locale={{ last: 'Done', open: 'Open the tour...' }}
        disableScrolling={true}
      />
      <Joyride
        steps={detailsSteps}
        continuous={true}
        styles={{ options: { primaryColor: '#339af0' } }}
        locale={{ last: 'Done', open: 'Open the tour...' }}
        disableScrolling={true}
      /> */}
      <Stack flex horizontal divider className={styles.App} style={{ overflowX: 'auto', scrollSnapType: 'x mandatory' }}>
        <View padding="small" style={{ flex: '0 0 240px', scrollSnapAlign: 'start' }}>
          <Text>GEMTASK</Text>
          <Spacer size="medium" />
          <Stack>
            <NavLink to="/backlog/GEM-1324" className={styles.Link}><Text noEvents>Product Backlog</Text></NavLink>
            <NavLink to="/epics" className={styles.Link}><Text noEvents>Epics</Text></NavLink>
            <NavLink to="/epicsxxx" className={styles.Link}><Text noEvents>Current Sprint</Text></NavLink>
          </Stack>
          <Spacer size="medium" />
          <Text onClick={() => setIsAgileModalOpen(true)}>Being Agile</Text>
        </View>
        <Outlet />
      </Stack>
      <Modal
        isOpen={isAgileModalOpen}
        title="Being Agile"
        width={800}
        height={600}
        actions={[
          <Button solid title="Back" onClick={() => setAgilePageIndex((agilePageIndex) => agilePageIndex - 1)} />,
          <Button solid primary title="Next" onClick={() => setAgilePageIndex((agilePageIndex) => agilePageIndex + 1)} />
        ]}
      >
        <View flex padding="medium">
          {agilePages[agilePageIndex]}
        </View>
      </Modal>
    </>
  );
}

export default App;
