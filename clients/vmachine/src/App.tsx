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
  mov(Register.A, 0b01000000),
  sto(new Address(239), Register.A),
  mov(Register.A, 0b00111110),
  sto(new Address(252), Register.A),
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

  const context = canvasRef.current?.getContext('2d');

  if (context) {
    context.clearRect(0, 0, 309, 309);

    machine.memory.slice(224, 254).forEach((data, index) => {
      for (let bit = 7; bit >= 0; --bit) {
        context.fillStyle = data & (1 << bit) ? '#00000080' : '#00000000';

        context.fillRect(
          ((7 - bit) + (index * 8)) % 16 * 20 + 5,
          Math.floor(index / 2) * 20 + 5,
          19,
          19
        );
      }
    });
  }

  return (
    <View padding="medium" className="App" style={{ margin: 0, fontFamily: 'monospace', fontSize: 14, whiteSpace: 'pre' }}>
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
      <View id="memory" style={{ margin: 0, fontFamily: 'monospace', whiteSpace: 'pre', lineHeight: 1.5 }}>
        MEMORY{'\n'}
        {Array.from(machine.memory).map((byte, index) => (
          <React.Fragment key={Math.random()}>
            {/* {index > 0 && index % 16 === 0 && '\n'} */}
            {(index > 0 ? (index % 16 === 0 ? '\n' : ' ') : '') + byte.toString().padStart(3, '0')}
          </React.Fragment>
        ))}
      </View>
      <Spacer size="medium" />
      <View className="lcd">
        <canvas ref={canvasRef} width={309} height={309} style={{ width: 309, height: 309, background: '#98A200' }} />
      </View>
    </View>
  );
}

export default App;
