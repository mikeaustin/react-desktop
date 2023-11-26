import React, { useEffect, useRef } from 'react';

import './App.css';

import Machine, { type Program, Register, Address, SysCall } from './vmachine';
import { add, sub, cmp, sys, mov, lod, sto, jmp, jeq, jlt, asc } from './vmachine';

import { View, Text, Button, Spacer } from 'core';

const instructions: Program = [
  'hello',
  asc('Hello, world.'),


  'goodbye',
  asc('Goodbye.'),

  'start',
  mov(Register.A, 'hello'),
  mov(Register.B, 13),
  sys(SysCall.write),
  sys(SysCall.exit),

  'add',
  mov(Register.A, 2),
  mov(Register.B, 3),
  add(Register.A, Register.B),

  mov(Register.B, 48),
  add(Register.A, Register.B),

  sto(new Address(0), Register.A),
  mov(Register.A, 0),
  mov(Register.B, 1),
  sys(SysCall.write),
  sys(SysCall.exit),

  'compare',
  mov(Register.A, 5),
  mov(Register.B, 5),
  cmp(Register.A, Register.B),
  jeq('end'),
  sys(SysCall.exit),

  'end',
  mov(Register.A, 'goodbye'),
  mov(Register.B, 8),
  sys(SysCall.write),
  sys(SysCall.exit),

  'start2',
  mov(Register.A, 3),
  mov(Register.B, 1),
  'loop',
  sub(Register.A, Register.B),
  jlt('loop'),
  sys(SysCall.exit),

  'display',
  mov(Register.A, 0b11101110),
  sto(new Address(224), Register.A),
  mov(Register.A, 0b11101110),
  sto(new Address(225), Register.A),
  mov(Register.A, 0b10000000),
  sto(new Address(239), Register.A),
  mov(Register.A, 0b00000010),
  sto(new Address(238), Register.A),
  mov(Register.A, 0b00111110),
  sto(new Address(252), Register.A),
  sys(SysCall.exit),

  'animate',
  mov(Register.A, 0),
  'loop2',
  add(Register.A, Register.B),
  sto(new Address(230), Register.A),
  jmp('loop2'),
  sys(SysCall.exit),
];

let previousChild: HTMLElement | null = null;

function handleCounterChanged(address: number) {
  const memoryElement = document.querySelector('#memory') as HTMLElement;
  const child = memoryElement?.children[address] as HTMLElement;

  if (previousChild) {
    previousChild.style.background = '';
  }

  if (child) {
    child.style.background = 'orange';

    void child.offsetWidth;

    previousChild = child;
  }
}

function handleMemoryChange(address: number, value: number) {
  const memoryElement = document.querySelector('#memory') as HTMLElement;
  const child = memoryElement?.children[address] as HTMLElement;

  if (child) {
    child.style.animation = '';

    child.textContent = value.toString().padStart(3, '0');

    void child.offsetWidth;

    child.style.animation = '0.5s flash';
  }
}

const [opcodes, labels] = Machine.transform(instructions);

const machine = new Machine(opcodes, {
  onMemoryChange: handleMemoryChange,
  onCounterChange: handleCounterChanged
});

const animate = (context: CanvasRenderingContext2D, memory: Uint8Array) => {
  const tick = () => {
    if (!(machine.flags & 0b00000100)) {
      // return;
    }

    context.clearRect(0, 0, 309, 309);

    machine.memory.slice(224, 254).forEach((data, index) => {
      for (let bit = 7; bit >= 0; --bit) {
        context.fillStyle = data & (1 << bit) ? '#00000080' : '#00000000';

        context.fillRect(
          ((7 - bit) + (index * 8)) % 16 * 20 + 10,
          Math.floor(index / 2) * 20 + 10,
          19,
          19
        );
      }
    });
  };

  return setInterval(tick, 1000 / 10);
};

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timerRef = useRef<NodeJS.Timer>();

  const handleStopClick = () => {
    clearInterval(machine.timeout);
    clearInterval(timerRef.current);
  };

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');

    if (context) {
      timerRef.current = animate(context, machine.memory);
    }

    (async () => {
      await machine.start(labels.start);
      await machine.start(labels.add);
      await machine.start(labels.compare);
      await machine.start(labels.start2);
      await machine.start(labels.display);
      await machine.start(labels.animate);
    })();

    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  return (
    <View padding="medium" className="App" style={{ margin: 0, fontFamily: 'monospace', fontSize: 12 }}>
      <View style={{ margin: 0, fontFamily: 'monospace', whiteSpace: 'pre' }}>
        REGISTERS        FLAGS  PC{'\n'}
        {Array.from(machine.registers).map((byte, index) => (
          <React.Fragment key={index}>{byte.toString().padStart(3, '0')} </React.Fragment>
        ))}
        {' '}
        {Array.from([machine.flags]).map((byte, index) => (
          <React.Fragment key={index}>{byte.toString().padStart(3, '0')} </React.Fragment>
        ))}
        {'   '}
        {Array.from([machine.pc]).map((byte, index) => (
          <React.Fragment key={index}>{byte.toString().padStart(3, '0')} </React.Fragment>
        ))}
      </View>
      <Spacer size="medium" />
      <View>
        <Text>MEMORY</Text>
        <Spacer size="small" />
        <View as="ul" id="memory" style={{ display: 'grid', gridTemplateColumns: 'repeat(16, 1fr)', gap: 5, width: 'min-content', margin: 0, padding: 0, listStyle: 'none' }}>
          {Array.from(machine.memory).map((byte, index) => (
            <li key={index} style={{ margin: 0, padding: 0 }}>
              {byte.toString().padStart(3, '0')}
            </li>
          ))}
        </View>
      </View>
      <Spacer size="medium" />
      <View horizontal>
        <View fillColor="gray-5" style={{ padding: '30px 30px 30px 30px', borderRadius: 20, boxShadow: '0 0 0 2px #adb5bd, inset 0 0 25px #FFFFFFC0' }}>
          <View className="lcd">
            <canvas ref={canvasRef} width={319} height={319} style={{ width: 319, height: 319, background: '#98A200' }} />
          </View>
        </View>
      </View>
      <Spacer size="medium" />
      <View horizontal>
        <Button solid title="Stop" onClick={handleStopClick} />
      </View>
    </View>
  );
}

export default App;
