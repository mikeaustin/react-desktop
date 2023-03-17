import React, { useRef, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { groupWith } from 'rambda';
import Joyride from 'react-joyride';

import { View, Text, Icon, Button, Spacer, Divider, Stack } from 'core';

const storySteps = [
  {
    target: '[data-test-id=backlog-panel]', title: 'The Backlog', content: (
      <Text>
        This is a backlog item, which represents work to be done and has a few different fields. Backlog items are sorted by priotiry, with the highest at the top.
      </Text>
    )
  },
  {
    target: '[data-test-id=story]', title: 'Backlog Item', content: (
      <Text>
        This is a backlog item, which represents work to be done and has a few different fields. Backlog items are sorted by priotiry, with the highest at the top.
      </Text>
    )
  },
  {
    target: '[data-test-id=story-title]', title: 'Story Title', content: (
      <Text>
        A short, memorable <Text fontWeight="bold">Title</Text> that is used to communicate the intent to the team. You can add more details in the story <Text fontWeight="bold">Description</Text>.
      </Text>
    )
  },
  { target: '[data-test-id=story-id]', title: 'Story ID and Type', content: 'The backlog item ID and type, such as a Story, a Chore, or a Bug' },
  {
    target: '[data-test-id=story-constraints]', title: 'Story Constraints', content: (
      <Text>
        Constraints such as a <Text fontWeight="bold">Due Date</Text>,{' '}
        <Text fontWeight="bold">Blocking Tickets</Text>,{' '}
        or number of <Text fontWeight="bold">Unanswered Questions</Text>
      </Text>
    )
  },
  { target: '[data-test-id=story-labels]', title: 'Story Labels', content: 'xxx' },
  { target: '[data-test-id=story-points]', title: 'Story Points and Status', content: 'xxx' },
  { target: '[data-test-id=story-assignees]', title: 'Story Assignees', content: 'Assignees, the people involved in this story' },
];

const detailsSteps = [
  {
    target: '[data-test-id=backlog-details]', title: 'Backlog Item Details', content: (
      <Text>
        This is a backlog item, which represents work to be done and has a few different fields. Backlog items are sorted by priotiry, with the highest at the top.
      </Text>
    )
  },
  {
    target: '[data-test-id=story-panel-tags]', title: 'Tags', content: (
      <Text>
        This is a backlog item, which represents work to be done and has a few different fields. Backlog items are sorted by priotiry, with the highest at the top.
      </Text>
    )
  },
  {
    target: '[data-test-id=story-panel-epic]', title: 'Parent Epic', content: (
      <Text>
        This is a backlog item, which represents work to be done and has a few different fields. Backlog items are sorted by priotiry, with the highest at the top.
      </Text>
    )
  },
  {
    target: '[data-test-id=story-panel-description]', title: 'Description', content: (
      <Text>
        This is a backlog item, which represents work to be done and has a few different fields. Backlog items are sorted by priotiry, with the highest at the top.
      </Text>
    )
  },
  {
    target: '[data-test-id=story-panel-acceptance-criteria]', title: 'Acceptance Criteria', content: (
      <Text>
        This is a backlog item, which represents work to be done and has a few different fields. Backlog items are sorted by priotiry, with the highest at the top.
      </Text>
    )
  },
  {
    target: '[data-test-id=story-panel-assignees]', title: 'Assignees', content: (
      <Text>
        This is a backlog item, which represents work to be done and has a few different fields. Backlog items are sorted by priotiry, with the highest at the top.
      </Text>
    )
  },
  {
    target: '[data-test-id=story-panel-blocked-by]', title: 'Blocked By', content: (
      <Text>
        This is a backlog item, which represents work to be done and has a few different fields. Backlog items are sorted by priotiry, with the highest at the top.
      </Text>
    )
  },
  {
    target: '[data-test-id=story-panel-blocks]', title: 'Blocks', content: (
      <Text>
        This is a backlog item, which represents work to be done and has a few different fields. Backlog items are sorted by priotiry, with the highest at the top.
      </Text>
    )
  },
];

export {
  storySteps,
  detailsSteps,
};
