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
    sto: 1,
    add: 3,
    jmp: 4,
    cmp: 5,
    sys: 6,
  } as const;

  static Names = {

  };

  static hlt = new Opcode2(Opcode2.Values.hlt);
  static mov = new Opcode2(Opcode2.Values.mov);
  static sto = new Opcode2(Opcode2.Values.sto);
  static add = new Opcode2(Opcode2.Values.add);
  static jmp = new Opcode2(Opcode2.Values.jmp);
  static cmp = new Opcode2(Opcode2.Values.cmp);
  static sys = new Opcode2(Opcode2.Values.sys);

  constructor(public value: typeof Opcode2.Values[keyof typeof Opcode2.Values]) { }
}

/*
  add add registers
  sub subtract registers
  cmp compare registers
  sys system call
  mov move immediate
  lod load from memory
  sto store to memory
  jmp jump to address
*/

enum Opcode {
  add  /* even */ = 0x02,
  sub  /* even */ = 0x04,
  cmp  /* even */ = 0x06,
  sys  /* even */ = 0x08,
  mov  /* odd  */ = 0x01,
  lod  /* odd  */ = 0x03,
  sto  /* odd  */ = 0x05,
  jmp  /* odd  */ = 0x07,
}

enum JmpOp {
  always,
  eq,
  lt,
}

enum SysCall {
  exit = 0,
  write = 1,
  dump = 2,
}

function mov(dst: Register, src: number | string): (number | string)[] {
  return [(Opcode.mov << 4) | dst.value, src];
}

function lod(dst: Register, src: Address) {
  return [(Opcode.lod << 4) | dst.value, src.value];
}

function sto(dst: Address, src: Register) {
  return [(Opcode.sto << 4) | src.value, dst.value];
}

function add(dstReg: Register, srcReg: Register) {
  return [(Opcode.add << 4) | (dstReg.value << 2) | srcReg.value];
}

function sub(dstReg: Register, srcReg: Register) {
  return [(Opcode.sub << 4) | (dstReg.value << 2) | srcReg.value];
}

function jmp(srcAddr: number | string) {
  return [(Opcode.jmp << 4) | JmpOp.always, srcAddr];
}

function jeq(srcAddr: number | string) {
  return [(Opcode.jmp << 4) | JmpOp.eq, srcAddr];
}

function jlt(srcAddr: number | string) {
  return [(Opcode.jmp << 4) | JmpOp.lt, srcAddr];
}

function cmp(srcReg1: Register, srcReg2: Register) {
  return [(Opcode.cmp << 4) | (srcReg1.value << 2) | srcReg2.value];
}

function sys(op: number) {
  return [(Opcode.sys << 4) | op];
}

function ascii(string: string): number[] {
  return string.split('').map(char => char.charCodeAt(0));
}

type Program = ((number | string)[] | string)[];

class Machine {
  public registers: Uint8Array;
  public memory: Uint8Array;
  public flags: Uint8Array;
  public pc: number;

  timeout: number = 0;

  onRegisterChange?: (address: number, value: number) => void;
  onMemoryChange?: (address: number, value: number) => void;
  onCounterChange?: (address: number) => void;

  static transform(instructions: Program): [number[], { [label: string]: number; }] {
    let labels: { [label: string]: number; } = {};
    let opcodes: (number | string)[] = [];
    let index = 0;

    for (const data of instructions) {
      if (typeof data === 'string') {
        labels[data] = index;
      } else {
        opcodes.push(...data);
        index += data.length;
      }
    };

    index = 0;

    for (const data of opcodes) {
      if (typeof data === 'string') {
        opcodes[index] = labels[data];
      }

      ++index;
    }

    return [opcodes as number[], labels];
  }

  constructor(
    instructions: number[],
    options: {
      onMemoryChange?: (address: number, value: number) => void,
      onCounterChange?: (address: number) => void;
    }
  ) {
    this.registers = new Uint8Array(new ArrayBuffer(4));
    this.memory = new Uint8Array(new ArrayBuffer(256));
    this.flags = new Uint8Array(new ArrayBuffer(1));
    this.pc = 0;

    instructions.flat().forEach((byte, index) => {
      if (typeof byte !== 'string') {
        this.memory[index] = byte;
      }
    });

    this.onMemoryChange = options.onMemoryChange;
    this.onCounterChange = options.onCounterChange;
  }

  debug(operands: { [key: string]: string | number; }): void {
    return;

    const opCode = this.memory[this.pc] >> 4;
    const ops = Object.entries(operands).map(([name, value]) => `${name}: ${value}`).join('\t');

    console.log(
      Opcode[opCode] + '\t' + ops +
      '\r\t\t\t\t\t\t\t' + this.pc +
      '\t' + Array.from(this.registers).map(register => register.toString().padStart(3, '0')).join('  ') +
      '\t' + ((this.flags[0] >> 0) & 0x01) +
      '  ' + ((this.flags[0] >> 1) & 0x01)
    );
  }

  decode() {
    return this.memory[this.pc] >> 4;
  }

  execute(opCode: number) {
    switch (this.memory[this.pc]) {
      case (Opcode.jmp << 4) | JmpOp.always: {
        const srcAddr = this.memory[this.pc + 1];

        this.debug({ op: JmpOp[JmpOp.always] });

        return this.pc = srcAddr;
      }
      case (Opcode.jmp << 4) | JmpOp.eq: {
        const srcAddr = this.memory[this.pc + 1];

        this.debug({ op: JmpOp[JmpOp.eq] });

        if (this.flags[0] & 0b010) {
          return this.pc = srcAddr;
        } else {
          return this.pc += 2;
        }
      }
      case (Opcode.jmp << 4) | JmpOp.lt: {
        const srcAddr = this.memory[this.pc + 1];

        this.debug({ op: JmpOp[JmpOp.lt] });

        if (this.flags[0] & 0b01) {
          return this.pc = srcAddr;
        } else {
          return this.pc += 2;
        }
      }
    }

    switch (opCode) {
      case Opcode.mov: {
        const dstReg = this.memory[this.pc] & 0xF;
        const srcValue = this.memory[this.pc + 1];

        this.registers[dstReg] = srcValue;

        this.debug({ dstReg: (Register.Names as any)[dstReg], srcValue });

        return this.pc += 2;
      }
      case Opcode.lod: {
        const dstReg = this.memory[this.pc] & 0x03;
        const srcAddr = this.memory[this.pc + 1];

        this.registers[dstReg] = this.memory[srcAddr];

        this.debug({ dstReg, srcAddr });

        return this.pc += 2;
      }
      case Opcode.sto: {
        const srcReg = this.memory[this.pc] & 0x3;
        const dstAddr = this.memory[this.pc + 1];

        this.memory[dstAddr] = this.registers[srcReg];

        this.debug({ dstAddr, srcReg: (Register.Names as any)[srcReg] });

        if (this.onMemoryChange) {
          this.onMemoryChange(dstAddr, this.registers[srcReg]);
        }

        return this.pc += 2;
      }
      case Opcode.add: {
        const dstReg = (this.memory[this.pc] >> 2) & 0x3;
        const srcReg = this.memory[this.pc] & 0x3;

        const value = this.registers[dstReg] + this.registers[srcReg];

        this.registers[dstReg] = value;

        this.flags[0] = (this.flags[0] & ~0b10) | (+(value === 0) << 1);
        this.flags[0] = (this.flags[0] & ~0b01) | +(value > 0);

        this.debug({ dstReg: (Register.Names as any)[dstReg], srcReg: (Register.Names as any)[srcReg] });

        return this.pc += 1;
      }
      case Opcode.sub: {
        const dstReg = (this.memory[this.pc] >> 2) & 0x3;
        const srcReg = this.memory[this.pc] & 0x3;

        const value = this.registers[dstReg] - this.registers[srcReg];

        this.registers[dstReg] = value;

        this.flags[0] = (this.flags[0] & ~0b10) | (+(value === 0) << 1);
        this.flags[0] = (this.flags[0] & ~0b01) | +(value > 0);

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

        switch (op) {
          case SysCall.write: {
            const address = this.registers[Register.A.value];
            const length = this.registers[Register.B.value];

            const string = this.memory
              .slice(address, address + length)
              .reduce<string[]>((array, charCode) => [...array, String.fromCharCode(charCode)], [])
              .join('');

            this.registers[Register.A.value] = 0;

            this.debug({ op: SysCall[op], address, length });

            console.log(string);

            break;
          }
          case SysCall.dump: {
            this.debug({ op: SysCall[op] });

            console.log(this.memory);

            break;
          }
          case SysCall.exit: {
            this.debug({ op: SysCall[op] });

            return this.pc = 255;
          }
          default: {
            console.log('Invalid syscall');
          }
        }

        return this.pc += 1;
      }
      default: {
        console.log('Illegal operation');

        return this.pc = 255;
      }
    }
  }

  async run(): Promise<void> {
    clearInterval(this.timeout);

    return new Promise(resolve => {
      const loop = () => {
        const opCode = this.decode();

        this.execute(opCode);

        if (this.onCounterChange) {
          this.onCounterChange(this.pc);
        }

        if (this.pc === 255) {
          clearTimeout(this.timeout);

          resolve();
        }
      };

      this.timeout = window.setInterval(loop, 1000 / 10);
    });
  }

  async start(pc: number) {
    console.log('OP      OPERANDS                                        PC        A    B    C    D      C  Z');
    console.log('======= =============== =============== =============== ======= ======================= ====');

    this.pc = pc;

    await this.run();

    console.log();
  }
}

// console.log(labels);

// const [instructions2, labels2] = instructions.reduce<[
//   (number | string)[],
//   { [label: string]: number; },
//   number,
// ]>(([inst, labels, index], data) => {
//   if (typeof data === 'string') {
//     return [inst, { ...labels, [data]: index }, index];
//   } else {
//     return [[...inst, ...data], labels, index + data.length];
//   }
// }, [[], {}, 0]);

// const [instructions3, labels3] = instructions.reduce(([inst, labels, index], data) => {
//   if (typeof data === 'string') {
//     labels[data] = index;
//   } else {
//     inst = [...inst, ...data];
//     index = index + data.length;
//   }

//   return [inst, labels, index];
// }, [[] as (number | string)[], {} as { [label: string]: number; }, 0]);

export default Machine;

export {
  type Program,
  Address,
  Register,
  SysCall,
  add,
  sub,
  cmp,
  sys,
  mov,
  lod,
  sto,
  jmp,
  jeq,
  jlt,
  ascii,
};
