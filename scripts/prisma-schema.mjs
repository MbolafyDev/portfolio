// scripts/prisma-schema.mjs
import fs from "node:fs"
import path from "node:path"

const isProd = process.env.NODE_ENV === "production"

// source schemas
const src = isProd
  ? "prisma/schema.prod.prisma"
  : "prisma/schema.dev.prisma"

// destination schema prisma CLI
const dest = "prisma/schema.prisma"

fs.copyFileSync(path.resolve(src), path.resolve(dest))

console.log(`Prisma schema selected: ${src}`)
console.log(`Copied to: ${dest}`)