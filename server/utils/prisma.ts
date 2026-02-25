// server/utils/prisma.ts
import { PrismaClient } from "~/generated/prisma/index.js"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"
import fs from "node:fs"
import path from "node:path"

declare global {
  // eslint-disable-next-line no-var
  var __prisma__: PrismaClient | undefined
}

function ensureSqliteDirExists(fileUrl: string) {
  let p = fileUrl.replace(/^file:/, "").replace(/^\/+/, "")
  const absPath = path.isAbsolute(p) ? p : path.resolve(process.cwd(), p)
  fs.mkdirSync(path.dirname(absPath), { recursive: true })
  return `file:${absPath}`
}

function makeClient() {
  const isProd = process.env.NODE_ENV === "production"

  // ✅ DEV => SQLite (tu peux choisir le chemin)
  if (!isProd) {
    const devUrl = process.env.DEV_DATABASE_URL || "file:./prisma/dev.db"
    const normalizedUrl = ensureSqliteDirExists(devUrl)
    console.log("🟢 Prisma: DEV (SQLite)", normalizedUrl)

    const adapter = new PrismaBetterSqlite3({ url: normalizedUrl })
    return new PrismaClient({ adapter })
  }

  // ✅ PROD => Postgres
  const url = process.env.DATABASE_URL || ""
  if (!url) throw new Error("DATABASE_URL manquant en production.")
  console.log("🔵 Prisma: PROD (PostgreSQL)", url.split("?")[0])

  const adapter = new PrismaPg({ connectionString: url })
  return new PrismaClient({ adapter })
}

export const prisma = globalThis.__prisma__ || makeClient()
if (process.env.NODE_ENV !== "production") globalThis.__prisma__ = prisma