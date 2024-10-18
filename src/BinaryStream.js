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
	/**
	 * Keeps the binary data
	 * @type {Buffer}
	 */
	buffer;
	/**
	 * Counts how many bytes to skip when reading the stream
	 * @type {Number}
	 */
	readerOffset;
	/**
	 * Counts how many bytes to skip when writing to the stream
	 * @type {Number}
	 */
	writerOffset;
	/**
	 * Counts how many bytes are in the stream
	 * @type {Number}
	 */
	length;
	
	/**
	 * Initializes a new stream
	 * @param {Buffer} buffer 
	 * @param {number} offset 
	 */
	constructor(buffer = Buffer.allocUnsafe(0), readerOffset = 0, writerOffset = 0, length = -1) {
		const bufferLen = buffer.length;
		this.length = length < 0 || length > bufferLen ? bufferLen : length;
		this.buffer = this.length !== bufferLen ? buffer.slice(0, this.length) : buffer;
		this.readerOffset = readerOffset;
		this.writerOffset = writerOffset;
	}

	/**
	 * Resets the stream to its original state
	 */
	reset() {
		this.buffer = Buffer.allocUnsafe(0);
		this.readerOffset = 0;
		this.writerOffset = 0;
	}

	/**
	 * Check if the stream ended
	 * @returns boolean
	 */
	feos() {
		return (this.readerOffset < this.length) ? false : true;
	}

	/**
	 * Resizes the stream to the appropriate size
	 * @param {Number} sizeToAdd
	 */
	resize(sizeToAdd) {
		const bufferLen = this.buffer.length;
		const newSize = this.writerOffset + sizeToAdd;
		this.length += sizeToAdd;
		if (newSize > bufferLen) {
			let buf = Buffer.allocUnsafe(Math.max(bufferLen * 2, newSize));
			this.buffer.copy(buf);
			this.buffer = buf;
		}
	}

	/**
	 * Reads an ammount of bytes from the stream
	 * @param {Number} length
	 */
	read(length) {
		let buf = this.buffer.slice(this.readerOffset, this.readerOffset + length);
		this.readerOffset += length;
		return buf;
	}

	/**
	 * Writes a buffer to the stream
	 * @param {Buffer} buf 
	 */
	write(buf, length = -1) {
		let copyLength = length == -1 ? buf.length : length;
		this.resize(copyLength);
		buf.copy(this.buffer, this.writerOffset, 0, copyLength);
		this.writerOffset += copyLength;
	}

	/**
	 * Reads an unsigned 8bit integer from the stream
	 * @returns number
	 */
	readUnsignedByte() {
		return this.buffer.readUInt8(this.readerOffset++);
	}

	/**
	 * Writes an unsigned 8bit integer to the stream
	 * @param {number} value 
	 */
	writeUnsignedByte(value) {
		this.resize(1);
		this.buffer.writeUInt8(value, this.writerOffset++);
	}

	/**
	 * Reads a signed 8bit integer from the stream
	 * @returns number
	 */
	readByte() {
		return this.buffer.readInt8(this.readerOffset++);
	}

	/**
	 * Writes a signed 8bit integer to the stream
	 * @param {number} value
	 */
	writeByte(value) {
		this.resize(1);
		this.buffer.writeInt8(value, this.writerOffset++);
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
		let value = this.buffer.readUInt16BE(this.readerOffset);
		this.readerOffset += 2;
		return value;
	}

	/**
	 * Writes an unsigned 16bit big endian integer to the stream
	 * @param {number} value 
	 */
	writeUnsignedShortBE(value) {
		this.resize(2);
		this.buffer.writeUInt16BE(value, this.writerOffset);
		this.writerOffset += 2;
	}

	/**
	 * Reads a signed 16bit big endian integer from the stream
	 * @returns number
	 */
	readShortBE() {
		let value = this.buffer.readInt16BE(this.readerOffset);
		this.readerOffset += 2;
		return value;
	}

	/**
	 * Writes a signed 16bit big endian integer to the stream
	 * @param {number} value 
	 */
	writeShortBE(value) {
		this.resize(2);
		this.buffer.writeInt16BE(value, this.writerOffset);
		this.writerOffset += 2;
	}

	/**
	 * Reads an unsigned 16bit little endian integer from the stream
	 * @returns number
	 */
	readUnsignedShortLE() {
		let value = this.buffer.readUInt16LE(this.readerOffset);
		this.readerOffset += 2;
		return value;
	}

	/**
	 * Writes an unsigned 16bit little endian integer to the stream
	 * @param {number} value 
	 */
	writeUnsignedShortLE(value) {
		this.resize(2);
		this.buffer.writeUInt16LE(value, this.writerOffset);
		this.writerOffset += 2;
	}

	/**
	 * Reads a signed 16bit little endian integer from the stream
	 * @returns number
	 */
	readShortLE() {
		let value = this.buffer.readInt16LE(this.readerOffset);
		this.readerOffset += 2;
		return value;
	}

	/**
	 * Writes a signed 16bit little endian integer to the stream
	 * @param {number} value 
	 */
	writeShortLE(value) {
		this.resize(2);
		this.buffer.writeInt16LE(value, this.writerOffset);
		this.writerOffset += 2;
	}

	/**
	 * Reads an unsigned 24bit big endian integer from the stream
	 * @returns number
	 */
	readUnsignedTriadBE() {
		let value = this.buffer.readUIntBE(this.readerOffset, 3);
		this.readerOffset += 3;
		return value;
	}

	/**
	 * Writes an unsigned 24bit big endian integer to the stream
	 * @param {number} value 
	 */
	writeUnsignedTriadBE(value) {
		this.resize(3);
		this.buffer.writeUIntBE(value, this.writerOffset, 3);
		this.writerOffset += 3;
	}

	/**
	 * Reads a signed 24bit big endian integer from the stream
	 * @returns number
	 */
	readTriadBE() {
		let value = this.buffer.readIntBE(this.readerOffset, 3);
		this.readerOffset += 3;
		return value;
	}

	/**
	 * Writes a signed 24bit big endian integer to the stream
	 * @param {number} value 
	 */
	writeTriadBE(value) {
		this.resize(3);
		this.buffer.writeIntBE(value, this.writerOffset, 3);
		this.writerOffset += 3;
	}

	/**
	 * Reads an unsigned 24bit little endian integer from the stream
	 * @returns number
	 */
	readUnsignedTriadLE() {
		let value = this.buffer.readUIntLE(this.readerOffset, 3);
		this.readerOffset += 3;
		return value;
	}

	/**
	 * Writes an unsigned 24bit little endian integer to the stream
	 * @param {number} value 
	 */
	writeUnsignedTriadLE(value) {
		this.resize(3);
		this.buffer.writeUIntLE(value, this.writerOffset, 3);
		this.writerOffset += 3;
	}

	/**
	 * Reads a signed 24bit little endian integer from the stream
	 * @returns number
	 */
	readTriadLE() {
		let value = this.buffer.readIntLE(this.readerOffset, 3);
		this.readerOffset += 3;
		return value;
	}

	/**
	 * Writes a signed 24bit little endian integer to the stream
	 * @param {number} value 
	 */
	writeTriadLE(value) {
		this.resize(3);
		this.buffer.writeIntLE(value, this.writerOffset, 3);
		this.writerOffset += 3;
	}

	/**
	 * Reads an unsigned 32bit big endian integer from the stream
	 * @returns number
	 */
	readUnsignedIntBE() {
		let value = this.buffer.readUInt32BE(this.readerOffset);
		this.readerOffset += 4;
		return value;
	}

	/**
	 * Writes an unsigned 32bit big endian integer to the stream
	 * @param {number} value 
	 */
	writeUnsignedIntBE(value) {
		this.resize(4);
		this.buffer.writeUInt32BE(value, this.writerOffset);
		this.writerOffset += 4;
	}

	/**
	 * Reads a signed 32bit big endian integer from the stream
	 * @returns number
	 */
	readIntBE() {
		let value = this.buffer.readInt32BE(this.readerOffset);
		this.readerOffset += 4;
		return value;
	}

	/**
	 * Writes a signed 32bit big endian integer to the stream
	 * @param {number} value 
	 */
	writeIntBE(value) {
		this.resize(4);
		this.buffer.writeInt32BE(value, this.writerOffset);
		this.writerOffset += 4;
	}

	/**
	 * Reads an unsigned 32bit little endian integer from the stream
	 * @returns number
	 */
	readUnsignedIntLE() {
		let value = this.buffer.readUInt32LE(this.readerOffset);
		this.readerOffset += 4;
		return value;
	}

	/**
	 * Writes an unsigned 32bit little endian integer to the stream
	 * @param {number} value 
	 */
	writeUnsignedIntLE(value) {
		this.resize(4);
		this.buffer.writeUInt32LE(value, this.writerOffset);
		this.writerOffset += 4;
	}

	/**
	 * Reads a signed 32bit little endian integer from the stream
	 * @returns number
	 */
	readIntLE() {
		let value = this.buffer.readInt32LE(this.readerOffset);
		this.readerOffset += 4;
		return value;
	}

	/**
	 * Writes a signed 32bit little endian integer to the stream
	 * @param {number} value 
	 */
	writeIntLE(value) {
		this.resize(4);
		this.buffer.writeInt32LE(value, this.writerOffset);
		this.writerOffset += 4;
	}

	/**
	 * Reads an unsigned 64bit big endian integer from the stream
	 * @returns BigInt
	 */
	readUnsignedLongBE() {
		let value = this.buffer.readBigUInt64BE(this.readerOffset);
		this.readerOffset += 8;
		return value;
	}

	/**
	 * Writes an unsigned 64bit big endian integer to the stream
	 * @param {BigInt} value 
	 */
	writeUnsignedLongBE(value) {
		this.resize(8);
		this.buffer.writeBigUInt64BE(value, this.writerOffset);
		this.writerOffset += 8;
	}

	/**
	 * Reads a signed 64bit big endian integer from the stream
	 * @returns BigInt
	 */
	readLongBE() {
		let value = this.buffer.readBigInt64BE(this.readerOffset);
		this.readerOffset += 8;
		return value;
	}

	/**
	 * Writes a signed 64bit big endian integer to the stream
	 * @param {BigInt} value 
	 */
	writeLongBE(value) {
		this.resize(8);
		this.buffer.writeBigInt64BE(value, this.writerOffset);
		this.writerOffset += 8;
	}

	/**
	 * Reads an unsigned 64bit little endian integer from the stream
	 * @returns BigInt
	 */
	readUnsignedLongLE() {
		let value = this.buffer.readBigUInt64LE(this.readerOffset);
		this.readerOffset += 8;
		return value;
	}

	/**
	 * Writes an unsigned 64bit little endian integer to the stream
	 * @param {BigInt} value 
	 */
	writeUnsignedLongLE(value) {
		this.resize(8);
		this.buffer.writeBigUInt64LE(value, this.writerOffset);
		this.writerOffset += 8;
	}

	/**
	 * Reads a signed 64bit little endian integer from the stream
	 * @returns BigInt
	 */
	readLongLE() {
		let value = this.buffer.readBigInt64LE(this.readerOffset);
		this.readerOffset += 8;
		return value;
	}

	/**
	 * Writes a signed 64bit little endian integer to the stream
	 * @param {BigInt} value 
	 */
	writeLongLE(value) {
		this.resize(8);
		this.buffer.writeBigInt64LE(value, this.writerOffset);
		this.writerOffset += 8;
	}

	/**
	 * Reads a 32bit big endian floating point from the stream
	 * @returns number
	 */
	readFloatBE() {
		let value = this.buffer.readFloatBE(this.readerOffset);
		this.readerOffset += 4;
		return value;
	}

	/**
	 * Writes a 32bit big endian floating point to the stream
	 * @param {number} value 
	 */
	writeFloatBE(value) {
		this.resize(4);
		this.buffer.writeFloatBE(value, this.writerOffset);
		this.writerOffset += 4;
	}

	/**
	 * Reads a 32bit little endian floating point from the stream
	 * @returns number
	 */
	readFloatLE() {
		let value = this.buffer.readFloatLE(this.readerOffset);
		this.readerOffset += 4;
		return value;
	}

	/**
	 * Writes a 32bit little endian floating point to the stream
	 * @param {number} value 
	 */
	writeFloatLE(value) {
		this.resize(4);
		this.buffer.writeFloatLE(value, this.writerOffset);
		this.writerOffset += 4;
	}

	/**
	 * Reads a 64bit big endian floating point from the stream
	 * @returns number
	 */
	readDoubleBE() {
		let value = this.buffer.readDoubleBE(this.readerOffset);
		this.readerOffset += 8;
		return value;
	}

	/**
	 * Writes a 64bit big endian floating point to the stream
	 * @param {number} value 
	 */
	writeDoubleBE(value) {
		this.resize(8);
		this.buffer.writeDoubleBE(value, this.writerOffset);
		this.writerOffset += 8;
	}

	/**
	 * Reads a 64bit little endian floating point from the stream
	 * @returns number
	 */
	readDoubleLE() {
		let value = this.buffer.readDoubleLE(this.readerOffset);
		this.readerOffset += 8;
		return value;
	}

	/**
	 * Writes a 64bit little endian floating point to the stream
	 * @param {number} value 
	 */
	writeDoubleLE(value) {
		this.resize(8);
		this.buffer.writeDoubleLE(value, this.writerOffset);
		this.writerOffset += 8;
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
		let buf = this.buffer.slice(this.readerOffset, this.length);
		this.readerOffset = this.length;
		return buf;
	}
}

module.exports = BinaryStream;
