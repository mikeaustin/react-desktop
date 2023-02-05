"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var Register = /** @class */ (function () {
    function Register(value) {
        this.value = value;
    }
    Register.Values = {
        A: 0,
        B: 1,
        C: 2,
        D: 3
    };
    Register.Names = {
        0: 'A',
        1: 'B',
        2: 'C',
        3: 'D'
    };
    Register.A = new Register(Register.Values.A);
    Register.B = new Register(Register.Values.B);
    Register.C = new Register(Register.Values.C);
    Register.D = new Register(Register.Values.D);
    return Register;
}());
var Address = /** @class */ (function () {
    function Address(value) {
        this.value = value;
    }
    return Address;
}());
var Opcode2 = /** @class */ (function () {
    function Opcode2(value) {
        this.value = value;
    }
    Opcode2.Values = {
        hlt: 7,
        mov: 0,
        sto: 1,
        add: 3,
        jmp: 4,
        cmp: 5,
        sys: 6
    };
    Opcode2.Names = {};
    Opcode2.hlt = new Opcode2(Opcode2.Values.hlt);
    Opcode2.mov = new Opcode2(Opcode2.Values.mov);
    Opcode2.sto = new Opcode2(Opcode2.Values.sto);
    Opcode2.add = new Opcode2(Opcode2.Values.add);
    Opcode2.jmp = new Opcode2(Opcode2.Values.jmp);
    Opcode2.cmp = new Opcode2(Opcode2.Values.cmp);
    Opcode2.sys = new Opcode2(Opcode2.Values.sys);
    return Opcode2;
}());
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
var Opcode;
(function (Opcode) {
    Opcode[Opcode["add"] = 2] = "add";
    Opcode[Opcode["sub"] = 4] = "sub";
    Opcode[Opcode["cmp"] = 6] = "cmp";
    Opcode[Opcode["sys"] = 8] = "sys";
    Opcode[Opcode["mov"] = 1] = "mov";
    Opcode[Opcode["lod"] = 3] = "lod";
    Opcode[Opcode["sto"] = 5] = "sto";
    Opcode[Opcode["jmp"] = 7] = "jmp";
})(Opcode || (Opcode = {}));
var JmpOp;
(function (JmpOp) {
    JmpOp[JmpOp["always"] = 0] = "always";
    JmpOp[JmpOp["eq"] = 1] = "eq";
    JmpOp[JmpOp["lt"] = 2] = "lt";
})(JmpOp || (JmpOp = {}));
var SysCall;
(function (SysCall) {
    SysCall[SysCall["exit"] = 0] = "exit";
    SysCall[SysCall["write"] = 1] = "write";
    SysCall[SysCall["dump"] = 2] = "dump";
})(SysCall || (SysCall = {}));
function mov(dst, src) {
    if (dst instanceof Register && src instanceof Address) {
        return [(Opcode.lod << 4) | dst.value, src.value];
    }
    else if (dst instanceof Address && src instanceof Register) {
        return [(Opcode.sto << 4) | dst.value, src.value];
    }
    else if (dst instanceof Register && (typeof src === 'number' || typeof src === 'string')) {
        return [(Opcode.mov << 4) | dst.value, src];
    }
    return [];
}
function add(dstReg, srcReg) {
    return [(Opcode.add << 4) | (dstReg.value << 2) | srcReg.value];
}
function sub(dstReg, srcReg) {
    return [(Opcode.sub << 4) | (dstReg.value << 2) | srcReg.value];
}
function jmp(srcAddr) {
    return [(Opcode.jmp << 4) | JmpOp.always, srcAddr.value];
}
function jeq(srcAddr) {
    return [(Opcode.jmp << 4) | JmpOp.eq, srcAddr];
}
function jlt(srcAddr) {
    return [(Opcode.jmp << 4) | JmpOp.lt, srcAddr];
}
function cmp(srcReg1, srcReg2) {
    return [(Opcode.cmp << 4) | (srcReg1.value << 2) | srcReg2.value];
}
function sys(op) {
    return [(Opcode.sys << 4) | op];
}
function ascii(string) {
    return string.split('').map(function (char) { return char.charCodeAt(0); });
}
var Machine = /** @class */ (function () {
    function Machine(instructions) {
        var _this = this;
        this.registers = new Uint8Array(new ArrayBuffer(4));
        this.memory = new Uint8Array(new ArrayBuffer(256));
        this.flags = new Uint8Array(new ArrayBuffer(1));
        this.pc = 0;
        instructions.flat().forEach(function (byte, index) {
            if (typeof byte !== 'string') {
                _this.memory[index] = byte;
            }
        });
    }
    Machine.prototype.debug = function (operands) {
        var opCode = this.memory[this.pc] >> 4;
        var ops = Object.entries(operands).map(function (_a) {
            var name = _a[0], value = _a[1];
            return "".concat(name, ": ").concat(value);
        }).join('\t');
        console.log(Opcode[opCode] + '\t' + ops +
            '\r\t\t\t\t\t\t\t' + this.pc +
            '\t' + this.registers.join(', ') +
            '\t' + ((this.flags[0] >> 0) & 0x01) +
            '  ' + ((this.flags[0] >> 1) & 0x01));
    };
    Machine.prototype.decode = function () {
        return this.memory[this.pc] >> 4;
    };
    Machine.prototype.execute = function (opCode) {
        switch (this.memory[this.pc]) {
            case (Opcode.jmp << 4) | JmpOp.always: {
                var srcAddr = this.memory[this.pc + 1];
                this.debug({ op: JmpOp[JmpOp.always] });
                return this.pc = srcAddr;
            }
            case (Opcode.jmp << 4) | JmpOp.eq: {
                var srcAddr = this.memory[this.pc + 1];
                this.debug({ op: JmpOp[JmpOp.eq] });
                if ((this.flags[0] & 0x02) === 0x02) {
                    return this.pc = srcAddr;
                }
                else {
                    return this.pc += 2;
                }
            }
            case (Opcode.jmp << 4) | JmpOp.lt: {
                var srcAddr = this.memory[this.pc + 1];
                this.debug({ op: JmpOp[JmpOp.lt] });
                if (this.flags[0] === 0x01) {
                    return this.pc = srcAddr;
                }
                else {
                    return this.pc += 2;
                }
            }
        }
        switch (opCode) {
            case Opcode.mov: {
                var dstReg = this.memory[this.pc] & 0xF;
                var srcValue = this.memory[this.pc + 1];
                this.registers[dstReg] = srcValue;
                this.debug({ dstReg: Register.Names[dstReg], srcValue: srcValue });
                return this.pc += 2;
            }
            case Opcode.lod: {
                var dstReg = this.memory[this.pc] & 0x03;
                var srcAddr = this.memory[this.pc + 1];
                this.registers[dstReg] = this.memory[srcAddr];
                this.debug({ dstReg: dstReg, srcAddr: srcAddr });
                return this.pc += 2;
            }
            case Opcode.sto: {
                var srcReg = this.memory[this.pc] & 0x3;
                var dstAddr = this.memory[this.pc + 1];
                this.memory[dstAddr] = this.registers[srcReg];
                this.debug({ dstAddr: dstAddr, srcReg: Register.Names[srcReg] });
                return this.pc += 2;
            }
            case Opcode.add: {
                var dstReg = (this.memory[this.pc] >> 2) & 0x3;
                var srcReg = this.memory[this.pc] & 0x3;
                var value = this.registers[dstReg] + this.registers[srcReg];
                this.registers[dstReg] = value;
                this.flags[0] = (this.flags[0] & ~2) | (+(value === 0) << 1);
                this.flags[0] = (this.flags[0] & ~1) | +(value > 0);
                this.debug({ dstReg: Register.Names[dstReg], srcReg: Register.Names[srcReg] });
                return this.pc += 1;
            }
            case Opcode.sub: {
                var dstReg = (this.memory[this.pc] >> 2) & 0x3;
                var srcReg = this.memory[this.pc] & 0x3;
                var value = this.registers[dstReg] - this.registers[srcReg];
                this.registers[dstReg] = value;
                this.flags[0] = (this.flags[0] & ~2) | (+(value === 0) << 1);
                this.flags[0] = (this.flags[0] & ~1) | +(value > 0);
                this.debug({ dstReg: Register.Names[dstReg], srcReg: Register.Names[srcReg] });
                return this.pc += 1;
            }
            case Opcode.cmp: {
                var dstReg = (this.memory[this.pc] >> 2) & 0x3;
                var srcReg = (this.memory[this.pc] >> 0) & 0x3;
                var value = this.registers[dstReg] - this.registers[srcReg];
                this.flags[0] = (this.flags[0] & ~2) | (+(value === 0) << 1);
                this.flags[0] = (this.flags[0] & ~1) | +(value > 0);
                this.debug({ dstReg: Register.Names[dstReg], srcReg: Register.Names[srcReg] });
                return this.pc += 1;
            }
            case Opcode.sys: {
                var op = this.memory[this.pc] & 0xF;
                switch (op) {
                    case SysCall.write: {
                        var address = this.registers[Register.A.value];
                        var length_1 = this.registers[Register.B.value];
                        var string = this.memory
                            .slice(address, address + length_1)
                            .reduce(function (array, charCode) { return __spreadArray(__spreadArray([], array, true), [String.fromCharCode(charCode)], false); }, [])
                            .join('');
                        this.registers[Register.A.value] = 0;
                        this.debug({ op: SysCall[op], address: address, length: length_1 });
                        console.log(string);
                        break;
                    }
                    case SysCall.dump: {
                        this.debug({ op: SysCall[op] });
                        console.log(this.memory);
                        break;
                    }
                    case SysCall.exit: {
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
    };
    Machine.prototype.start = function (pc) {
        console.log('OP      OPERANDS                                        PC      REGISTERS       C  Z');
        console.log('======= =============== =============== =============== ======= =============== ====');
        this.pc = pc;
        var opCode;
        do {
            opCode = this.decode();
            this.execute(opCode);
        } while (this.pc !== 255);
        console.log();
    };
    return Machine;
}());
var instructions = [
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
    mov(new Address(0), Register.A),
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
];
// let labels: { [label: string]: number; } = {};
// let index = 0;
// for (const data of instructions) {
//   if (typeof data === 'string') {
//     labels[data] = index;
//   } else {
//     index += data.length;
//   }
// };
// console.log(labels);
var _a = instructions.reduce(function (_a, data) {
    var _b;
    var inst = _a[0], labels = _a[1], index = _a[2];
    if (typeof data === 'string') {
        return [inst, __assign(__assign({}, labels), (_b = {}, _b[data] = index, _b)), index];
    }
    else {
        return [__spreadArray(__spreadArray([], inst, true), data, true), labels, index + data.length];
    }
}, [[], {}, 0]), instructions2 = _a[0], labels2 = _a[1];
var _b = instructions.reduce(function (_a, data) {
    var _b;
    var inst = _a[0], labels = _a[1], index = _a[2];
    if (typeof data === 'string') {
        labels[data] = index;
        return [inst, __assign(__assign({}, labels), (_b = {}, _b[data] = index, _b)), index];
    }
    else {
        inst = __spreadArray(__spreadArray([], inst, true), data, true);
        index = index + data.length;
    }
    return [data, labels, index];
}, [[], {}, 0]), instructions3 = _b[0], labels3 = _b[1];
console.log(instructions2);
var instructions4 = instructions2.map(function (data) { return typeof data === 'string' ? labels2[data] : data; });
var machine = new Machine(instructions4);
machine.start(labels2.start);
machine.start(labels2.add);
machine.start(labels2.compare);
machine.start(labels2.start2);
