import { View, Text, Icon, Button, Input, Spacer, Divider, Stack } from 'core';

import Modal from '../../../../../shared/components/modal';
import Field from '../../../../../shared/components/field';
import Person from '../../../../../shared/components/person';

import Assignees from '../assignees';

import styles from '../../../../../App.module.scss';

const estimateOptions = [
  { label: '–', value: 0 },
  { label: '1 – A few minutes', value: 1 },
  { label: '2 – A few hours', value: 2 },
  { label: '3 – A few days', value: 3 },
];

const epicOptions = [
  { label: 'Chubb Rate Quote Response Mapping', value: 0 },
  { label: 'Organization and Polish', value: 1 },
];

const tagsOptions = [
  { label: 'payment', value: 0 },
  { label: 'customer', value: 1 },
];

const Details = () => {
  return (
    <View id="details" padding="medium" style={{ flexBasis: '100%', flexShrink: 0, overflowY: 'auto', scrollSnapAlign: 'start' }}>
      <Stack spacing="large">
        <Stack horizontal style={{ columnGap: 24, rowGap: 24, flexWrap: 'wrap' }}>
          <View className={styles.hoverable} testId="story-panel-tags">
            <Text light caps fontSize="small">Tags</Text>
            <Spacer size="small" />
            <Stack horizontal style={{ gap: 4, position: 'relative' }}>
              <View fillColor="gray-1" padding="xsmall small" style={{ borderRadius: 4, margin: '-3px 0' }}>
                <Text>enterprise</Text>
              </View>
              <View fillColor="gray-1" padding="xsmall small" style={{ borderRadius: 4, margin: '-3px 0' }}>
                <Text>front-end</Text>
              </View>
              <View fillColor="gray-1" padding="xsmall" align="center" className={styles.hovered} style={{ position: 'absolute', right: -28, top: -3, height: 20, borderRadius: 4 }}>
                <Icon size="xs" icon="plus" />
              </View>
            </Stack>
          </View>
          <Field label="Parent Epic" options={epicOptions} testId="story-panel-epic" />
        </Stack>
        <Field
          testId="story-panel-description"
          label="Description"
          initialValue="Allstate/IDMS is no longer sending addresses for Agents in the producer.data file. They are researching on their end if the address is used for anything. We want to do the same.\n\n
          Currently, if an agency owner is sent in the producer.data file without an address, or parity process will skip that agent and not add them to MCE"
          placeholder="A short description of who this is for, what it solves, and what is out of scope..."
        />
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
        <Assignees />
        <Stack horizontal style={{ flexWrap: 'wrap', columnGap: 24, rowGap: 24 }}>
          <View>
            <Text light caps fontSize="small">Blocked By</Text>
            <Spacer size="small" />
            <Stack horizontal style={{ flexWrap: 'wrap', columnGap: 8, rowGap: 8 }}>
              <Text>OPS-4264</Text>
              <Text>OPS-4264</Text>
            </Stack>
          </View>
          <View>
            <Text light caps fontSize="small">Blocks</Text>
            <Spacer size="small" />
            <Stack horizontal>
              <Text>GEM-1234</Text>
            </Stack>
          </View>
        </Stack>
      </Stack>
      <Divider spacing="large" />
      <View horizontal align="left">
        <Icon icon="layer-group" size="xs" color="violet-3" style={{ marginTop: -5 }} />
        <Spacer size="xsmall" />
        <Text light caps fontSize="small">GEM-123 — Parent Epic</Text>
      </View>
      <Spacer size="small" />
      <Text fontSize="medium">Chubb Rate Quote Response Mapping</Text>
      <Spacer size="large" />
      <Stack spacing="large">
        <View hoverable="a">
          <Text light caps fontSize="small">Assignees</Text>
          <Spacer size="small" />
          <View horizontal style={{ gap: 8, flexWrap: 'wrap' }}>
            <Person name="Patricia Jackson" tags="ux, figma, zeplin" />
            <Person name="Elizabeth Ohara" tags="product" />
            <Person name="Mark Seaton" tags="quality, selenium" />
            <View hovered="a" fillColor="gray-1" align="center" style={{ width: 40, borderRadius: 1000, cursor: 'pointer' }}>
              <Icon icon="plus" />
            </View>
          </View>
        </View>
        <View>
          <Text light caps fontSize="small">LINKS</Text>
          <Spacer size="small" />
          <Text textColor="blue-5">Zeplin Project Styleguide</Text>
        </View>
        <Field
          label="Description"
          initialValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        />
      </Stack>
    </View>
  );
};

export default Details;
