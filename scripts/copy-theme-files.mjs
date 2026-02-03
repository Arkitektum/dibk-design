import { mkdir, copyFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const distDir = path.join(projectRoot, "dist");

const files = [
  {
    src: path.join(projectRoot, "src/style/generated/tokens.css"),
    dest: path.join(distDir, "tokens.css"),
  },
  {
    src: path.join(projectRoot, "src/style/generated/theme.css"),
    dest: path.join(distDir, "theme.css"),
  },
];

await mkdir(distDir, { recursive: true });

for (const file of files) {
  await copyFile(file.src, file.dest);
  console.log(`Copied ${file.src} -> ${file.dest}`);
}
