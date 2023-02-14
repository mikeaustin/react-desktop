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
  mov(Register.A, 0b11111111),
  sto(new Address(253), Register.A),
  mov(Register.A, 0b11110000),
  sto(new Address(254), Register.A),
  mov(Register.A, 0b10101010),
  sto(new Address(255), Register.A),
  sys(SysCall.exit),
];

const [opcodes, labels] = Machine.transform(instructions);

const machine = new Machine(opcodes);

function App() {
  const [isInitialized, setIsInitialized] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    (async () => {
      await machine.start(labels.start);
      await machine.start(labels.add);
      await machine.start(labels.compare);
      await machine.start(labels.start2);
      await machine.start(labels.display);

      setIsInitialized(true);
    })();
  }, []);

  let pixels: number[] = [];

  console.log(machine.memory[255].toString(2));

  Array.from(machine.memory.slice(256 - 2, 256)).forEach(data => {
    for (let bit = 7; bit >= 0; --bit) {
      pixels.push(data & (0x01 << bit));
    }
  });

  const context = canvasRef.current?.getContext('2d');

  if (context) {
    context.fillStyle = '#00000060';
  }

  machine.memory.slice(254, 256).forEach((data, index) => {
    for (let bit = 7; bit >= 0; --bit) {
      data & (0x01 << bit) && context?.fillRect((7 - bit) * 20 + (index * 8 * 20), 0, 19, 19);
    }
  });

  console.log(pixels);

  return (
    <View className="App">
      <View as="ul" style={{ display: 'grid', gap: 5, width: 'min-content', gridTemplateColumns: 'repeat(16, 1fr)', margin: 0, padding: 0 }}>
        {Array.from(machine.registers).map((byte, index) => (
          <View as="li" key={index} style={{ margin: 0, fontFamily: 'monospace' }}>{byte.toString().padStart(3, '0')}</View>
        ))}
      </View>
      <Spacer size="small" />
      <View as="ul" style={{ display: 'grid', gap: 5, width: 'min-content', gridTemplateColumns: 'repeat(16, 1fr)', margin: 0, padding: 0 }}>
        {Array.from(machine.flags).map((byte, index) => (
          <View as="li" key={index} style={{ margin: 0, fontFamily: 'monospace' }}>{byte.toString().padStart(3, '0')}</View>
        ))}
      </View>
      <Spacer size="small" />
      <View as="ul" style={{ display: 'grid', gap: 5, width: 'min-content', gridTemplateColumns: 'repeat(16, 1fr)', margin: 0, padding: 0 }}>
        {Array.from(machine.memory).map((byte, index) => (
          <View as="li" key={index} style={{ margin: 0, fontFamily: 'monospace' }}>{byte.toString().padStart(3, '0')}</View>
        ))}
      </View>
      <Spacer size="small" />
      <svg style={{ background: '#d8f5a2', height: 150 }}>
        {pixels.map((pixel, index) => (
          <rect x={index * 20} y={0} width="19" height="19" fill={pixel === 0 ? '#00000000' : '#000000A0'} />
        ))}
      </svg>
      <Spacer size="small" />
      <canvas ref={canvasRef} width={300} height={300} style={{ width: 300, height: 300, background: '#d8f5a2' }} />
    </View>
  );
}

export default App;
