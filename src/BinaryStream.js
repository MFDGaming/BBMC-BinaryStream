/******************************************\
 *  ____  _            ____  _         _  *
 * | __ )| |_   _  ___| __ )(_)_ __ __| | *
 * |  _ \| | | | |/ _ \  _ \| | '__/ _` | *
 * | |_) | | |_| |  __/ |_) | | | | (_| | *
 * |____/|_|\__,_|\___|____/|_|_|  \__,_| *
 *                                        *
 * This file is licensed under the GNU    *
 * General Public License 3. To use or    *
 * modify it you must accept the terms    *
 * of the license.                        *
 * ___________________________            *
 * \ @author BlueBirdMC Team /            *
\******************************************/

class BinaryStream {
	buffer;
	offset;
	
	/**
	 * Initializes a new stream
	 * @param {Buffer} buffer 
	 * @param {number} offset 
	 */
	constructor(buffer = Buffer.alloc(0), offset = 0) {
		this.buffer = buffer;
		this.offset = offset;
	}

	/**
	 * Resets the stream to its original state
	 */
	reset() {
		this.buffer = Buffer.alloc(0);
		this.offset = 0;
	}

	/**
	 * Sets the offset to the beginning of the stream
	 */
	rewind() {
		this.offset = 0;
	}

	/**
	 * Check if the stream ended
	 * @returns boolean
	 */
	feos() {
		return (this.offset < this.buffer.length) ? false : true;
	}

	/**
	 * Reads n bytes from the stream
	 * @param {number} size 
	 * @returns Buffer
	 */
	read(size) {
		this.offset += size;
		return this.buffer.slice(this.offset - size, this.offset);
	}

	/**
	 * Writes a buffer to the stream
	 * @param {Buffer} buffer 
	 */
	write(buffer) {
		this.buffer = Buffer.concat([this.buffer, buffer]);
	}

	/**
	 * Reads an unsigned 8bit integer from the stream
	 * @returns number
	 */
	readUnsignedByte() {
		return this.read(1).readUInt8(0);
	}

	/**
	 * Writes an unsigned 8bit integer to the stream
	 * @param {number} value 
	 */
	writeUnsignedByte(value) {
		let temp = Buffer.alloc(1);
		temp.writeUInt8(value, 0);
		this.write(temp);
	}

	/**
	 * Reads a signed 8bit integer from the stream
	 * @returns number
	 */
	readByte() {
		return this.read(1).readInt8(0);
	}

	/**
	 * Writes a signed 8bit integer to the stream
	 * @param {number} value
	 */
	writeByte(value) {
		let temp = Buffer.alloc(1);
		temp.writeInt8(value, 0);
		this.write(temp);
	}

	/**
	 * Reads a boolean from the stream
	 * @returns boolean
	 */
	readBool() {
		return this.readUnsignedByte() !== 0;
	}

	/**
	 * Writes a boolean to the stream
	 * @param {boolean} value
	 */
	writeBool(value) {
		this.writeUnsignedByte(value === true ? 1 : 0);
	}

	/**
	 * Reads an unsigned 16bit big endian integer from the stream
	 * @returns number
	 */
	readUnsignedShortBE() {
		return this.read(2).readUInt16BE(0);
	}

	/**
	 * Writes an unsigned 16bit big endian integer to the stream
	 * @param {number} value 
	 */
	writeUnsignedShortBE(value) {
		let temp = Buffer.alloc(2);
		temp.writeUInt16BE(value, 0);
		this.write(temp);
	}

	/**
	 * Reads a signed 16bit big endian integer from the stream
	 * @returns number
	 */
	readShortBE() {
		return this.read(2).readInt16BE(0);
	}

	/**
	 * Writes a signed 16bit big endian integer to the stream
	 * @param {number} value 
	 */
	writeShortBE(value) {
		let temp = Buffer.alloc(2);
		temp.writeInt16BE(value, 0);
		this.write(temp);
	}

	/**
	 * Reads an unsigned 16bit little endian integer from the stream
	 * @returns number
	 */
	readUnsignedShortLE() {
		return this.read(2).readUInt16LE(0);
	}

	/**
	 * Writes an unsigned 16bit little endian integer to the stream
	 * @param {number} value 
	 */
	writeUnsignedShortLE(value) {
		let temp = Buffer.alloc(2);
		temp.writeUInt16LE(value, 0);
		this.write(temp);
	}

	/**
	 * Reads a signed 16bit little endian integer from the stream
	 * @returns number
	 */
	readShortLE() {
		return this.read(2).readInt16LE(0);
	}

	/**
	 * Writes a signed 16bit little endian integer to the stream
	 * @param {number} value 
	 */
	writeShortLE(value) {
		let temp = Buffer.alloc(2);
		temp.writeInt16LE(value, 0);
		this.write(temp);
	}

	/**
	 * Reads an unsigned 24bit big endian integer from the stream
	 * @returns number
	 */
	readUnsignedTriadBE() {
		return this.read(3).readUIntBE(0, 3);
	}

	/**
	 * Writes an unsigned 24bit big endian integer to the stream
	 * @param {number} value 
	 */
	writeUnsignedTriadBE(value) {
		let temp = Buffer.alloc(3);
		temp.writeUIntBE(value, 0, 3);
		this.write(temp);
	}

	/**
	 * Reads a signed 24bit big endian integer from the stream
	 * @returns number
	 */
	readTriadBE() {
		return this.read(3).readIntBE(0, 3);
	}

	/**
	 * Writes a signed 24bit big endian integer to the stream
	 * @param {number} value 
	 */
	writeTriadBE(value) {
		let temp = Buffer.alloc(3);
		temp.writeIntBE(value, 0, 3);
		this.write(temp);
	}

	/**
	 * Reads an unsigned 24bit little endian integer from the stream
	 * @returns number
	 */
	readUnsignedTriadLE() {
		return this.read(3).readUIntLE(0, 3);
	}

	/**
	 * Writes an unsigned 24bit little endian integer to the stream
	 * @param {number} value 
	 */
	writeUnsignedTriadLE(value) {
		let temp = Buffer.alloc(3);
		temp.writeUIntLE(value, 0, 3);
		this.write(temp);
	}

	/**
	 * Reads a signed 24bit little endian integer from the stream
	 * @returns number
	 */
	readTriadLE() {
		return this.read(3).readIntLE(0, 3);
	}

	/**
	 * Writes a signed 24bit little endian integer to the stream
	 * @param {number} value 
	 */
	writeTriadLE(value) {
		let temp = Buffer.alloc(3);
		temp.writeIntLE(value, 0, 3);
		this.write(temp);
	}

	/**
	 * Reads an unsigned 32bit big endian integer from the stream
	 * @returns number
	 */
	readUnsignedIntBE() {
		return this.read(4).readUInt32BE(0);
	}

	/**
	 * Writes an unsigned 32bit big endian integer to the stream
	 * @param {number} value 
	 */
	writeUnsignedIntBE(value) {
		let temp = Buffer.alloc(4);
		temp.writeUInt32BE(value, 0);
		this.write(temp);
	}

	/**
	 * Reads a signed 32bit big endian integer from the stream
	 * @returns number
	 */
	readIntBE() {
		return this.read(4).readInt32BE(0);
	}

	/**
	 * Writes a signed 32bit big endian integer to the stream
	 * @param {number} value 
	 */
	writeIntBE(value) {
		let temp = Buffer.alloc(4);
		temp.writeInt32BE(value, 0);
		this.write(temp);
	}

	/**
	 * Reads an unsigned 32bit little endian integer from the stream
	 * @returns number
	 */
	readUnsignedIntLE() {
		return this.read(4).readUInt32LE(0);
	}

	/**
	 * Writes an unsigned 32bit little endian integer to the stream
	 * @param {number} value 
	 */
	writeUnsignedIntLE(value) {
		let temp = Buffer.alloc(4);
		temp.writeUInt32LE(value, 0);
		this.write(temp);
	}

	/**
	 * Reads a signed 32bit little endian integer from the stream
	 * @returns number
	 */
	readIntLE() {
		return this.read(4).readInt32LE(0);
	}

	/**
	 * Writes a signed 32bit little endian integer to the stream
	 * @param {number} value 
	 */
	writeIntLE(value) {
		let temp = Buffer.alloc(4);
		temp.writeInt32LE(value, 0);
		this.write(temp);
	}

	/**
	 * Reads an unsigned 64bit big endian integer from the stream
	 * @returns BigInt
	 */
	readUnsignedLongBE() {
		return this.read(8).readBigUInt64BE(0);
	}

	/**
	 * Writes an unsigned 64bit big endian integer to the stream
	 * @param {BigInt} value 
	 */
	writeUnsignedLongBE(value) {
		let temp = Buffer.alloc(8);
		temp.writeBigUInt64BE(value, 0);
		this.write(temp);
	}

	/**
	 * Reads a signed 64bit big endian integer from the stream
	 * @returns BigInt
	 */
	readLongBE() {
		return this.read(8).readBigInt64BE(0);
	}

	/**
	 * Writes a signed 64bit big endian integer to the stream
	 * @param {BigInt} value 
	 */
	writeLongBE(value) {
		let temp = Buffer.alloc(8);
		temp.writeBigInt64BE(value, 0);
		this.write(temp);
	}

	/**
	 * Reads an unsigned 64bit little endian integer from the stream
	 * @returns BigInt
	 */
	readUnsignedLongLE() {
		return this.read(8).readBigUInt64LE(0);
	}

	/**
	 * Writes an unsigned 64bit little endian integer to the stream
	 * @param {BigInt} value 
	 */
	writeUnsignedLongLE(value) {
		let temp = Buffer.alloc(8);
		temp.writeBigUInt64LE(value, 0);
		this.write(temp);
	}

	/**
	 * Reads a signed 64bit little endian integer from the stream
	 * @returns BigInt
	 */
	readLongLE() {
		return this.read(8).readBigInt64LE(0);
	}

	/**
	 * Writes a signed 64bit little endian integer to the stream
	 * @param {BigInt} value 
	 */
	writeLongLE(value) {
		let temp = Buffer.alloc(8);
		temp.writeBigInt64LE(value, 0);
		this.write(temp);
	}

	/**
	 * Reads a 32bit big endian floating point from the stream
	 * @returns number
	 */
	readFloatBE() {
		return this.read(4).readFloatBE(0);
	}

	/**
	 * Writes a 32bit big endian floating point to the stream
	 * @param {number} value 
	 */
	writeFloatBE(value) {
		let temp = Buffer.alloc(4);
		temp.writeFloatBE(value, 0);
		this.write(temp);
	}

	/**
	 * Reads a 32bit little endian floating point from the stream
	 * @returns number
	 */
	readFloatLE() {
		return this.read(4).readFloatLE(0);
	}

	/**
	 * Writes a 32bit little endian floating point to the stream
	 * @param {number} value 
	 */
	writeFloatLE(value) {
		let temp = Buffer.alloc(4);
		temp.writeFloatLE(value, 0);
		this.write(temp);
	}

	/**
	 * Reads a 64bit big endian floating point from the stream
	 * @returns number
	 */
	readDoubleBE() {
		return this.read(8).readDoubleBE(0);
	}

	/**
	 * Writes a 64bit big endian floating point to the stream
	 * @param {number} value 
	 */
	writeDoubleBE(value) {
		let temp = Buffer.alloc(8);
		temp.writeDoubleBE(value, 0);
		this.write(temp);
	}

	/**
	 * Reads a 64bit little endian floating point from the stream
	 * @returns number
	 */
	readDoubleLE() {
		return this.read(8).readDoubleLE(0);
	}

	/**
	 * Writes a 64bit little endian floating point to the stream
	 * @param {number} value 
	 */
	writeDoubleLE(value) {
		let temp = Buffer.alloc(8);
		temp.writeDoubleLE(value, 0);
		this.write(temp);
	}

	/**
	 * Reads an unsigned 32bit variable length integer from the stream
	 * @returns number
	 */
	readVarInt() {
		let value = 0;
		for (let i = 0; i < 35; i += 7) {
			if (this.feos() === true) {
				throw new Error("Unexpected end of stream");
			}
			let toRead = this.readUnsignedByte();
			value |= (toRead & 0x7f) << i;
			if ((toRead & 0x80) === 0) {
				return value >>> 0;
			}
		}
		throw new Error("VarInt is too big");
	}

	/**
	 * Writes an unsigned 32bit variable length integer to the stream
	 * @param {number} value
	 */
	writeVarInt(value) {
		value &= 0xffffffff;
		for (let i = 0; i < 5; ++i) {
			let toWrite = value & 0x7f;
			value >>>= 7;
			if (value !== 0) {
				this.writeUnsignedByte(toWrite | 0x80);
			} else {
				this.writeUnsignedByte(toWrite);
				break;
			}
		}
	}

	/**
	 * Reads a signed 32bit variable length integer from the stream
	 * @returns number
	 */
	readSignedVarInt() {
		let raw = this.readVarInt();
		return (raw >>> 1) ^ (-1 * (raw & 1));
	}

	/**
	 * Writes a signed 32bit variable length integer to the stream
	 * @param {number} value
	 */
	writeSignedVarInt(value) {
		this.writeVarInt(value >= 0 ? (value << 1) : (((-1 - value) << 1) | 1));
	}


	/**
	 * Reads an unsigned 64bit variable length integer from the stream
	 * @returns BigInt
	 */
	 readVarLong() {
		let value = 0n;
		for (let i = 0n; i < 70n; i += 7n) {
			if (this.feos() === true) {
				throw new Error("Unexpected end of stream");
			}
			let toRead = this.readUnsignedByte();
			value |= BigInt(toRead & 0x7f) << i;
			if ((toRead & 0x80) === 0) {
				if (value < 0n) {
					value += 18446744073709551616n;
				}
				return value;
			}
		}
		throw new Error("VarLong is too big");
	}

	/**
	 * Writes an unsigned 64bit variable length integer to the stream
	 * @param {BigInt} value
	 */
	writeVarLong(value) {
		value = BigInt(value);
		if (value < 0n) {
			value += 18446744073709551616n;
		}
		for (let i = 0; i < 10; ++i) {
			let toWrite = Number(value % 128n);
			value = value / 128n;
			if (value !== 0n) {
				this.writeUnsignedByte(toWrite | 0x80);
			} else {
				this.writeUnsignedByte(toWrite);
				break;
			}
		}
	}

	/**
	 * Reads a signed 64bit variable length integer from the stream
	 * @returns BigInt
	 */
	readSignedVarLong() {
		let raw = this.readVarLong();
		return (raw & 1n) ? ((-1n * (raw >> 1n)) - 1n) : (raw >> 1);
	}

	/**
	 * Writes a signed 64bit variable length integer to the stream
	 * @param {BigInt} value
	 */
	writeSignedVarLong(value) {
		value = BigInt(value);
		this.writeVarLong(value >= 0n ? (value << 1n) : (((-1n - value) << 1n) | 1n));
	}

	/**
	 * Reads all remaining bytes from the buffer
	 * @returns Buffer
	 */
	readRemaining() {
		return this.read(this.buffer.length - this.offset);
	}
}

module.exports = BinaryStream;
