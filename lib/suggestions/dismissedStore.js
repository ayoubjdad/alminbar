import fs from "fs";
import path from "path";

const DISMISSED_PATH = path.join(
  process.cwd(),
  "data",
  "suggestions-dismissed.json",
);

export function readDismissedKeys() {
  try {
    if (!fs.existsSync(DISMISSED_PATH)) return [];
    const raw = JSON.parse(fs.readFileSync(DISMISSED_PATH, "utf8"));
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

export function writeDismissedKeys(keys) {
  fs.mkdirSync(path.dirname(DISMISSED_PATH), { recursive: true });
  fs.writeFileSync(DISMISSED_PATH, JSON.stringify(keys, null, 2), "utf8");
}

/** لا يُكرّر المفتاح */
export function appendDismissedKey(key) {
  if (!key || typeof key !== "string") return;
  const keys = readDismissedKeys();
  if (keys.includes(key)) return;
  keys.push(key);
  writeDismissedKeys(keys);
}
