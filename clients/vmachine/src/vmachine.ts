/*
  clear && tsc --lib esnext,dom test.ts && node test.js
*/

class Register {
  static A = new Register(0);
  static B = new Register(1);

  constructor(public index: number) { }
}

class Address {
  constructor(public index: number) { }
}

enum Opcode {
  mov,
  mova,
  movi,
  add,
  sys,
  hlt,
  nop,
}

enum SysCall {
  write = 1,
}

function mov(dst: Register, src: Address): number[];
function mov(dst: Address, src: Register): number[];
function mov(dst: Register, src: number): number[];

function mov(dst: unknown, src: Address | number): number[] {
  if (dst instanceof Register && src instanceof Address) {
    return [(Opcode.mov << 4) | dst.index, src.index];
  } else if (dst instanceof Address && src instanceof Register) {
    return [(Opcode.mova << 4) | dst.index, src.index];
  } else if (dst instanceof Register && typeof src === 'number') {
    return [(Opcode.movi << 4) | dst.index, src];
  }

  return [];
}

function add(srcReg1: Register, srcReg2: Register) {
  return [(Opcode.add << 4) | (srcReg1.index << 2) | srcReg2.index];
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
  mov(Register.A, new Address(11)),
  mov(Register.B, 13),
  sys(SysCall.write),
  mov(Register.A, 2),
  mov(Register.B, 3),
  add(Register.A, Register.B),
  hlt(),
  string('Hello, world.'),
];

class Machine {
  registers: Uint8Array;
  memory: Uint8Array;
  pc: Address;

  constructor(instructions: Program) {
    this.registers = new Uint8Array(new ArrayBuffer(4));
    this.memory = new Uint8Array(new ArrayBuffer(256));
    this.pc = new Address(0);

    instructions.flat().forEach((byte, index) => {
      this.memory[index] = byte;
    });
  }

  debug(operands: { [key: string]: string | number; }): void {
    const opCode = this.memory[this.pc.index] >> 4;
    const foo = Object.entries(operands).map(([name, value]) => `${name}: ${value}`).join('\t');

    console.log(Opcode[opCode] + '\t' + foo + '\r\t\t\t\t\t\t\t' + this.pc.index + '\t' + this.registers.join(', '));
  }

  decode() {
    const opCode = this.memory[this.pc.index] >> 4;

    switch (opCode) {
      case Opcode.mov: {
        const dstReg = this.memory[this.pc.index] & 0xF;
        const srcMem = this.memory[this.pc.index + 1];

        this.registers[dstReg] = srcMem;

        this.debug({ dstReg, srcMem });

        return this.pc.index += 2;
      }
      case Opcode.movi: {
        const dstReg = this.memory[this.pc.index] & 0xF;
        const srcVal = this.memory[this.pc.index + 1];

        this.registers[dstReg] = srcVal;

        this.debug({ dstReg, srcVal });

        return this.pc.index += 2;
      }
      case Opcode.add: {
        const dstReg = (this.memory[this.pc.index] >> 2) & 0x3;
        const srcReg = this.memory[this.pc.index] & 0x3;

        this.registers[dstReg] += this.registers[srcReg];

        this.debug({ dstReg, srcReg });

        return this.pc.index += 1;
      }
      case Opcode.sys: {
        const op = this.memory[this.pc.index] & 0xF;

        if (op === SysCall.write) {
          const address = this.registers[Register.A.index];
          const length = this.registers[Register.B.index];

          const string = this.memory
            .slice(address, address + length)
            .reduce<string[]>((array, charCode) => [...array, String.fromCharCode(charCode)], [])
            .join('');

          this.registers[Register.A.index] = 0;

          this.debug({ op: Opcode[op], address, length });

          console.log(string);
        } else {
          console.log('Invalid syscall');
        }

        return this.pc.index += 1;
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

  start() {
    console.log(this.memory);

    console.log('OP\tOPERANDS\t\t\t\t\tPC\tREGISTERS');
    console.log('======= =============== =============== =============== ======= ============');

    let jump = this.decode();

    while (jump > 0) {
      jump = this.decode();
    }
  }
}

const machine = new Machine(instructions2);

machine.start();

export { };
