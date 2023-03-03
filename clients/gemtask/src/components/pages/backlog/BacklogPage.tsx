import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHotkeys } from 'react-hotkeys-hook';
import { groupWith } from 'rambda';

import { View, Text, Icon, Button, Input, Spacer, Divider, Stack } from 'core';

import Modal from '../../../shared/components/modal';

import styles from '../../../App.module.scss';

const types = [
  { title: 'Story', icon: 'book', color: 'green-5' },
  { title: 'Task', icon: 'gear', color: 'blue-5' },
  { title: 'Bug', icon: 'bug', color: 'red-5' }
];

const statuses = [
  { title: 'Draft', color: 'gray-4' },
  { title: 'Is Ready', color: 'violet-2' },
  { title: 'In Progress', color: 'blue-2' },
  { title: 'In Review', color: 'teal-2' },
  { title: 'Done', color: 'lime-3' },
  { title: 'Blocked', color: 'orange-3' },
];

const estimateOptions = [
  { label: 'No Estimate', value: 0 },
  { label: 'A few minutes (1)', value: 1 },
  { label: 'A few hours (2)', value: 2 },
  { label: 'A few days (3)', value: 3 },
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

function Story({ id, title, estimateId, statusId, typeId, blockedById, selected, onSelect }: any) {
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
            <Text fontSize="xsmall" fontWeight="bold" style={{ fontSize: 11, lineHeight: '18px' }}>{estimateId === 0 ? <>&nbsp;</> : estimateId}</Text>
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
          <View padding="xsmall small" fillColor="yellow-1" style={{ margin: '0 16px 6px 42px', borderRadius: 4 }}>
            <Text>Dependent on a story DevOps-1234 in the “DevOps” project</Text>
          </View>
        </View>
      )}
    </Stack>
  );
}

const Assignees = () => {
  return (
    <View className={styles.hoverable}>
      <View horizontal style={{ alignItems: 'flex-end' }}>
        <Text light caps fontSize="small">Assignees</Text>
        <Spacer flex size="small" />
        <Stack horizontal spacing="medium" align="right" className={styles.onHover}>
          <Icon size="lg" icon="sliders" color="gray-6" style={{ marginTop: -3, width: 24 }} />
          <Icon size="xl" icon="square-plus" color="gray-6" style={{ margin: 0, width: 24 }} />
        </Stack>
      </View>
      <Spacer size="small" />
      <Divider />
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
          <Field flex placeholder="Responsibilities..." />
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
          <Field flex initialValue="Front-end integration and regression testing" placeholder="Responsibilities..." />
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
              <Text light fontSize="small">ux, figma, zeplin</Text>
            </View>
          </View>
          <Field flex initialValue="Design lead" placeholder="Responsibilities..." />
        </Stack>
      </Stack>
      <Divider />
    </View>
  );
};

const epics = [
  { title: 'Basic Authentication' },
  { title: 'Organization and Polish' },
];

const stories = [
  { id: 5, title: 'Asdf asdf ccalability is tested', estimateId: 2, epicId: 1, statusId: 5, typeId: 0, blockedById: 2 },
  { id: 0, title: 'Basic UI for logging in is created', estimateId: 1, epicId: 0, statusId: 4, typeId: 0, },
  { id: 1, title: 'User can log in and view stories', estimateId: 2, epicId: 0, statusId: 3, typeId: 1 },
  { id: 2, title: 'User can create new account and log in', estimateId: 3, epicId: 0, statusId: 2, typeId: 2 },
  { id: 3, title: 'Scroll to selected card in Kanban view', estimateId: 1, epicId: 1, statusId: 1, typeId: 0 },
  { id: 4, title: 'Scalability is tested', estimateId: 0, epicId: 1, statusId: 0, typeId: 0 },
];

const groupedStories = groupWith((a, b) => a.epicId === b.epicId, stories);

function BacklogPage() {
  const params = useParams();

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isAddStoryModalOpen, setIsAddStoryModalOpen] = useState<boolean>(false);

  useHotkeys('alt+n', () => setIsAddStoryModalOpen(true));

  const handleStorySelect = (storyId: number) => {
    console.log('here', storyId);

    setSelectedItemId(storyId);
  };

  return (
    <>
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
                    <Text caps fontSize="small">{epics[group[0].epicId].title}</Text>
                  </View>
                  <Spacer flex size="small" />
                  <Stack horizontal spacing="medium" padding="xsmall medium" align="bottom right" className={styles.onHover}>
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
            <View flex>
              <View padding="small medium" fillColor="gray-0">
                <Spacer size="small" />
                <Text fontSize="large">{stories.find((story) => story.id === selectedItemId)?.title}</Text>
                <Spacer size="medium" />
                <Stack horizontal spacing="large">
                  <Field label="Epic" initialValue={stories.find(story => story.id === selectedItemId)?.epicId} options={epicOptions} />
                  <Field label="Estimate" initialValue={stories.find(story => story.id === selectedItemId)?.estimateId} options={estimateOptions} />
                  <Field label="Status" initialValue={stories.find(story => story.id === selectedItemId)?.statusId} options={statusOptions} />
                  <Field label="Tags" initialValue={0} options={tagsOptions} />
                </Stack>
                <Spacer size="large" />
                <Stack horizontal spacing="medium">
                  <Text fontSize="medium">Details</Text>
                  <Text light fontSize="medium">Comments</Text>
                  <Text light fontSize="medium">Files</Text>
                  <Text light fontSize="medium">Epic</Text>
                </Stack>
              </View>
              <Divider />
              <View padding="medium" fillColor="white">
                <Spacer size="small" />
                <Field label="Description" placeholder="A short description..." />
                <Spacer size="large" />
                <Field label="Acceptance Criteria" placeholder="This story is done when..." />
                <Spacer size="large" />
                <Field label="Out of Scope" placeholder="Ignore this and that..." />
                <Spacer size="large" />
                <Field label="Testing instructions" placeholder="To test this story..." />
                <Spacer size="large" />
                <Assignees />
              </View>
            </View>
          </>
        )}
        <Modal
          isOpen={isAddStoryModalOpen}
          header={
            <>
              <Field autoFocus fontSize="large" placeholder="A short title..." />
              <Spacer size="large" />
              <Stack horizontal spacing="large">
                <Field label="Epic" options={epicOptions} />
                <Field label="Estimate" options={estimateOptions} />
                <Field label="Tags" initialValue={0} options={tagsOptions} />
              </Stack>
            </>
          }
          actions={[
            <Button solid primary title="Add Story" onClick={() => setIsAddStoryModalOpen(false)} />,
            <Button solid title="Cancel" onClick={() => setIsAddStoryModalOpen(false)} />,
          ]}
        >
          <Stack spacing="large">
            <Field label="Description" placeholder="A short description..." />
            <Field label="Acceptance Criteria" placeholder="This story is done when..." />
            <Field label="Out of Scope" placeholder="Ignore this and that..." />
            <Field label="Testing instructions" placeholder="To test this story..." />
          </Stack>
        </Modal>
      </View>
    </>
  );
}

export default BacklogPage;
