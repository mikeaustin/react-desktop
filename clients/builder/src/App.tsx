import React, { useContext, useState } from 'react';
import { insert, move } from 'ramda';

import { View, Text as OriginalText, Button, Stack, Spacer, Divider, Input } from 'core';

import Layout from './components/Layout';
import Component from './components/Component';
import Placeholder from './components/Placeholder';
import Repeater from './components/Repeater';

import AppContext from './AppContext';
import LayoutContext from './LayoutContext';

import test from './utils/test.js';

import './App.css';

function Text({
  children,
  ...props
}: React.ComponentProps<typeof OriginalText>) {
  const env = useContext(LayoutContext);

  const childrenElement = typeof children === 'string'
    ? children.replace(/\{(\w*(\.\w*)?)\}/g, (_, p) => {
      const [a, b] = p.split('.');

      return b ? env[a][b] : env[a];
    })
    : children;

  return (
    <OriginalText {...props}>{childrenElement}</OriginalText>
  );
}

//

const components: { [type: string]: React.ComponentType<any>; } = {
  View,
  Text: ({ children, ...props }) => <Text {...props} children={React.Children.count(children) > 0 ? children : 'Text'} />,
  Button: ({ title, ...props }) => <Button {...props} title={title ?? 'Button'} />,
  Stack,
  Repeater,
  Input,
  Divider: ({ ...props }) => <Divider {...props} spacing="medium" />,
};

//

const template = {
  type: 'Stack', props: { spacing: 'small' }, children: [
    { type: 'Text', props: { fontWeight: 'bold', textColor: 'blue-5' }, children: 'Hello, world. {name}: {age}' },
    {
      type: 'Repeater', props: { for: 'item', in: 'contacts' }, children: [
        { type: 'Text', props: { fontWeight: 'bold', textColor: 'blue-5' }, children: 'id: {item.id}' },
      ]
    },
  ]
};

const bindings = {
  contacts: [{ id: 1 }, { id: 2 }, { id: 3 }],
  name: 'Joe',
  age: 30,
};

function App() {
  const [elements, setElements] = useState<{ type: string, element: JSX.Element; }[]>([]);

  const appContextValue = {
    onDrop: (data: any, index: number) => {
      if (data.index !== undefined) {
        setElements(elements => move(data.index, index - (Number(data.index < index)), elements));
      } else {
        setElements(elements => insert(
          index,
          {
            type: data.type,
            element: (
              <Component type={data.type} props={data.props}>
                {React.createElement(components[data.type], data.props, [])}
              </Component>
            )
          },
          elements),
        );
      }
    }
  };

  return (
    <AppContext.Provider value={appContextValue}>
      <View fillColor="white" className="App">
        <View flex>
          <Stack horizontal padding="small" spacing="small" fillColor="gray-1" style={{ justifyContent: 'center' }}>
            <Component label="Default\nButton" type="Button" />
            <Component label="Default Solid\nButton" type="Button" props={{ solid: true }} />
            <Component label="Primary\nButton" type="Button" props={{ primary: true }} />
            <Component label="Primary Solid\nButton" type="Button" props={{ primary: true, solid: true }} />
            <Component label="Text" type="Text" props={{ style: { textAlign: 'center' } }} />
            <Component label="Input" type="Input" />
            <Component label="Divider" type="Divider" />
          </Stack>
          <Divider color="gray-4" />
          <Stack flex horizontal>
            <Stack padding="small" fillColor="gray-1" style={{ width: 250 }}>
              {elements.map(({ type }) => (
                <View padding="xsmall none">
                  <Text>{type}</Text>
                </View>
              ))}
            </Stack>
            <Divider color="gray-4" />
            <View flex padding="medium" fillColor="gray-3">
              <Stack padding="medium" fillColor="white" style={{ width: 250, borderRadius: 4 }}>
                <Placeholder index={0} />
                {elements.map(({ element }, index) => (
                  [React.cloneElement(element, { index }), <Placeholder index={index + 1} />]
                ))}
              </Stack>
            </View>
          </Stack>
        </View>
        <Spacer size="medium" />
        <Layout components={components} template={template} bindings={bindings} />
      </View>
    </AppContext.Provider>
  );
}

export default App;
