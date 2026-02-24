import { prisma } from "~/server/utils/prisma"

export default defineEventHandler(async () => {
  return prisma.education.findMany({
    orderBy: [{ order: "asc" }, { updatedAt: "desc" }],
  })
})