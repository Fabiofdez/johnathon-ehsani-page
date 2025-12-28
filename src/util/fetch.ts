import { readFileSync } from "fs";
import path from "path";

export function localFetch(relativePath: string) {
  const filePath = path.join(process.cwd(), `public/${relativePath}`);
  return readFileSync(filePath, "utf8");
}
