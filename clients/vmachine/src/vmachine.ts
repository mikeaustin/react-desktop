/*
  clear && tsc --lib esnext,dom test.ts && node test.js
*/

class Register {
  static Names = {
    A: 0,
    B: 1,
    C: 2,
    D: 3,
  } as const;

  static A = new Register(Register.Names.A);
  static B = new Register(Register.Names.B);
  static C = new Register(Register.Names.C);
  static D = new Register(Register.Names.D);

  constructor(public value: typeof Register.Names[keyof typeof Register.Names]) { }
}

class Address {
  constructor(public value: number) { }
}

class Opcode2 {
  static Names = {
    load: 0,
    stor: 1,

    mov: 0,
    movm: 1,
    movi: 2,
    add: 3,
    jmp: 4,
    cmp: 5,
    sys: 6,
    hlt: 7,
    nop: 8,
  } as const;

  static mov = new Opcode2(Opcode2.Names.mov);
  static movm = new Opcode2(Opcode2.Names.movm);
  static movi = new Opcode2(Opcode2.Names.movi);
  static add = new Opcode2(Opcode2.Names.add);
  static jmp = new Opcode2(Opcode2.Names.jmp);
  static cmp = new Opcode2(Opcode2.Names.cmp);
  static sys = new Opcode2(Opcode2.Names.sys);
  static hlt = new Opcode2(Opcode2.Names.hlt);
  static nop = new Opcode2(Opcode2.Names.nop);

  constructor(public value: typeof Opcode2.Names[keyof typeof Opcode2.Names]) { }
}

enum Opcode {
  movr,
  movm,
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
    return [(Opcode.movr << 4) | dst.value, src.value];
  } else if (dst instanceof Address && src instanceof Register) {
    return [(Opcode.movm << 4) | dst.value, src.value];
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

  // Write string at address 0 to stdout
  mov(Register.A, 0),
  mov(Register.B, 13),
  sys(SysCall.write),

  // Add 2 + 3 and store at address 0
  mov(Register.A, 2),
  mov(Register.B, 3),
  add(Register.A, Register.B),
  mov(new Address(0), Register.A),

  // Compare registers A and B
  cmp(Register.A, Register.B),

  // Convert number to ASCII and write to stdout
  mov(Register.B, 48),
  add(Register.A, Register.B),
  mov(new Address(0), Register.A),
  mov(Register.A, 0),
  mov(Register.B, 1),
  sys(SysCall.write),

  // Dump memory to stdout
  sys(SysCall.dump),

  hlt(),
];

class Machine {
  registers: Uint8Array;
  memory: Uint8Array;
  flags: Uint8Array;
  pc: number;

  constructor(instructions: Program) {
    this.registers = new Uint8Array(new ArrayBuffer(4));
    this.memory = new Uint8Array(new ArrayBuffer(256));
    this.flags = new Uint8Array(new ArrayBuffer(1));
    this.pc = 0;

    instructions.flat().forEach((byte, index) => {
      this.memory[index] = byte;
    });
  }

  debug(operands: { [key: string]: string | number; }): void {
    const opCode = this.memory[this.pc] >> 4;
    const ops = Object.entries(operands).map(([name, value]) => `${name}: ${value}`).join('\t');

    console.log(Opcode[opCode] + '\t' + ops + '\r\t\t\t\t\t\t\t' + this.pc + '\t' + this.registers.join(', ') + '\t' + this.flags.join(' '));
  }

  decode() {
    const opCode = this.memory[this.pc] >> 4;

    switch (opCode) {
      case Opcode.movr: {
        const dstReg = this.memory[this.pc] & 0xF;
        const srcAddr = this.memory[this.pc + 1];

        this.registers[dstReg] = this.memory[srcAddr];

        this.debug({ dstReg, srcAddr });

        return this.pc += 2;
      }
      case Opcode.movi: {
        const dstReg = this.memory[this.pc] & 0xF;
        const srcValue = this.memory[this.pc + 1];

        this.registers[dstReg] = srcValue;

        this.debug({ dstReg, srcValue });

        return this.pc += 2;
      }
      case Opcode.movm: {
        const srcReg = this.memory[this.pc] & 0xF;
        const dstAddr = this.memory[this.pc + 1];

        this.memory[dstAddr] = this.registers[srcReg];

        this.pc += 2;

        return 2;
      }
      case Opcode.add: {
        const dstReg = (this.memory[this.pc] >> 2) & 0x3;
        const srcReg = this.memory[this.pc] & 0x3;

        this.registers[dstReg] += this.registers[srcReg];

        this.flags[0] = this.registers[dstReg] === 0 ? this.flags[0] | 0b01 : this.flags[0] & ~0b01;

        this.debug({ dstReg, srcReg });

        return this.pc += 1;
      }
      case Opcode.jmp: {
        const srcAddr = this.memory[this.pc + 1];

        this.pc = srcAddr;

        return 2;
      }
      case Opcode.cmp: {
        const dstReg = (this.memory[this.pc] >> 2) & 0x3;
        const srcReg = (this.memory[this.pc] >> 0) & 0x3;

        const value = this.registers[dstReg] - this.registers[srcReg];

        this.flags[0] = value === 0 ? this.flags[0] | 0b01 : this.flags[0] & ~0b01;

        this.debug({ dstReg, srcReg });

        this.pc += 1;

        return 1;
      }
      case Opcode.sys: {
        const op = this.memory[this.pc] & 0xF;

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

        return this.pc += 1;
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

  start(pc: number) {
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

machine.start(15);

export { };
