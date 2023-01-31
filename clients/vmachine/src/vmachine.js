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
        movm: 1,
        movi: 2,
        add: 3,
        jmp: 4,
        cmp: 5,
        sys: 6
    };
    Opcode2.Names = {};
    Opcode2.hlt = new Opcode2(Opcode2.Values.hlt);
    Opcode2.mov = new Opcode2(Opcode2.Values.mov);
    Opcode2.movm = new Opcode2(Opcode2.Values.movm);
    Opcode2.movi = new Opcode2(Opcode2.Values.movi);
    Opcode2.add = new Opcode2(Opcode2.Values.add);
    Opcode2.jmp = new Opcode2(Opcode2.Values.jmp);
    Opcode2.cmp = new Opcode2(Opcode2.Values.cmp);
    Opcode2.sys = new Opcode2(Opcode2.Values.sys);
    return Opcode2;
}());
var Opcode;
(function (Opcode) {
    Opcode[Opcode["hlt"] = 0] = "hlt";
    Opcode[Opcode["mov"] = 2] = "mov";
    Opcode[Opcode["add"] = 4] = "add";
    Opcode[Opcode["sub"] = 6] = "sub";
    Opcode[Opcode["inc"] = 8] = "inc";
    Opcode[Opcode["dec"] = 10] = "dec";
    Opcode[Opcode["cmp"] = 12] = "cmp";
    Opcode[Opcode["sys"] = 14] = "sys";
    Opcode[Opcode["movr"] = 1] = "movr";
    Opcode[Opcode["movi"] = 3] = "movi";
    Opcode[Opcode["movm"] = 5] = "movm";
    Opcode[Opcode["addi"] = 7] = "addi";
    Opcode[Opcode["subi"] = 9] = "subi";
    Opcode[Opcode["cmpi"] = 11] = "cmpi";
    Opcode[Opcode["jmpa"] = 13] = "jmpa";
    // jlt  /* odd  */ = 0x0F,
})(Opcode || (Opcode = {}));
var JmpOp;
(function (JmpOp) {
    JmpOp[JmpOp["always"] = 0] = "always";
    JmpOp[JmpOp["eq"] = 1] = "eq";
})(JmpOp || (JmpOp = {}));
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
function hlt() {
    return [Opcode.hlt << 4];
}
function add(dstReg, srcReg) {
    return [(Opcode.add << 4) | (dstReg.value << 2) | srcReg.value];
}
function jmp(srcAddr) {
    return [(Opcode.jmpa << 4) | JmpOp.always, srcAddr.value];
}
function jeq(srcAddr) {
    return [(Opcode.jmpa << 4) | JmpOp.eq, srcAddr];
}
function cmp(srcReg1, srcReg2) {
    return [(Opcode.cmp << 4) | (srcReg1.value << 2) | srcReg2.value];
}
function sys(op) {
    return [(Opcode.sys << 4) | op];
}
function string(string) {
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
            _this.memory[index] = byte;
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
            case (Opcode.jmpa << 4) | JmpOp.always: {
                var srcAddr = this.memory[this.pc + 1];
                return this.pc = srcAddr;
            }
            case (Opcode.jmpa << 4) | JmpOp.eq: {
                var srcAddr = this.memory[this.pc + 1];
                if ((this.flags[0] >> 0) & 0x10) {
                    return this.pc = srcAddr;
                }
                else {
                    return this.pc += 2;
                }
            }
        }
        switch (opCode) {
            case Opcode.movi: {
                var dstReg = this.memory[this.pc] & 0xF;
                var srcValue = this.memory[this.pc + 1];
                this.registers[dstReg] = srcValue;
                this.debug({ dstReg: Register.Names[dstReg], srcValue: srcValue });
                return this.pc += 2;
            }
            case Opcode.movr: {
                var dstReg = this.memory[this.pc] & 0xF;
                var srcAddr = this.memory[this.pc + 1];
                this.registers[dstReg] = this.memory[srcAddr];
                this.debug({ dstReg: dstReg, srcAddr: srcAddr });
                return this.pc += 2;
            }
            case Opcode.movm: {
                var srcReg = this.memory[this.pc] & 0xF;
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
                this.flags[0] = (this.flags[0] & ~1);
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
                this.debug({});
                return 0;
            }
            default: {
                console.log('Illegal operation');
                return 0;
            }
        }
    };
    Machine.prototype.start = function (pc) {
        console.log('OP      OPERANDS                                        PC      REGISTERS       C  Z');
        console.log('======= =============== =============== =============== ======= =============== ====');
        this.pc = pc;
        for (var opCode = this.decode(); opCode !== Opcode.hlt; opCode = this.decode()) {
            opCode = this.decode();
            this.execute(opCode);
        }
        ;
        console.log();
    };
    return Machine;
}());
var instructions2 = [
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
    // mov(new Address(0), Register.A),
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
var machine = new Machine(instructions2);
machine.start(13);
machine.start(19);
machine.start(35);
