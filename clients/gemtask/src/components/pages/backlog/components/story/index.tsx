import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import OpenColor from 'open-color';
import { useHotkeys } from 'react-hotkeys-hook';
import { groupWith } from 'rambda';

import { View, Text, Icon, Button, Spacer, Divider, Stack } from 'core';

import Tag from '../../../../../shared/components/tag';

const types = [
  { title: 'Story', icon: 'book', color: 'blue-3' },
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

const people = [
  { name: 'Philip Hirsch', tags: ['eng', 'c#', 'service', 'aws'] },
  { name: 'Lawrence Hughes', tags: ['eng', 'js', 'ui', 'react'] },
];

function Story({ id, title, estimateId, statusId, typeId, blockedById, dueDate, questionsCount, selected, flagged, tags, assignees, onSelect }: any) {
  const dueDateObject = new Date(dueDate);
  const twoWeeksFromNow = new Date();

  twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);

  const dueDateApproaching = dueDateObject > twoWeeksFromNow;

  return (
    <Stack draggable fillColor={selected ? 'blue-0' : 'white'} testId="story" style={{ position: 'relative', cursor: 'move', transform: 'translate(0, 0)', borderRadius: 4 }} onClick={() => onSelect(id)}>
      {flagged && (
        <View style={{ position: 'absolute', borderTop: '16px solid #ff8787', borderRight: '16px solid transparent' }} />
      )}
      <Stack flex horizontal padding="small medium" style={{ flexWrap: 'wrap', columnGap: 16, rowGap: 12 }}>
        <View flex horizontal>
          <View flex>
            <Text noEvents fontWeight="medium" testId="story-title" style={{ minWidth: 300 }}>{title}</Text>
            <Spacer size="small" />
            <Stack horizontal style={{ flexWrap: 'wrap', columnGap: 12, rowGap: 12 }}>
              <View horizontal testId="story-id">
                <Icon size="xs" icon={types[typeId].icon as any} style={{ marginTop: -1 }} color={types[typeId].color as any} />
                <Spacer size="xsmall" />
                <Text light fontSize="small" style={{ whiteSpace: 'nowrap' }}>GEM-42</Text>
              </View>
              {(blockedById || dueDate || questionsCount) && (
                <View horizontal style={{ columnGap: 8 }} testId="story-constraints">
                  {blockedById && (
                    <Tag
                      bold={statusId !== 0}
                      color={statusId === 0 ? 'blue-0' : 'yellow-1'}
                      label="Blocked by OPS-4264"
                    />
                  )}
                  {dueDate && (
                    <Tag
                      bold={dueDateApproaching}
                      color={dueDateApproaching ? 'yellow-1' : 'blue-0'}
                      label={`Due ${dueDateObject.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}`}
                    />
                  )}
                  {questionsCount && (
                    <Tag
                      bold={statusId !== 0}
                      color={statusId === 0 ? 'blue-0' : 'yellow-1'}
                      label={`${questionsCount} Questions`}
                      onClick={() => {
                        setTimeout(() => {
                          document.getElementById('comments')?.scrollIntoView({ behavior: 'smooth' });
                        });
                      }}
                    />
                  )}
                </View>
              )}
              {/* <View flex /> */}
              <Stack horizontal style={{ columnGap: 4 }} testId="story-labels">
                {tags && (
                  tags.map((tag: string) => (
                    <View padding="xsmall small" fillColor="gray-1" style={{ padding: '3px 4px', margin: '-3px 0', borderRadius: 2 }}>
                      <Text light fontSize="small" style={{ whiteSpace: 'nowrap' }}>{tag}</Text>
                    </View>
                  ))
                )}
              </Stack>
            </Stack>
          </View>
        </View>
        <View horizontal align="top right" testId="story-assignees">
          {assignees.slice(0, 2).map((assignee: any) => (
            <View fillColor="gray-2" align="center" style={{ width: 30, height: 30, marginLeft: -5, borderRadius: 1000, boxShadow: '0 0 0 1px white' }}>
              <Text fontSize="small" fontWeight="semi-bold">{people[assignee].name.split(' ').map(name => name[0]).join('')}</Text>
            </View>
          ))}
          {assignees.length > 2 && (
            <View fillColor="gray-2" align="center" style={{ width: 30, height: 30, marginLeft: -5, borderRadius: 1000, boxShadow: '0 0 0 1px white' }}>
              <Icon icon="ellipsis" />
            </View>
          )}
        </View>
        <View horizontal style={{ alignItems: 'center', height: 30 }} testId="story-points">
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
          <View style={{ width: 12, height: 12, borderRadius: 1000 }} fillColor={statuses[statusId].color as any} title={statuses[statusId].title} />
        </View>
      </Stack>
    </Stack>
  );
}

export default Story;
