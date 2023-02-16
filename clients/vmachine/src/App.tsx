import React, { useEffect, useRef, useState } from 'react';

import logo from './logo.svg';
import './App.css';

import Machine, { type Program, Register, Address, SysCall, add, sub, cmp, sys, mov, lod, sto, jmp, jeq, jlt, ascii } from './vmachine';

import { View, Text, Button, Spacer, Divider } from 'core';

const instructions: Program = [
  'hello',
  ascii('Hello, world.'),

  'goodbye',
  ascii('Goodbye.'),

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

function handlePCChanged(address: number) {

}

function handleMemoryChange(address: number, value: number) {
  const memoryElement = document.querySelector('#memory') as HTMLElement;
  const child = memoryElement?.children[address] as HTMLElement;

  if (child) {
    child.textContent = value.toString().padStart(3, '0');

    child.addEventListener('animationend', () => {
      child.style.animation = '';
    });

    child.style.animation = '0.5s flash';
  }
}

const [opcodes, labels] = Machine.transform(instructions);

const machine = new Machine(opcodes, handleMemoryChange);

const animate = (context: CanvasRenderingContext2D, memory: Uint8Array) => {
  const tick = () => {
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

  return setInterval(tick, 1000 / 5);
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

  const context = canvasRef.current?.getContext('2d');

  if (context) {
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
  }

  return (
    <View padding="medium" className="App" style={{ margin: 0, fontFamily: 'monospace', fontSize: 14 }}>
      <View style={{ margin: 0, fontFamily: 'monospace', whiteSpace: 'pre' }}>
        REGISTERS        FLAGS  PC{'\n'}
        {Array.from(machine.registers).map((byte, index) => (
          <React.Fragment>{byte.toString().padStart(3, '0')} </React.Fragment>
        ))}
        {' '}
        {Array.from(machine.flags).map((byte, index) => (
          <React.Fragment>{byte.toString().padStart(3, '0')} </React.Fragment>
        ))}
        {'   '}
        {Array.from([machine.pc]).map((byte, index) => (
          <React.Fragment>{byte.toString().padStart(3, '0')} </React.Fragment>
        ))}
      </View>
      <Spacer size="medium" />
      <View>
        <Text>MEMORY</Text>
        <Spacer size="small" />
        <View as="ul" id="memory" style={{ display: 'grid', gridTemplateColumns: 'repeat(16, 1fr)', gap: 10, width: 'min-content', margin: 0, padding: 0, listStyle: 'none' }}>
          {Array.from(machine.memory).map((byte, index) => (
            <li key={Math.random()} style={{ margin: 0, padding: 0 }}>
              {byte.toString().padStart(3, '0')}
            </li>
          ))}
        </View>
      </View>
      <Spacer size="medium" />
      <View horizontal>
        <View fillColor="gray-5" style={{ padding: '30px 30px 30px 30px', borderRadius: 20, boxShadow: '0 0 0 2px #adb5bd, inset 0 0 15px #FFFFFFC0' }}>
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
