import { useState } from 'react';
import { View, Text, Icon, Button, Input, Spacer, Divider, Stack } from 'core';

import Modal from '../../../../../shared/components/modal';
import Field from '../../../../../shared/components/field';
import Person from '../../../../../shared/components/person';

import styles from '../../../../../App.module.scss';

interface PersonProps {
  name: string;
  tags: string;
}

const Assignees = () => {
  const [isAssigneesModalOpen, setIsAssigneesModalOpen] = useState<boolean>(false);

  return (
    <>
      <View>
        <View hoverable="a">
          <Text light caps fontSize="small">Assignees</Text>
          <Spacer size="small" />
          <View horizontal style={{ gap: 8, flexWrap: 'wrap' }}>
            <Person name="Philip Hirsch" tags="eng, c#, service, aws" />
            <Person name="Lawrence Hughes" tags="eng, javascript, ui, react" />
            <View hovered="a" fillColor="gray-1" align="center" style={{ width: 40, borderRadius: 1000, cursor: 'pointer' }}>
              <Icon icon="plus" />
            </View>
          </View>
        </View>
        <Spacer size="large" />
        <Divider />
        <Spacer size="large" />
        <View horizontal>
          <Icon icon="layer-group" color="violet-2" />
          <Spacer size="xsmall" />
          <Text light caps fontSize="small">GEM-123 — Epic Story</Text>
        </View>
        <Spacer size="small" />
        <Text fontSize="medium">Chubb Rate Quote Response Mapping</Text>
        <Spacer size="large" />
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
        <Spacer size="large" />
        <Text light caps fontSize="small">LINKS</Text>
        <Spacer size="small" />
        <Text textColor="blue-5">Zeplin Project Styleguide</Text>
        <Spacer size="large" />
        <Field
          label="Description"
          initialValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        />
      </View>
      <Modal isOpen={isAssigneesModalOpen} title="Assignees" />
    </>
  );
};

export default Assignees;
