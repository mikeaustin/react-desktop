import { View, Text, Icon, Button, Input, Spacer, Divider, Stack } from 'core';

import Modal from '../../../../../shared/components/modal';
import Field from '../../../../../shared/components/field';

import styles from '../../../../../App.module.scss';
import { useState } from 'react';

const Assignees = () => {
  const [isAssigneesModalOpen, setIsAssigneesModalOpen] = useState<boolean>(false);

  return (
    <>
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
            <View>
              <Text light caps fontSize="small">Story Responsibilities</Text>
              <Spacer size="small" />
              <Field flex placeholder="Responsibilities..." />
            </View>
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
            <View>
              <Text light caps fontSize="small">Story Responsibilities</Text>
              <Spacer size="small" />
              <Field flex initialValue="Front-end integration" placeholder="Responsibilities..." />
            </View>
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
            <View>
              <Text light caps fontSize="small">Epic Responsibilities</Text>
              <Spacer size="small" />
              <Field flex initialValue="Design lead" placeholder="Responsibilities..." />
            </View>
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
            <View>
              <Text light caps fontSize="small">Epic Responsibilities</Text>
              <Spacer size="small" />
              <Field flex initialValue="Stakeholder" placeholder="Responsibilities..." />
            </View>
          </Stack>
        </Stack>
        <Divider />
      </View>
      <Modal isOpen={isAssigneesModalOpen} title="Assignees" />
    </>
  );
};

export default Assignees;
