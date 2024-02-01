import * as fs from "fs";
import { resolve } from "path";

export const createBackups = (directory: string, filepath: string, filename: string): void => {
  const backupDirectory = resolve(directory, BACKUP_DIR);

  // Create backup directory if necessary
  if (!fs.existsSync(backupDirectory)) fs.mkdirSync(backupDirectory);

  rotateBackups(backupDirectory, filename);
  createLatestBackup(backupDirectory, filepath, filename);
};

const rotateBackups = (backupDirectory: string, filename: string): void => {
  const items = fs.readdirSync(backupDirectory);
  const filtered = items.filter((item) => item.startsWith(filename)).sort(sortStrings);

  filtered.forEach((item) => {
    const parts = item.split(".");
    const num = parts.pop() as string;
    const updated = parseInt(num, 10) + 1;

    if (updated > MAX_BACKUPS) return;

    fs.copyFileSync(
      resolve(backupDirectory, item),
      resolve(backupDirectory, `${filename}.${updated}`),
    );
  });
};

const createLatestBackup = (backupDirectory: string, filepath: string, filename: string): void => {
  fs.copyFileSync(filepath, resolve(backupDirectory, `${filename}.1`));
};

const BACKUP_DIR = "backups";
const MAX_BACKUPS = 10;

const sortStrings = (b: string, a: string): number => {
  if (a.endsWith(".10")) return 1;
  return a.localeCompare(b);
};
