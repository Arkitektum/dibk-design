import { access, copyFile, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const distDir = path.join(projectRoot, "dist");

const fontFaceStylesheet = path.join(projectRoot, "src/style/base/_fonts.scss");
const fontSourceDir = path.join(projectRoot, "src/assets/fonts");
const fontDistDir = path.join(distDir, "fonts");
const fontStylesheetDist = path.join(distDir, "fonts.css");
const componentStylesheet = path.join(distDir, "dibk-design.css");
const fontStylesheetImport = '@import "./fonts.css";';

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

// Fonts are emitted as separate files rather than left to Vite: library mode
// inlines every asset as base64 regardless of assetsInlineLimit, which put the
// same ~700 kB of font data in both dibk-design.css and the JS bundles.
const writeFontStylesheet = async () => {
    const source = await readFile(fontFaceStylesheet, "utf8");

    // The stylesheet is copied verbatim apart from the url()s, so the source has
    // to stay plain CSS — anything needing the Sass compiler would ship broken.
    const scssSyntax = source.match(/@(?:use|forward|import|mixin|include|extend)\b|\$[\w-]+|#\{/);
    if (scssSyntax) {
        throw new Error(`${fontFaceStylesheet} uses SCSS syntax ("${scssSyntax[0]}") — it must stay plain CSS to be emitted as dist/fonts.css`);
    }

    const css = source
        // "//" comments are valid SCSS but not valid CSS
        .split("\n")
        .filter((line) => !line.trimStart().startsWith("//"))
        .join("\n")
        .replace(/url\((["']?)[^)"']*\/assets\/fonts\//g, "url($1./fonts/");

    const referenced = [...css.matchAll(/url\(["']?\.\/fonts\/([^)"']+)["']?\)/g)].map((match) => match[1]);
    if (!referenced.length) {
        throw new Error(`No font files referenced in ${fontFaceStylesheet} — check the url() paths`);
    }

    await mkdir(fontDistDir, { recursive: true });
    for (const fileName of new Set(referenced)) {
        const src = path.join(fontSourceDir, fileName);
        await access(src).catch(() => {
            throw new Error(`${fontFaceStylesheet} references ${fileName}, which does not exist in ${fontSourceDir}`);
        });
        await copyFile(src, path.join(fontDistDir, fileName));
    }

    await writeFile(fontStylesheetDist, `${css.trim()}\n`);
    console.log(`Wrote ${fontStylesheetDist} (${new Set(referenced).size} font files -> ${fontDistDir})`);

    const unreferenced = (await readdir(fontSourceDir)).filter((fileName) => !referenced.includes(fileName));
    if (unreferenced.length) {
        console.log(`Note: ${unreferenced.length} font file(s) in ${fontSourceDir} are not referenced and were not copied: ${unreferenced.join(", ")}`);
    }
};

// Keeps `@import "dibk-design/dibk-design.css"` self-sufficient for consumers,
// now pulling the fonts in as cacheable files instead of inline base64.
const linkFontStylesheet = async () => {
    const css = await readFile(componentStylesheet, "utf8");
    if (css.startsWith(fontStylesheetImport)) return;
    await writeFile(componentStylesheet, `${fontStylesheetImport}\n${css}`);
    console.log(`Prepended ${fontStylesheetImport} to ${componentStylesheet}`);
};

await writeFontStylesheet();
await linkFontStylesheet();
