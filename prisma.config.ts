// prisma.config.ts
import "dotenv/config"
import { defineConfig } from "prisma/config"
import path from "node:path"
import fs from "node:fs"

function devSqliteUrl() {
  const abs = path.resolve(process.cwd(), "prisma", "dev.db")
  fs.mkdirSync(path.dirname(abs), { recursive: true })

  // Prisma attend file:C:/... (slashes)
  const normalized = abs.replace(/\\/g, "/")
  return `file:${normalized}`
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL?.trim()
      ? process.env.DATABASE_URL.trim()
      : devSqliteUrl(),
  },
})