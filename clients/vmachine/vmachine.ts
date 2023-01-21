
class Register {
  static A = new Register(0);
  static B = new Register(1);

  constructor(public index: number) { }
}

class Address {
  constructor(public index: number) { }
}

abstract class Instruction {
  abstract execute(registers: number[], memory: number[]);
}

class Mov extends Instruction {
  constructor(
    public dstReg1: Register,
    public srcMem1: Address,
  ) {
    super();
  }

  execute(registers: number[], memory: number[]) {
    registers[this.dstReg1.index] = memory[this.srcMem1.index];
  }
}

class Add extends Instruction {
  constructor(
    public srcReg1: Register,
    public srcReg2: Register,
  ) {
    super();
  }

  execute(registers: number[], memory: number[]) {
    return registers[this.srcReg1.index] + registers[this.srcReg2.index];
  }
}

const instructions = [
  new Mov(Register.A, new Address(0)),
  new Add(Register.A, Register.B),
];


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

// lod, sto
function mov(dst: Register, src: Address);
function mov(dst: Address, src: Register);
function mov(dst: Register, src: number);

function mov(dst: unknown, src: Address | number) {
  if (dst instanceof Register && src instanceof Address) {
    return [Opcode.mov << 4 | dst.index, src.index];
  } else if (dst instanceof Address && src instanceof Register) {
    return [Opcode.mova << 4 | dst.index, src.index];
  } else if (dst instanceof Register && typeof src === 'number') {
    return [Opcode.movi << 4 | dst.index, src];
  }
}

function add(srcReg1: Register, srcReg2: Register) {
  return [Opcode.add << 4 | srcReg1.index << 2 | srcReg2.index];
}

function sys(sysCall: number) {
  return [Opcode.sys << 4 | sysCall];
}

function hlt() {
  return [Opcode.hlt << 4];
}

function string(string: string) {
  return string.split('').map(char => char.charCodeAt(0));
}

const instructions2 = [
  mov(Register.A, new Address(11)),
  mov(Register.B, 13),
  sys(SysCall.write),
  mov(Register.A, 2),
  mov(Register.B, 3),
  add(Register.A, Register.B),
  hlt(),
  string('Hello, world.'),
];

type Program = number[][];

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

  decode() {
    const opCode = this.memory[this.pc.index] >> 4;

    switch (opCode) {
      case Opcode.mov: {
        const dstReg = this.memory[this.pc.index] & 0xF;
        const srcMem = this.memory[this.pc.index + 1];

        this.registers[dstReg] = srcMem;

        console.log(Opcode[opCode], '\tdstReg1', dstReg, '\tsrcMem1', srcMem, '\t\t\t', this.pc, '\t', this.registers);

        return this.pc.index += 2;
      }
      case Opcode.movi: {
        const dstReg = this.memory[this.pc.index] & 0xF;
        const srcVal = this.memory[this.pc.index + 1];

        this.registers[dstReg] = srcVal;

        console.log(Opcode[opCode], '\tdstReg1', dstReg, '\tsrcVal1', srcVal, '\t\t\t', this.pc, '\t', this.registers);

        return this.pc.index += 2;
      }
      case Opcode.add: {
        const dstReg = this.memory[this.pc.index] >> 2 & 0x3;
        const srcReg = this.memory[this.pc.index] & 0x3;

        this.registers[dstReg] += this.registers[srcReg];

        console.log(Opcode[opCode], '\tdstReg1', dstReg, '\tsrcReg2', srcReg, '\t\t\t', this.pc, '\t', this.registers);

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

          console.log(Opcode[opCode], '\top', SysCall[op], '\taddrres', address, '\tlength', length, '\t', this.pc, '\t', this.registers);

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

    let jump = this.decode();

    while (jump > 0) {
      jump = this.decode();
    }
  }
}

const machine = new Machine(instructions2);

machine.start();
