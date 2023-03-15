import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useHotkeys } from 'react-hotkeys-hook';
import { groupWith } from 'rambda';

import { View, Text, Icon, Button, Spacer, Divider, Stack } from 'core';

const types = [
  { title: 'Story', icon: 'square-check', color: 'blue-3' },
  { title: 'Task', icon: 'gear', color: 'green-3' },
  { title: 'Bug', icon: 'bug', color: 'red-3' },
];

const statuses = [
  { title: 'Draft', color: 'gray-4' },
  { title: 'Is Ready', color: 'violet-2' },
  { title: 'In Progress', color: 'blue-2' },
  { title: 'In Review', color: 'teal-2' },
  { title: 'Done', color: 'lime-3' },
  { title: 'Blocked', color: 'orange-3' },
];

const Tag = ({ label, color = 'gray-1', ...props }: any) => {
  return (
    <View padding="xsmall small" fillColor={color} style={{ padding: '2px 4px', margin: '-2px 0', borderRadius: 2 }} {...props}>
      <Text fontSize="small">{label}</Text>
    </View>
  );
};

function Story({ id, title, estimateId, statusId, typeId, blockedById, dueDate, questionsCount, selected, flagged, onSelect }: any) {
  return (
    <Stack draggable fillColor={selected ? 'blue-0' : 'white'} style={{ position: 'relative', cursor: 'move', transform: 'translate(0, 0)', borderRadius: 4 }} onClick={() => onSelect(id)}>
      {/* <View style={{ width: 5 }} fillColor={types[typeId].color as any} /> */}
      {flagged && (
        <View style={{ position: 'absolute', borderTop: '16px solid #ff8787', borderRight: '16px solid transparent' }} />
      )}
      <Stack flex horizontal padding="small medium" style={{ flexWrap: 'wrap', columnGap: 24, rowGap: 12 }}>
        <View flex horizontal>
          {/* <Icon size="sm" icon={types[typeId].icon as any} style={{ marginTop: -1 }} color={types[typeId].color as any} /> */}
          {/* <View style={{ width: 12, height: 12, borderRadius: 1000 }} fillColor={statuses[statusId].color as any} />
          <Spacer size="small" /> */}
          <View>
            <Text fontWeight="medium" style={{ minWidth: 300 }}>{title}</Text>
            <Spacer size="small" />
            <Stack horizontal spacing="medium">
              <View horizontal>
                <Icon size="xs" icon={types[typeId].icon as any} style={{ marginTop: -1 }} color={types[typeId].color as any} />
                <Spacer size="xsmall" />
                <Text light fontSize="small">GEM-42</Text>
              </View>
              {blockedById && (
                <Tag color="blue-0" label="Blocked by OPS-4264" />
              )}
              {dueDate && (
                <Tag color="orange-1" label={`Due ${dueDate}`} />
              )}
              {questionsCount && (
                <Tag color="blue-0" label={`${questionsCount} Questions`} onClick={() => {
                  setTimeout(() => {
                    document.getElementById('comments')?.scrollIntoView({ behavior: 'smooth' });
                  });
                }}
                />
              )}
              <View padding="xsmall small" fillColor="gray-1" style={{ padding: '2px 4px', margin: '-2px 0', borderRadius: 2 }}>
                <Text light fontSize="small">front-end</Text>
              </View>
            </Stack>
          </View>
        </View>
        <View horizontal style={{ alignItems: 'center' }}>
          <View align="center" style={{ width: 35 }}>
            {estimateId !== 0 && (
              <>
                <Text fontWeight="medium">{estimateId}</Text>
                <Spacer size="xsmall" />
                <Text light fontSize="small" fontWeight="normal">{`point${estimateId > 1 ? 's' : ''}`}</Text>
              </>
            )}
          </View>
          <Spacer size="medium" />
          <View style={{ width: 12, height: 12, borderRadius: 1000 }} fillColor={statuses[statusId].color as any} />
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
    </Stack>
  );
}

export default Story;
