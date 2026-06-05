import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const distDir = path.join(projectRoot, "dist");

const files = [
    {
        src: path.join(projectRoot, "src/style/generated/tokens.css"),
        dest: path.join(distDir, "tokens.css")
    },
    {
        src: path.join(projectRoot, "src/style/generated/theme.css"),
        dest: path.join(distDir, "theme.css")
    },
    {
        // CommonJS flavor of the type declarations — under "type": "module",
        // TypeScript treats index.d.ts as ESM-only, so require() consumers
        // (moduleResolution node16/nodenext) need an index.d.cts.
        src: path.join(distDir, "index.d.ts"),
        dest: path.join(distDir, "index.d.cts")
    }
];

await mkdir(distDir, { recursive: true });

for (const file of files) {
    await copyFile(file.src, file.dest);
    console.log(`Copied ${file.src} -> ${file.dest}`);
}
