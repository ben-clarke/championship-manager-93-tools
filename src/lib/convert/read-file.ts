import { promises as fs } from "fs";

export async function readFile<T>(
  fileName: string,
  constructor: { fromBuffer: (buffer: Buffer) => T; getSize: () => number },
  seekTo: number = 0,
  count: number = 0,
): Promise<T[]> {
  const fileBuffer = await fs.readFile(fileName);
  const ret: T[] = [];

  const objSize = constructor.getSize();
  let offset = seekTo;
  let counter = 0;

  while (offset + objSize <= fileBuffer.length) {
    if (count !== 0 && counter >= count) break;

    const bytes = fileBuffer.slice(offset, offset + objSize);
    if (bytes.length === 0) break;

    const obj = constructor.fromBuffer(bytes);
    ret.push(obj);

    offset += objSize;
    counter += 1;
  }

  return ret;
}

export function getText(bytes: Uint8Array): string {
  const index = bytes.indexOf(0);
  const buffer = Buffer.from(bytes);
  if (index !== -1) return buffer.toString("ascii", 0, index);

  return buffer.toString("ascii");
}
