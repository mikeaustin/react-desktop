"use strict";
/*
  clear && tsc --lib esnext,dom test.ts && node test.js
*/
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
    Register.Names = {
        A: 0,
        B: 1,
        C: 2,
        D: 3
    };
    Register.A = new Register(Register.Names.A);
    Register.B = new Register(Register.Names.B);
    Register.C = new Register(Register.Names.C);
    Register.D = new Register(Register.Names.D);
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
    Opcode2.Names = {
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
        nop: 8
    };
    Opcode2.mov = new Opcode2(Opcode2.Names.mov);
    Opcode2.movm = new Opcode2(Opcode2.Names.movm);
    Opcode2.movi = new Opcode2(Opcode2.Names.movi);
    Opcode2.add = new Opcode2(Opcode2.Names.add);
    Opcode2.jmp = new Opcode2(Opcode2.Names.jmp);
    Opcode2.cmp = new Opcode2(Opcode2.Names.cmp);
    Opcode2.sys = new Opcode2(Opcode2.Names.sys);
    Opcode2.hlt = new Opcode2(Opcode2.Names.hlt);
    Opcode2.nop = new Opcode2(Opcode2.Names.nop);
    return Opcode2;
}());
var Opcode;
(function (Opcode) {
    Opcode[Opcode["movr"] = 0] = "movr";
    Opcode[Opcode["movm"] = 1] = "movm";
    Opcode[Opcode["movi"] = 2] = "movi";
    Opcode[Opcode["add"] = 3] = "add";
    Opcode[Opcode["jmp"] = 4] = "jmp";
    Opcode[Opcode["cmp"] = 5] = "cmp";
    Opcode[Opcode["sys"] = 6] = "sys";
    Opcode[Opcode["hlt"] = 7] = "hlt";
    Opcode[Opcode["nop"] = 8] = "nop";
})(Opcode || (Opcode = {}));
var SysCall;
(function (SysCall) {
    SysCall[SysCall["write"] = 1] = "write";
    SysCall[SysCall["dump"] = 2] = "dump";
})(SysCall || (SysCall = {}));
function mov(dst, src) {
    if (dst instanceof Register && src instanceof Address) {
        return [(Opcode.movr << 4) | dst.value, src.value];
    }
    else if (dst instanceof Address && src instanceof Register) {
        return [(Opcode.movm << 4) | dst.value, src.value];
    }
    else if (dst instanceof Register && typeof src === 'number') {
        return [(Opcode.movi << 4) | dst.value, src];
    }
    return [];
}
function add(dstReg, srcReg) {
    return [(Opcode.add << 4) | (dstReg.value << 2) | srcReg.value];
}
function jmp(srcAddr) {
    return [(Opcode.jmp << 4), srcAddr.value];
}
function cmp(srcReg1, srcReg2) {
    return [(Opcode.cmp << 4) | (srcReg1.value << 2) | srcReg2.value];
}
function sys(op) {
    return [(Opcode.sys << 4) | op];
}
function hlt() {
    return [Opcode.hlt << 4];
}
function string(string) {
    return string.split('').map(function (char) { return char.charCodeAt(0); });
}
var instructions2 = [
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
var Machine = /** @class */ (function () {
    function Machine(instructions) {
        var _this = this;
        this.registers = new Uint8Array(new ArrayBuffer(4));
        this.memory = new Uint8Array(new ArrayBuffer(256));
        this.flags = new Uint8Array(new ArrayBuffer(1));
        this.pc = 0;
        instructions.flat().forEach(function (byte, index) {
            _this.memory[index] = byte;
        });
    }
    Machine.prototype.debug = function (operands) {
        var opCode = this.memory[this.pc] >> 4;
        var ops = Object.entries(operands).map(function (_a) {
            var name = _a[0], value = _a[1];
            return "".concat(name, ": ").concat(value);
        }).join('\t');
        console.log(Opcode[opCode] + '\t' + ops + '\r\t\t\t\t\t\t\t' + this.pc + '\t' + this.registers.join(', ') + '\t' + this.flags.join(' '));
    };
    Machine.prototype.decode = function () {
        var opCode = this.memory[this.pc] >> 4;
        switch (opCode) {
            case Opcode.movr: {
                var dstReg = this.memory[this.pc] & 0xF;
                var srcAddr = this.memory[this.pc + 1];
                this.registers[dstReg] = this.memory[srcAddr];
                this.debug({ dstReg: dstReg, srcAddr: srcAddr });
                return this.pc += 2;
            }
            case Opcode.movi: {
                var dstReg = this.memory[this.pc] & 0xF;
                var srcValue = this.memory[this.pc + 1];
                this.registers[dstReg] = srcValue;
                this.debug({ dstReg: dstReg, srcValue: srcValue });
                return this.pc += 2;
            }
            case Opcode.movm: {
                var srcReg = this.memory[this.pc] & 0xF;
                var dstAddr = this.memory[this.pc + 1];
                this.memory[dstAddr] = this.registers[srcReg];
                this.pc += 2;
                return 2;
            }
            case Opcode.add: {
                var dstReg = (this.memory[this.pc] >> 2) & 0x3;
                var srcReg = this.memory[this.pc] & 0x3;
                this.registers[dstReg] += this.registers[srcReg];
                this.flags[0] = this.registers[dstReg] === 0 ? this.flags[0] | 1 : this.flags[0] & ~1;
                this.debug({ dstReg: dstReg, srcReg: srcReg });
                return this.pc += 1;
            }
            case Opcode.jmp: {
                var srcAddr = this.memory[this.pc + 1];
                this.pc = srcAddr;
                return 2;
            }
            case Opcode.cmp: {
                var dstReg = (this.memory[this.pc] >> 2) & 0x3;
                var srcReg = (this.memory[this.pc] >> 0) & 0x3;
                var value = this.registers[dstReg] - this.registers[srcReg];
                this.flags[0] = value === 0 ? this.flags[0] | 1 : this.flags[0] & ~1;
                this.debug({ dstReg: dstReg, srcReg: srcReg });
                this.pc += 1;
                return 1;
            }
            case Opcode.sys: {
                var op = this.memory[this.pc] & 0xF;
                if (op === SysCall.write) {
                    var address = this.registers[Register.A.value];
                    var length_1 = this.registers[Register.B.value];
                    var string_1 = this.memory
                        .slice(address, address + length_1)
                        .reduce(function (array, charCode) { return __spreadArray(__spreadArray([], array, true), [String.fromCharCode(charCode)], false); }, [])
                        .join('');
                    this.registers[Register.A.value] = 0;
                    this.debug({ op: SysCall[op], address: address, length: length_1 });
                    console.log(string_1);
                }
                else if (op === SysCall.dump) {
                    this.debug({ op: SysCall[op] });
                    console.log(this.memory);
                }
                else {
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
    };
    Machine.prototype.start = function (pc) {
        console.log('OP\tOPERANDS\t\t\t\t\tPC\tREGISTERS\tZ');
        console.log('======= =============== =============== =============== ======= =============== =====');
        this.pc = pc;
        var jump = this.decode();
        while (jump > 0) {
            jump = this.decode();
        }
    };
    return Machine;
}());
var machine = new Machine(instructions2);
machine.start(15);
