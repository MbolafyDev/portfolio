import { prisma } from "~/server/utils/prisma"
import { requireAdminBypass } from "~/server/utils/requireAdminBypass"

export default defineEventHandler(async (event) => {
  requireAdminBypass(event)

  return prisma.education.findMany({
    orderBy: [{ order: "asc" }, { updatedAt: "desc" }],
  })
})