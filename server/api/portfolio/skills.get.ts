// server/api/portfolio/skills.get.ts
import { prisma } from "../../utils/prisma"

export default defineEventHandler(async () => {
  return prisma.skill.findMany({ orderBy: [{ order: "asc" }, { updatedAt: "desc" }] })
})