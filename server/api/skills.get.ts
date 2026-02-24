// server/api/skills.get.ts
import { prisma } from "~/server/utils/prisma"

export default defineEventHandler(async () => {
  const items = await prisma.skill.findMany({
    orderBy: [{ order: "asc" }, { updatedAt: "desc" }],
  })
  return items
})