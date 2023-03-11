import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useHotkeys } from 'react-hotkeys-hook';
import { groupWith } from 'rambda';

import { View, Text, Icon, Button, Spacer, Divider, Stack } from 'core';

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

function Story({ id, title, estimateId, statusId, typeId, blockedById, dueDate, questionsCount, selected, onSelect }: any) {
  return (
    <Stack draggable fillColor={selected ? 'blue-0' : 'white'} onClick={() => onSelect(id)}>
      {/* <View style={{ width: 5 }} fillColor={types[typeId].color as any} /> */}
      <Stack flex horizontal padding="small medium" style={{ flexWrap: 'wrap', columnGap: 24, rowGap: 8 }}>
        <View flex horizontal>
          {/* <Icon size="sm" icon={types[typeId].icon as any} style={{ marginTop: -1 }} color={types[typeId].color as any} /> */}
          <View style={{ width: 12, height: 12, borderRadius: 1000 }} fillColor={statuses[statusId].color as any} />
          <Spacer size="small" />
          <View>
            <Text fontWeight="medium" style={{ minWidth: 300 }}>{title}</Text>
            <Spacer size="small" />
            <Stack horizontal spacing="medium">
              <View horizontal>
                <Icon size="xs" icon={types[typeId].icon as any} style={{ marginTop: -1 }} /* color={types[typeId].color as any} */ color="gray-5" />
                <Spacer size="xsmall" />
                <Text light fontSize="small">GEM-42</Text>
              </View>
              {dueDate && (
                <View padding="xsmall small" fillColor="yellow-1" style={{ padding: '2px 4px', margin: '-2px 0', borderRadius: 2 }}>
                  <Text fontSize="small">Due {dueDate}</Text>
                </View>
              )}
              {questionsCount && (
                <View padding="xsmall small" fillColor="yellow-1" style={{ padding: '2px 4px', margin: '-2px 0', borderRadius: 2 }}>
                  <Text fontSize="small">{questionsCount} Questions</Text>
                </View>
              )}
              <View padding="xsmall small" fillColor="gray-1" style={{ padding: '2px 4px', margin: '-2px 0', borderRadius: 2 }}>
                <Text light fontSize="small">front-end</Text>
              </View>
            </Stack>
          </View>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
          <Text fontSize="small" fontWeight="semi-bold" style={{ width: 50 }}>{estimateId === 0 ? <>&nbsp;</> : estimateId}&nbsp;Points</Text>
          {/* <Spacer size="xsmall" />
          <Text fontSize="small" fontWeight="medium" textColor={statuses[statusId].color as any}>{statuses[statusId].title}</Text> */}
        </View>
        <View horizontal align="top left">
          <View fillColor="gray-2" align="center" style={{ width: 30, height: 30, marginLeft: -5, borderRadius: 1000, boxShadow: '0 0 0 1px white' }}>
            <Text fontSize="small" fontWeight="semi-bold">AJ</Text>
          </View>
          <View fillColor="gray-2" align="center" style={{ width: 30, height: 30, marginLeft: -5, borderRadius: 1000, boxShadow: '0 0 0 1px white' }}>
            <Text fontSize="small" fontWeight="semi-bold">MR</Text>
          </View>
          <View fillColor="gray-2" align="center" style={{ width: 30, height: 30, marginLeft: -5, borderRadius: '50%', boxShadow: '0 0 0 1px white' }}>
            <Icon icon="ellipsis" />
          </View>
        </View>
      </Stack>
      {blockedById !== undefined && (
        <View horizontal>
          <View padding="xsmall small" fillColor="yellow-1" style={{ margin: '0 16px 6px 42px', borderRadius: 4 }}>
            <Text fontSize="small">Dependent on a story DevOps-1234 in the “DevOps” project</Text>
          </View>
        </View>
      )}
    </Stack>
  );
}

export default Story;
