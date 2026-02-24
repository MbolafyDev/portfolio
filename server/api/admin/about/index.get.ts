// server/api/admin/about/index.get.js
import { prisma } from "~/server/utils/prisma"
import { requireAdminBypass } from "~/server/utils/requireAdminBypass"
import { setHeader } from "h3"

export default defineEventHandler(async (event) => {
  requireAdminBypass(event)

  // ✅ évite cache admin
  setHeader(event, "Cache-Control", "no-store")

  const item = await prisma.about.findFirst({
    orderBy: { updatedAt: "desc" },
  })

  return item ?? { id: 0, title: "À propos", description: "", updatedAt: new Date() }
})