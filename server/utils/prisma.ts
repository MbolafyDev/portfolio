import { PrismaClient } from "~/generated/prisma/index.js"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"

declare global {
  // eslint-disable-next-line no-var
  var __prisma__: PrismaClient | undefined
}

function makeClient() {
  const url = process.env.DATABASE_URL || ""

  // DEV sqlite : DATABASE_URL="file:./prisma/dev.db"
  if (url.startsWith("file:")) {
    const adapter = new PrismaBetterSqlite3({
      url, // accepte file:...
    })
    return new PrismaClient({ adapter })
  }

  // PROD postgres : postgresql://...
  const adapter = new PrismaPg({
    connectionString: url,
  })
  return new PrismaClient({ adapter })
}

export const prisma = globalThis.__prisma__ || makeClient()

if (process.env.NODE_ENV !== "production") globalThis.__prisma__ = prisma