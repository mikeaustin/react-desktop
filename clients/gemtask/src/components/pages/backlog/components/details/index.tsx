import { View, Text, Icon, Button, Input, Spacer, Divider, Stack } from 'core';

import Modal from '../../../../../shared/components/modal';
import Field from '../../../../../shared/components/field';

import Assignees from '../assignees';

const tagsOptions = [
  { label: 'payment', value: 0 },
  { label: 'customer', value: 1 },
];

const Details = () => {
  return (
    <Stack id="details" spacing="large" padding="medium" style={{ flexBasis: '100%', flexShrink: 0, scrollSnapAlign: 'start' }}>
      <Field label="Description" placeholder="A short description of who this is for, what it solves, and what is out of scope..." />
      <Field label="Acceptance Criteria" placeholder="This story is done when these things are true..." />
      <Field label="Testing instructions" placeholder="To test this story..." />
      <Field label="Tags" initialValue={0} options={tagsOptions} />
      <Assignees />
    </Stack>
  );
};

export default Details;
