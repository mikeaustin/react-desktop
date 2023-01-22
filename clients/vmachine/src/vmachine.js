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
    function Register(index) {
        this.index = index;
    }
    Register.A = new Register(0);
    Register.B = new Register(1);
    return Register;
}());
var Address = /** @class */ (function () {
    function Address(index) {
        this.index = index;
    }
    return Address;
}());
var Opcode;
(function (Opcode) {
    Opcode[Opcode["mov"] = 0] = "mov";
    Opcode[Opcode["mova"] = 1] = "mova";
    Opcode[Opcode["movi"] = 2] = "movi";
    Opcode[Opcode["add"] = 3] = "add";
    Opcode[Opcode["sys"] = 4] = "sys";
    Opcode[Opcode["hlt"] = 5] = "hlt";
    Opcode[Opcode["nop"] = 6] = "nop";
})(Opcode || (Opcode = {}));
var SysCall;
(function (SysCall) {
    SysCall[SysCall["write"] = 1] = "write";
})(SysCall || (SysCall = {}));
function mov(dst, src) {
    if (dst instanceof Register && src instanceof Address) {
        return [(Opcode.mov << 4) | dst.index, src.index];
    }
    else if (dst instanceof Address && src instanceof Register) {
        return [(Opcode.mova << 4) | dst.index, src.index];
    }
    else if (dst instanceof Register && typeof src === 'number') {
        return [(Opcode.movi << 4) | dst.index, src];
    }
    return [];
}
function add(srcReg1, srcReg2) {
    return [(Opcode.add << 4) | (srcReg1.index << 2) | srcReg2.index];
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
    mov(Register.A, new Address(11)),
    mov(Register.B, 13),
    sys(SysCall.write),
    mov(Register.A, 2),
    mov(Register.B, 3),
    add(Register.A, Register.B),
    hlt(),
    string('Hello, world.'),
];
var Machine = /** @class */ (function () {
    function Machine(instructions) {
        var _this = this;
        this.registers = new Uint8Array(new ArrayBuffer(4));
        this.memory = new Uint8Array(new ArrayBuffer(256));
        this.pc = new Address(0);
        instructions.flat().forEach(function (byte, index) {
            _this.memory[index] = byte;
        });
    }
    Machine.prototype.decode = function () {
        var opCode = this.memory[this.pc.index] >> 4;
        switch (opCode) {
            case Opcode.mov: {
                var dstReg = this.memory[this.pc.index] & 0xF;
                var srcMem = this.memory[this.pc.index + 1];
                this.registers[dstReg] = srcMem;
                console.log(Opcode[opCode], '\tdstReg1 ' + dstReg, '\tsrcMem1 ' + srcMem, '\t\t\t' + this.pc.index, '\t' + this.registers.join(', '));
                return this.pc.index += 2;
            }
            case Opcode.movi: {
                var dstReg = this.memory[this.pc.index] & 0xF;
                var srcVal = this.memory[this.pc.index + 1];
                this.registers[dstReg] = srcVal;
                console.log(Opcode[opCode], '\tdstReg1 ' + dstReg, '\tsrcVal1 ' + srcVal, '\t\t\t' + this.pc.index, '\t' + this.registers.join(', '));
                return this.pc.index += 2;
            }
            case Opcode.add: {
                var dstReg = (this.memory[this.pc.index] >> 2) & 0x3;
                var srcReg = this.memory[this.pc.index] & 0x3;
                this.registers[dstReg] += this.registers[srcReg];
                console.log(Opcode[opCode], '\tdstReg1 ' + dstReg, '\tsrcReg2 ' + srcReg, '\t\t\t' + this.pc.index, '\t' + this.registers.join(', '));
                return this.pc.index += 1;
            }
            case Opcode.sys: {
                var op = this.memory[this.pc.index] & 0xF;
                if (op === SysCall.write) {
                    var address = this.registers[Register.A.index];
                    var length_1 = this.registers[Register.B.index];
                    var string_1 = this.memory
                        .slice(address, address + length_1)
                        .reduce(function (array, charCode) { return __spreadArray(__spreadArray([], array, true), [String.fromCharCode(charCode)], false); }, [])
                        .join('');
                    console.log(Opcode[opCode], '\top', SysCall[op], '\taddrres ' + address, '\tlength ' + length_1, '\t' + this.pc.index, '\t' + this.registers.join(', '));
                    console.log(string_1);
                }
                else {
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
    };
    Machine.prototype.start = function () {
        console.log(this.memory);
        console.log('OP\tOPERANDS\t\t\t\t\tPC\tREGISTERS');
        console.log('======= =============== =============== =============== ======= ============');
        var jump = this.decode();
        while (jump > 0) {
            jump = this.decode();
        }
    };
    return Machine;
}());
var machine = new Machine(instructions2);
machine.start();
