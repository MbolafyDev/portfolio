import { prisma } from "~/server/utils/prisma"

export default defineEventHandler(async () => {
  const items = await prisma.experience.findMany({
    orderBy: [{ order: "asc" }, { updatedAt: "desc" }],
  })

  return items.map((x) => ({ ...x, points: safeJsonArray(x.pointsJson) }))
})

function safeJsonArray(v: string) {
  try {
    const x = JSON.parse(v || "[]")
    return Array.isArray(x) ? x : []
  } catch {
    return []
  }
}