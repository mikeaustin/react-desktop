import { View, Text, Icon, Button, Input, Spacer, Divider, Stack } from 'core';

import Modal from '../../../../../shared/components/modal';
import Field from '../../../../../shared/components/field';

import styles from '../../../../../App.module.scss';
import { useState } from 'react';

const Assignees = () => {
  const [isAssigneesModalOpen, setIsAssigneesModalOpen] = useState<boolean>(false);

  return (
    <>
      <View>
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

          <View horizontal style={{ gap: 8, flexWrap: 'wrap' }}>
            <View horizontal fillColor="gray-1" padding="xsmall" align="left" style={{ borderRadius: 1000 }}>
              <View fillColor="white" align="center" style={{ width: 32, height: 32, borderRadius: 1000 }}>
                <Text fontSize="small" fontWeight="semi-bold">PH</Text>
              </View>
              <View padding="none small" >
                <Text>Philip Hirsch</Text>
                <Spacer size="xsmall" />
                <Text light fontSize="small">c#, microservice, aws</Text>
              </View>
            </View>
            <View horizontal fillColor="gray-1" padding="xsmall" align="left" style={{ borderRadius: 1000 }}>
              <View fillColor="white" align="center" style={{ width: 32, height: 32, borderRadius: 1000 }}>
                <Text fontSize="small" fontWeight="semi-bold">LH</Text>
              </View>
              <View padding="none small">
                <Text>Lawrence Hughes</Text>
                <Spacer size="xsmall" />
                <Text light fontSize="small">javascript, ui, react</Text>
              </View>
            </View>
          </View>
        </View>

        <Spacer size="large" />

        <Divider />
        <Spacer size="large" />
        <Text light caps fontSize="small">Epic</Text>
        <Spacer size="small" />
        <Text fontSize="medium">Chubb Rate Quote Response Mapping</Text>
        <Spacer size="small" />

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
          <View horizontal style={{ gap: 8, flexWrap: 'wrap' }}>
            <View horizontal fillColor="gray-1" padding="xsmall" align="left" style={{ borderRadius: 1000 }}>
              <View fillColor="white" align="center" style={{ width: 32, height: 32, borderRadius: 1000 }}>
                <Text fontSize="small" fontWeight="semi-bold">PJ</Text>
              </View>
              <View padding="none small" >
                <Text>Patricia N. Jackson</Text>
                <Spacer size="xsmall" />
                <Text light fontSize="small">figma, ux, zeplin</Text>
              </View>
            </View>
            <View horizontal fillColor="gray-1" padding="xsmall" align="left" style={{ borderRadius: 1000 }}>
              <View fillColor="white" align="center" style={{ width: 32, height: 32, borderRadius: 1000 }}>
                <Text fontSize="small" fontWeight="semi-bold">EO</Text>
              </View>
              <View padding="none small">
                <Text>Elizabeth Ohara</Text>
                <Spacer size="xsmall" />
                <Text light fontSize="small">product</Text>
              </View>
            </View>
          </View>
        </View>

      </View>
      <Modal isOpen={isAssigneesModalOpen} title="Assignees" />
    </>
  );
};

export default Assignees;
