import { View, Text, Icon, Button, Input, Spacer, Divider, Stack } from 'core';

import Modal from '../../../../../shared/components/modal';
import Field from '../../../../../shared/components/field';

import styles from '../../../../../App.module.scss';
import { useState } from 'react';

interface PersonProps {
  name: string;
  tags: string;
}

const Person = ({ name, tags }: PersonProps) => {
  return (
    <View horizontal fillColor="gray-1" padding="xsmall" align="left" style={{ borderRadius: 1000 }}>
      <View fillColor="white" align="center" style={{ width: 32, height: 32, borderRadius: 1000 }}>
        <Text fontSize="small" fontWeight="semi-bold">{name.split(' ').map(n => n[0]).join('')}</Text>
      </View>
      <View padding="none small" >
        <Text>{name}</Text>
        <Spacer size="xsmall" />
        <Text light fontSize="small">{tags}</Text>
      </View>
    </View>
  );
};

const Assignees = () => {
  const [isAssigneesModalOpen, setIsAssigneesModalOpen] = useState<boolean>(false);

  return (
    <>
      <View>
        <View className={styles.hoverable}>
          <Text light caps fontSize="small">Assignees</Text>
          <Spacer size="small" />
          <View horizontal style={{ gap: 8, flexWrap: 'wrap' }}>
            <Person name="Philip Hirsch" tags="eng, c#, microservices, aws" />
            <Person name="Lawrence Hughes" tags="eng, javascript, ui, react" />
            <View fillColor="gray-1" align="center" style={{ width: 40, borderRadius: 1000 }}>
              <Icon icon="plus" />
            </View>
          </View>
        </View>
        <Spacer size="large" />
        <Divider />
        <Spacer size="large" />
        <Text light caps fontSize="small">Epic</Text>
        <Spacer size="small" />
        <Text fontSize="medium">Chubb Rate Quote Response Mapping</Text>
        <Spacer size="large" />
        <View className={styles.hoverable}>
          <Text light caps fontSize="small">Assignees</Text>
          <Spacer size="small" />
          <View horizontal style={{ gap: 8, flexWrap: 'wrap' }}>
            <Person name="Patricia Jackson" tags="ux, figma, zeplin" />
            <Person name="Elizabeth Ohara" tags="product" />
            <Person name="Mark Seaton" tags="quality, selenium" />
          </View>
        </View>
      </View>
      <Modal isOpen={isAssigneesModalOpen} title="Assignees" />
    </>
  );
};

export default Assignees;
