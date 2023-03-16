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
      </View>
      <Modal isOpen={isAssigneesModalOpen} title="Assignees" />
    </>
  );
};

export default Assignees;
