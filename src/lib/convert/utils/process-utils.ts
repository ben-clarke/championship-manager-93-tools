import * as fs from "fs";

export const replace = (key: string, details: Details[], nameTuples: NameTuple[]): Details[] =>
  details.map((d) => {
    const [updated] = nameTuples.find(([, current]) => d[key as keyof Details] === current) || [
      "",
      "",
    ];
    if (updated) return { ...d, [key]: updated };
    return d;
  });

export const storeExe = (hex: string, filename: string): void => {
  const byteArray = new Uint8Array(hex.length / 2);
  for (let i = 0; i < byteArray.length; i += 1) {
    byteArray[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  fs.writeFileSync(filename, byteArray);
};

export interface Details {
  Club: string;
  Ground: string;
  Nationality: string;
  "First name": string;
  Surname: string;
  "Non domestic club": string;
}

export type NameTuple = [string, string];
