"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
    return [(Opcode.mov << 4) | dst.value, src];
}
function lod(dst, src) {
    return [(Opcode.lod << 4) | dst.value, src.value];
}
function sto(dst, src) {
    return [(Opcode.sto << 4) | dst.value, src.value];
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
            '\t' + Array.from(this.registers).map(function (register) { return register.toString().padStart(3, '0'); }).join('  ') +
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
                if (this.flags[0] & 2) {
                    return this.pc = srcAddr;
                }
                else {
                    return this.pc += 2;
                }
            }
            case (Opcode.jmp << 4) | JmpOp.lt: {
                var srcAddr = this.memory[this.pc + 1];
                this.debug({ op: JmpOp[JmpOp.lt] });
                if (this.flags[0] & 1) {
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
    };
    Machine.prototype.loop = function () {
        return __awaiter(this, void 0, void 0, function () {
            var opCode;
            var _this = this;
            return __generator(this, function (_a) {
                opCode = this.decode();
                this.execute(opCode);
                if (this.pc !== 255) {
                    return [2 /*return*/, new Promise(function (resolve) {
                            setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.loop()];
                                        case 1:
                                            _a.sent();
                                            resolve();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, 500 - Date.now() % 500);
                        })];
                }
                return [2 /*return*/, Promise.resolve()];
            });
        });
    };
    Machine.prototype.start = function (pc) {
        return __awaiter(this, void 0, void 0, function () {
            var opCode;
            return __generator(this, function (_a) {
                console.log('OP      OPERANDS                                        PC        A    B    C    D      C  Z');
                console.log('======= =============== =============== =============== ======= ======================= ====');
                this.pc = pc;
                do {
                    opCode = this.decode();
                    this.execute(opCode);
                } while (this.pc !== 255);
                console.log();
                return [2 /*return*/];
            });
        });
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
];
function transform(instructions) {
    var labels2 = {};
    var instructions2 = [];
    var index = 0;
    for (var _i = 0, instructions_2 = instructions; _i < instructions_2.length; _i++) {
        var data = instructions_2[_i];
        if (typeof data === 'string') {
            labels2[data] = index;
        }
        else {
            instructions2.push.apply(instructions2, data);
            index += data.length;
        }
    }
    ;
    index = 0;
    for (var _a = 0, instructions2_1 = instructions2; _a < instructions2_1.length; _a++) {
        var data = instructions2_1[_a];
        if (typeof data === 'string') {
            instructions2[index] = labels2[data];
        }
        ++index;
    }
    return instructions2;
}
var labels2 = {};
var instructions2 = [];
var index = 0;
for (var _i = 0, instructions_1 = instructions; _i < instructions_1.length; _i++) {
    var data = instructions_1[_i];
    if (typeof data === 'string') {
        labels2[data] = index;
    }
    else {
        instructions2.push.apply(instructions2, data);
        index += data.length;
    }
}
;
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
var instructions4 = instructions2.map(function (data) { return typeof data === 'string' ? labels2[data] : data; });
console.log(instructions4, '\n');
// const machine = new Machine(instructions4);
var machine = new Machine(transform(instructions));
function start() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, machine.start(labels2.start)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, machine.start(labels2.add)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, machine.start(labels2.compare)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, machine.start(labels2.start2)];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
start();
