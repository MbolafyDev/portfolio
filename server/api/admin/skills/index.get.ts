// server/api/admin/skills/index.get.ts
import { prisma } from "~/server/utils/prisma"
import { requireAdminBypass } from "~/server/utils/requireAdminBypass"

export default defineEventHandler(async (event) => {
  requireAdminBypass(event)

  const items = await prisma.skill.findMany({
    orderBy: [{ order: "asc" }, { updatedAt: "desc" }],
  })

  return items
})