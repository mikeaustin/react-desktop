import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useHotkeys } from 'react-hotkeys-hook';
import { groupWith } from 'rambda';

import { View, Text, Icon, Button, Spacer, Divider, Stack } from 'core';

import Modal from '../../../shared/components/modal';
import Field from '../../../shared/components/field';

import Comments from './components/comments';
import Details from './components/details';
import Story from './components/story';

import styles from '../../../App.module.scss';

const estimateOptions = [
  { label: 'No Estimate', value: 0 },
  { label: '1 – A few minutes', value: 1 },
  { label: '2 – A few hours', value: 2 },
  { label: '3 – A few days', value: 3 },
];

const statusOptions = [
  { label: 'Draft', value: 0 },
  { label: 'Is Ready', value: 1 },
  { label: 'In Progress', value: 2 },
  { label: 'In Review', value: 3 },
  { label: 'Done', value: 4 },
  { label: 'Blocked', value: 5 },
];

const epicOptions = [
  { label: 'Basic Authentication', value: 0 },
  { label: 'Organization and Polish', value: 1 },
];

const tagsOptions = [
  { label: 'payment', value: 0 },
  { label: 'customer', value: 1 },
];

const epics = [
  { title: 'Basic Authentication' },
  { title: 'Organization and Polish' },
];

const stories = [
  { id: 5, title: 'Asdf asdf ccalability is tested', estimateId: 2, epicId: 1, statusId: 5, typeId: 0, blockedById: 2 },
  { id: 0, title: 'Basic UI for logging in is created', estimateId: 1, epicId: 0, statusId: 4, typeId: 0, },
  { id: 1, title: 'User can log in and view stories', estimateId: 2, epicId: 0, statusId: 3, typeId: 1 },
  { id: 2, title: 'User can create new account and log in', estimateId: 3, epicId: 0, statusId: 2, typeId: 2 },
  { id: 3, title: 'Scroll to selected card in Kanban view', estimateId: 1, epicId: 1, statusId: 1, typeId: 0, dueDate: 'Apr 15, 2023' },
  { id: 4, title: 'Scalability is tested', estimateId: 0, epicId: 1, statusId: 0, typeId: 0, questionsCount: 2 },
];

const groupedStories = groupWith((a, b) => a.epicId === b.epicId, stories);

function BacklogPage() {
  const params = useParams();

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [detailsTabIndex, setDetailsTabIndex] = useState<number>(0);
  const [isAddStoryModalOpen, setIsAddStoryModalOpen] = useState<boolean>(false);

  const scrollTimerRef = useRef<ReturnType<typeof setTimeout>>();

  useHotkeys('alt+n', () => setIsAddStoryModalOpen(true));

  const handleStorySelect = (storyId: number) => {
    console.log('here', storyId);

    setSelectedItemId(storyId);
  };

  const handleDetailsScroll = () => {
    clearTimeout(scrollTimerRef.current);

    scrollTimerRef.current = setTimeout(() => {
      const parentElement = document.getElementById('details')?.parentElement;

      if (parentElement) {
        console.log('here', Math.round(parentElement.scrollLeft / (parentElement.scrollWidth - parentElement.clientWidth)));

        const index = parentElement.scrollLeft / (parentElement.scrollWidth - parentElement.clientWidth);

        if (Math.floor(index) === index) {
          setDetailsTabIndex(Math.floor(index));
        }
      }
    }, 100);
  };

  useEffect(() => {
    switch (detailsTabIndex) {
      case 0:
        document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 1:
        document.getElementById('comments')?.scrollIntoView({ behavior: 'smooth' });
        break;
    }
  }, [detailsTabIndex]);

  return (
    <>
      <View flex horizontal className={styles.content} style={{ scrollSnapAlign: 'start' }}>
        <View flex fillColor="gray-1" className={styles.backlog} style={{ width: 'calc(70vw - 256px - 2px)' }}>
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
          <View style={{ overflow: 'auto' }}>
            {groupedStories.map((group, index) => (
              <View key={index} className={styles.hoverable}>
                <View horizontal>
                  <View padding="small medium">
                    <Spacer size="small" />
                    <Text caps fontSize="small" textColor="gray-6">{epics[group[0].epicId].title}</Text>
                  </View>
                  <Spacer flex size="small" />
                  <Stack horizontal spacing="medium" padding="xsmall medium" align="bottom right" className={styles.hovered}>
                    <Icon size="lg" icon="sliders" color="gray-6" style={{ marginTop: 0, marginBottom: 2, width: 24 }} />
                    <Icon size="xl" icon="square-plus" color="gray-6" style={{ margin: 0, width: 24 }} onClick={() => setIsAddStoryModalOpen(true)} />
                  </Stack>
                </View>
                {/* <Divider /> */}
                <View padding="none medium">
                  <Stack divider style={{ borderRadius: 4, overflow: 'hidden', border: '1px solid #dee2e6', boxShadow: 'inset 0 0 0 1px red' }}>
                    {group.map(story => (
                      <Story key={story.id} selected={story.id === selectedItemId} {...story} onSelect={handleStorySelect} />
                    ))}
                  </Stack>
                </View>
                {/* <Divider /> */}
              </View>
            ))}
            <View horizontal padding="medium">
              <Button solid title="Add Story" onClick={() => setIsAddStoryModalOpen(true)} />
            </View>
          </View>
        </View>
        {params.itemId && (
          <>
            <Divider />
            <View flex className={styles.backlog} style={{ width: 'calc(30vw - 256px - 2px)', scrollSnapAlign: 'start' }}>
              <View padding="small medium" fillColor="gray-0">
                <Spacer size="small" />
                <Text light caps fontSize="small">GEM-1324 — User Story</Text>
                <Spacer size="small" />
                <Text fontSize="large">{stories.find((story) => story.id === selectedItemId)?.title}</Text>
                <Spacer size="large" />
                <Stack horizontal style={{ flexWrap: 'wrap', columnGap: 16, rowGap: 16 }}>
                  <Field label="Estimate" initialValue={stories.find(story => story.id === selectedItemId)?.estimateId} options={estimateOptions} />
                  <Field label="Status" initialValue={stories.find(story => story.id === selectedItemId)?.statusId} options={statusOptions} />
                  <Field label="Due Date" initialValue={'Apr 15, 2023'} />
                  <Field label="Epic" initialValue={stories.find(story => story.id === selectedItemId)?.epicId} options={epicOptions} />
                </Stack>
                <Spacer size="large" />
                <Stack horizontal spacing="medium">
                  <Text light={detailsTabIndex !== 0} fontSize="medium" onClick={() => setDetailsTabIndex(0)} style={{ cursor: 'pointer' }}>Details</Text>
                  <Text light={detailsTabIndex !== 1} fontSize="medium" onClick={() => setDetailsTabIndex(1)} style={{ cursor: 'pointer' }}>Questions</Text>
                  <Text light={detailsTabIndex !== 2} fontSize="medium" onClick={() => setDetailsTabIndex(2)} style={{ cursor: 'pointer' }}>Attachments</Text>
                </Stack>
              </View>
              <Divider />
              <View flex horizontal fillColor="white" style={{ overflow: 'auto', width: '100%', scrollSnapType: 'x mandatory' }} onScroll={handleDetailsScroll}>
                <Details />
                <Divider style={{ marginLeft: -1 }} />
                <Comments />
              </View>
            </View>
          </>
        )}
        <Modal
          isOpen={isAddStoryModalOpen}
          header={
            <>
              <Field autoFocus fontSize="large" placeholder="A short title for this story..." />
              <Spacer size="large" />
              <Stack horizontal style={{ flexWrap: 'wrap', columnGap: 16, rowGap: 16 }}>
                <Field label="Estimate" options={estimateOptions} />
                <Field label="Due Date" initialValue="" options={tagsOptions} />
                <Field label="Epic" options={epicOptions} />
              </Stack>
            </>
          }
          actions={[
            <Button solid primary title="Add Story" onClick={() => setIsAddStoryModalOpen(false)} />,
            <Button solid title="Cancel" onClick={() => setIsAddStoryModalOpen(false)} />,
          ]}
        >
          <Stack spacing="large">
            <Field label="Description" placeholder="A short description of who this is for, what it solves, and what is out of scope..." />
            <Field label="Acceptance Criteria" placeholder="This story is done when these things are true..." />
            <Field label="Testing instructions" placeholder="To test this story..." />
          </Stack>
        </Modal>
      </View>
    </>
  );
}

export default BacklogPage;