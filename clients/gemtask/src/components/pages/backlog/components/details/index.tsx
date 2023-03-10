import { View, Text, Icon, Button, Input, Spacer, Divider, Stack } from 'core';

import Modal from '../../../../../shared/components/modal';
import Field from '../../../../../shared/components/field';

import Assignees from '../assignees';

import styles from '../../../../../App.module.scss';

const tagsOptions = [
  { label: 'payment', value: 0 },
  { label: 'customer', value: 1 },
];

const Details = () => {
  return (
    <Stack id="details" spacing="large" padding="medium" style={{ flexBasis: '100%', flexShrink: 0, scrollSnapAlign: 'start' }}>
      <Field
        // fontSize="medium"
        label="Description"
        initialValue="As the Quote Product Owner, I need UW Question 1970 mapping updated for Chubb WC rater, so that we enhance validation"
        placeholder="A short description of who this is for, what it solves, and what is out of scope..."
      />
      {/* <Field label="Acceptance Criteria" placeholder="This story is done when these things are true..." /> */}
      <View>
        <Text light caps fontSize="small">Acceptance Criteria</Text>
        <Spacer size="small" />
        <View className={styles.Field}>
          <Text contentEditable>
            <View style={{ margin: 0, paddingLeft: 0, listStyle: 'none' }}>
              <Divider spacing="xsmall" />
              <View horizontal align="top left">
                <input checked type="checkbox" style={{ marginTop: 4, marginRight: 8 }} />
                New coverage fields are in the comparison document as listed in the sample attached
              </View>
              <Divider spacing="xsmall" style={{ marginLeft: 24 }} />
              <View horizontal align="top left">
                <input type="checkbox" style={{ marginTop: 4, marginRight: 8 }} />
                Quote Comparison document accurately reflects the fields from TRUDI
              </View>
              <Spacer size="xsmall" />
              <Divider />
            </View>
          </Text>
        </View>
      </View>
      {/* <Field label="Testing instructions" placeholder="To test this story..." /> */}
      <View className={styles.hoverable}>
        <Text light caps fontSize="small">Tags</Text>
        <Spacer size="small" />
        <Stack horizontal style={{ gap: 4 }}>
          <View fillColor="gray-1" padding="xsmall small" style={{ borderRadius: 4 }}>
            <Text>enterprise</Text>
          </View>
          <View fillColor="gray-1" padding="xsmall small" style={{ borderRadius: 4 }}>
            <Text>front-end</Text>
          </View>
          <View fillColor="gray-1" padding="xsmall" align="center" className={styles.hovered} style={{ borderRadius: 4 }}>
            <Icon size="xs" icon="plus" />
          </View>
        </Stack>
      </View>
      <Assignees />
    </Stack>
  );
};

export default Details;
