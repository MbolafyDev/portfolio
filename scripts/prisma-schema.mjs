import fs from "node:fs"

const isProd = process.env.VERCEL === "1" || process.env.NODE_ENV === "production"
const src = isProd ? "prisma/schema.prod.prisma" : "prisma/schema.dev.prisma"

fs.copyFileSync(src, "prisma/schema.prisma")
console.log("Prisma schema selected:", src)