/*
  clear && tsc --lib esnext,dom test.ts && node test.js
*/

class Register {
  static Values = {
    A: 0,
    B: 1,
    C: 2,
    D: 3,
  } as const;

  static Names = {
    0: 'A',
    1: 'B',
    2: 'C',
    3: 'D',
  } as const;

  static A = new Register(Register.Values.A);
  static B = new Register(Register.Values.B);
  static C = new Register(Register.Values.C);
  static D = new Register(Register.Values.D);

  constructor(public value: typeof Register.Values[keyof typeof Register.Values]) { }
}

class Address {
  constructor(public value: number) { }
}

class Opcode2 {
  static Values = {
    hlt: 7,
    mov: 0,
    movm: 1,
    movi: 2,
    add: 3,
    jmp: 4,
    cmp: 5,
    sys: 6,
  } as const;

  static Names = {

  };

  static hlt = new Opcode2(Opcode2.Values.hlt);
  static mov = new Opcode2(Opcode2.Values.mov);
  static movm = new Opcode2(Opcode2.Values.movm);
  static movi = new Opcode2(Opcode2.Values.movi);
  static add = new Opcode2(Opcode2.Values.add);
  static jmp = new Opcode2(Opcode2.Values.jmp);
  static cmp = new Opcode2(Opcode2.Values.cmp);
  static sys = new Opcode2(Opcode2.Values.sys);

  constructor(public value: typeof Opcode2.Values[keyof typeof Opcode2.Values]) { }
}

enum Opcode {
  hlt  /* even */ = 0x00,
  mov  /* even */ = 0x02,
  add  /* even */ = 0x04,
  sub  /* even */ = 0x06,
  inc  /* even */ = 0x08,
  dec  /* even */ = 0x0A,
  cmp  /* even */ = 0x0C,
  sys  /* even */ = 0x0E,

  movr /* odd  */ = 0x01,
  movi /* odd  */ = 0x03,
  movm /* odd  */ = 0x05,
  addi /* odd  */ = 0x07,
  subi /* odd  */ = 0x09,
  cmpi /* odd  */ = 0x0B,
  jmpa /* odd  */ = 0x0D,
  // jlt  /* odd  */ = 0x0F,
}

enum JmpOp {
  always,
  eq,
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

function hlt() {
  return [Opcode.hlt << 4];
}

function add(dstReg: Register, srcReg: Register) {
  return [(Opcode.add << 4) | (dstReg.value << 2) | srcReg.value];
}

function jmp(srcAddr: Address) {
  return [(Opcode.jmpa << 4) | JmpOp.always, srcAddr.value];
}

function jeq(srcAddr: number) {
  return [(Opcode.jmpa << 4) | JmpOp.eq, srcAddr];
}

function cmp(srcReg1: Register, srcReg2: Register) {
  return [(Opcode.cmp << 4) | (srcReg1.value << 2) | srcReg2.value];
}

function sys(op: number) {
  return [(Opcode.sys << 4) | op];
}

function string(string: string): number[] {
  return string.split('').map(char => char.charCodeAt(0));
}

type Program = number[][];

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

    console.log(
      Opcode[opCode] + '\t' + ops +
      '\r\t\t\t\t\t\t\t' + this.pc +
      '\t' + this.registers.join(', ') +
      '\t' + ((this.flags[0] >> 0) & 0x01) +
      '  ' + ((this.flags[0] >> 1) & 0x01)
    );
  }

  decode() {
    return this.memory[this.pc] >> 4;
  }

  execute(opCode: number) {
    switch (this.memory[this.pc]) {
      case (Opcode.jmpa << 4) | JmpOp.always: {
        const srcAddr = this.memory[this.pc + 1];

        return this.pc = srcAddr;
      }
      case (Opcode.jmpa << 4) | JmpOp.eq: {
        const srcAddr = this.memory[this.pc + 1];

        if ((this.flags[0] >> 0) & 0x10) {
          return this.pc = srcAddr;
        } else {
          return this.pc += 2;
        }
      }
    }

    switch (opCode) {
      case Opcode.movi: {
        const dstReg = this.memory[this.pc] & 0xF;
        const srcValue = this.memory[this.pc + 1];

        this.registers[dstReg] = srcValue;

        this.debug({ dstReg: (Register.Names as any)[dstReg], srcValue });

        return this.pc += 2;
      }
      case Opcode.movr: {
        const dstReg = this.memory[this.pc] & 0xF;
        const srcAddr = this.memory[this.pc + 1];

        this.registers[dstReg] = this.memory[srcAddr];

        this.debug({ dstReg, srcAddr });

        return this.pc += 2;
      }
      case Opcode.movm: {
        const srcReg = this.memory[this.pc] & 0xF;
        const dstAddr = this.memory[this.pc + 1];

        this.memory[dstAddr] = this.registers[srcReg];

        this.debug({ dstAddr, srcReg: (Register.Names as any)[srcReg] });

        return this.pc += 2;
      }
      case Opcode.add: {
        const dstReg = (this.memory[this.pc] >> 2) & 0x3;
        const srcReg = this.memory[this.pc] & 0x3;

        const value = this.registers[dstReg] + this.registers[srcReg];

        this.registers[dstReg] = value;

        this.flags[0] = (this.flags[0] & ~0b10) | (+(value === 0) << 1);
        this.flags[0] = (this.flags[0] & ~0b01);

        this.debug({ dstReg: (Register.Names as any)[dstReg], srcReg: (Register.Names as any)[srcReg] });

        return this.pc += 1;
      }
      case Opcode.cmp: {
        const dstReg = (this.memory[this.pc] >> 2) & 0x3;
        const srcReg = (this.memory[this.pc] >> 0) & 0x3;

        const value = this.registers[dstReg] - this.registers[srcReg];

        this.flags[0] = (this.flags[0] & ~0b10) | (+(value === 0) << 1);
        this.flags[0] = (this.flags[0] & ~0b01) | +(value > 0);

        this.debug({ dstReg: (Register.Names as any)[dstReg], srcReg: (Register.Names as any)[srcReg] });

        return this.pc += 1;
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
        this.debug({});

        return 0;
      }
      default: {
        console.log('Illegal operation');

        return 0;
      }
    }
  }

  start(pc: number) {
    console.log('OP      OPERANDS                                        PC      REGISTERS       C  Z');
    console.log('======= =============== =============== =============== ======= =============== ====');

    this.pc = pc;

    for (let opCode = this.decode(); opCode !== Opcode.hlt; opCode = this.decode()) {
      opCode = this.decode();

      this.execute(opCode);
    };

    console.log();
  }
}

const instructions2: Program = [
  string('Hello, world.'),

  // Write string at address 0 to stdout

  mov(Register.A, 0),
  mov(Register.B, 13),
  sys(SysCall.write),
  hlt(),

  // Add 2 + 3, convert to ASCII, and write to stdout

  mov(Register.A, 2),
  mov(Register.B, 3),
  add(Register.A, Register.B),

  mov(Register.B, 48),
  add(Register.A, Register.B),

  mov(new Address(0), Register.A),
  mov(Register.A, 0),
  mov(Register.B, 1),
  sys(SysCall.write),
  hlt(),

  // Compare registers A and B

  mov(Register.A, 5),
  mov(Register.B, 0),
  cmp(Register.A, Register.B),
  jeq(255),
  hlt(),
];

const machine = new Machine(instructions2);

machine.start(13);
machine.start(19);
machine.start(35);

export { };
