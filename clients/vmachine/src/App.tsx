import React, { useEffect, useRef } from 'react';

import Machine, { type Program, Register, Address, SysCall } from './vmachine';
import { add, sub, cmp, sys, mov, lod, sto, jmp, jeq, jlt, asc } from './vmachine';

import { View, Text, Button, Spacer } from 'core';

import styles from './App.module.css';

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
  mov(Register.B, 1),
  mov(Register.C, 0),
  mov(Register.D, 27),
  'loop2',
  add(Register.A, Register.B),
  sto(new Address(230), Register.A),
  //
  lod(Register.C, new Address(254)),
  cmp(Register.C, Register.D),
  jeq('stop'),
  //
  jmp('loop2'),
  'stop',
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

    child.style.animation = `0.5s ${styles.flash}`;
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

    const pcElement = document.querySelector('#pc') as HTMLElement;

    pcElement.textContent = machine.pc.toString().padStart(3, '0');

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
  const displayIntervalRef = useRef<NodeJS.Timer>();

  const handleStopClick = () => {
    clearInterval(machine.clockInterval);
    clearInterval(displayIntervalRef.current);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (machine.memory[254] === 0) {
      machine.memory[254] = event.keyCode;

      handleMemoryChange(254, event.keyCode);
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    machine.memory[254] = 0;

    handleMemoryChange(254, 0);
  };

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');

    if (context) {
      clearInterval(machine.clockInterval);
      clearInterval(displayIntervalRef.current);

      displayIntervalRef.current = animate(context, machine.memory);
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
      clearInterval(machine.clockInterval);
      clearInterval(displayIntervalRef.current);
    };
  }, []);

  return (
    <View horizontal className={styles.App}>
      <View padding="medium">
        <View horizontal style={{ gap: 16 }}>
          <View>
            <Text>REGISTERS</Text>
            <Spacer size="xsmall" />
            {Array.from(machine.registers).map((byte, index) => (
              <React.Fragment key={index}>{byte.toString().padStart(3, '0')}</React.Fragment>
            ))}
          </View>
          <View>
            <Text>FLAGS</Text>
            <Spacer size="xsmall" />
            {machine.flags.toString().padStart(3, '0')}
          </View>
          <View>
            <Text>PC</Text>
            <Spacer size="xsmall" />
            <span id="pc">{machine.pc.toString().padStart(3, '0')}</span>
          </View>
          <Spacer flex size="large" />
          <Button solid size="small" title="Stop" onClick={handleStopClick} />
        </View>
        <Spacer size="medium" />
        <View>
          <Text>MEMORY</Text>
          <Spacer size="xsmall" />
          <View as="ul" id="memory" className={styles.memory}>
            {Array.from(machine.memory).map((byte, index) => (
              <li key={index} style={{ margin: 0, padding: 0 }}>
                {byte.toString().padStart(3, '0')}
              </li>
            ))}
          </View>
        </View>
        <Spacer size="medium" />
        <View
          tabIndex={0}
          fillColor="gray-4"
          className={styles.package}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
        >
          <View className={styles.lcd}>
            <canvas ref={canvasRef} className={styles.canvas} width={319} height={319} />
          </View>
        </View>
      </View>
    </View>
  );
}

export default App;
