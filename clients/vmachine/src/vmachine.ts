/*
  clear && tsc --lib esnext,dom test.ts && node test.js
*/

class Register {
  static A = new Register(0);
  static B = new Register(1);
  static C = new Register(2);
  static D = new Register(3);

  constructor(public value: number) { }
}

class Address {
  constructor(public value: number) { }
}

enum Opcode {
  mov,
  mova,
  movi,
  add,
  jmp,
  cmp,
  sys,
  hlt,
  nop,
}

enum SysCall {
  write = 1,
  dump = 2,
}

function mov(dst: Register, src: Address): number[];
function mov(dst: Address, src: Register): number[];
function mov(dst: Register, src: number): number[];

function mov(dst: unknown, src: Address | number): number[] {
  if (dst instanceof Register && src instanceof Address) {
    return [(Opcode.mov << 4) | dst.value, src.value];
  } else if (dst instanceof Address && src instanceof Register) {
    return [(Opcode.mova << 4) | dst.value, src.value];
  } else if (dst instanceof Register && typeof src === 'number') {
    return [(Opcode.movi << 4) | dst.value, src];
  }

  return [];
}

function add(dstReg: Register, srcReg: Register) {
  return [(Opcode.add << 4) | (dstReg.value << 2) | srcReg.value];
}

function jmp(srcAddr: Address) {
  return [(Opcode.jmp << 4), srcAddr.value];
}

function cmp(srcReg1: Register, srcReg2: Register) {
  return [(Opcode.cmp << 4) | (srcReg1.value << 2) | srcReg2.value];
}

function sys(op: number) {
  return [(Opcode.sys << 4) | op];
}

function hlt() {
  return [Opcode.hlt << 4];
}

function string(string: string): number[] {
  return string.split('').map(char => char.charCodeAt(0));
}

type Program = number[][];

const instructions2: Program = [
  string('Hello, world.'),

  mov(Register.A, new Address(0)),
  mov(Register.B, 13),
  sys(SysCall.write),

  mov(Register.A, 2),
  mov(Register.B, 3),
  add(Register.A, Register.B),
  mov(new Address(0), Register.A),

  mov(Register.A, 5),
  mov(Register.B, 5),
  cmp(Register.A, Register.B),

  sys(SysCall.dump),

  hlt(),
];

class Machine {
  registers: Uint8Array;
  memory: Uint8Array;
  flags: Uint8Array;
  pc: Address;

  constructor(instructions: Program) {
    this.registers = new Uint8Array(new ArrayBuffer(4));
    this.memory = new Uint8Array(new ArrayBuffer(256));
    this.flags = new Uint8Array(new ArrayBuffer(1));
    this.pc = new Address(0);

    instructions.flat().forEach((byte, index) => {
      this.memory[index] = byte;
    });
  }

  debug(operands: { [key: string]: string | number; }): void {
    const opCode = this.memory[this.pc.value] >> 4;
    const ops = Object.entries(operands).map(([name, value]) => `${name}: ${value}`).join('\t');

    console.log(Opcode[opCode] + '\t' + ops + '\r\t\t\t\t\t\t\t' + this.pc.value + '\t' + this.registers.join(', ') + '\t' + this.flags.join(' '));
  }

  decode() {
    const opCode = this.memory[this.pc.value] >> 4;

    switch (opCode) {
      case Opcode.mov: {
        const dstReg = this.memory[this.pc.value] & 0xF;
        const srcMem = this.memory[this.pc.value + 1];

        this.registers[dstReg] = srcMem;

        this.debug({ dstReg, srcMem });

        return this.pc.value += 2;
      }
      case Opcode.movi: {
        const dstReg = this.memory[this.pc.value] & 0xF;
        const srcValue = this.memory[this.pc.value + 1];

        this.registers[dstReg] = srcValue;

        this.debug({ dstReg, srcValue });

        return this.pc.value += 2;
      }
      case Opcode.mova: {
        const srcReg = this.memory[this.pc.value] & 0xF;
        const dstAddr = this.memory[this.pc.value + 1];

        this.memory[dstAddr] = this.registers[srcReg];

        this.pc.value += 2;

        return 2;
      }
      case Opcode.add: {
        const dstReg = (this.memory[this.pc.value] >> 2) & 0x3;
        const srcReg = this.memory[this.pc.value] & 0x3;

        this.registers[dstReg] += this.registers[srcReg];

        this.flags[0] = this.registers[dstReg] === 0 ? this.flags[0] | 0b01 : this.flags[0] & ~0b01;

        this.debug({ dstReg, srcReg });

        return this.pc.value += 1;
      }
      case Opcode.jmp: {
        const srcAddr = this.memory[this.pc.value + 1];

        this.pc.value = srcAddr;

        return 2;
      }
      case Opcode.cmp: {
        const dstReg = (this.memory[this.pc.value] >> 2) & 0x3;
        const srcReg = (this.memory[this.pc.value] >> 0) & 0x3;

        const value = this.registers[dstReg] - this.registers[srcReg];

        this.flags[0] = value === 0 ? this.flags[0] | 0b01 : this.flags[0] & ~0b01;

        this.debug({ dstReg, srcReg });

        this.pc.value += 1;

        return 1;
      }
      case Opcode.sys: {
        const op = this.memory[this.pc.value] & 0xF;

        if (op === SysCall.write) {
          const address = this.registers[Register.A.value];
          const length = this.registers[Register.B.value];

          const string = this.memory
            .slice(address, address + length)
            .reduce<string[]>((array, charCode) => [...array, String.fromCharCode(charCode)], [])
            .join('');

          this.registers[Register.A.value] = 0;

          this.debug({ op: SysCall[op], address, length });

          console.log(string);
        } else if (op === SysCall.dump) {
          this.debug({ op: SysCall[op] });

          console.log(this.memory);
        } else {
          console.log('Invalid syscall');
        }

        return this.pc.value += 1;
      }
      case Opcode.hlt: {
        return 0;
      }
      default: {
        console.log('Illegal operation');

        return 0;
      }
    }
  }

  start(pc: Address) {
    console.log('OP\tOPERANDS\t\t\t\t\tPC\tREGISTERS\tZ');
    console.log('======= =============== =============== =============== ======= =============== =====');

    this.pc = pc;

    let jump = this.decode();

    while (jump > 0) {
      jump = this.decode();
    }
  }
}

const machine = new Machine(instructions2);

machine.start(new Address(15));

export { };
