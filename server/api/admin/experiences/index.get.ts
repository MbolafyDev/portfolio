import { prisma } from "~/server/utils/prisma"
import { requireAdminBypass } from "~/server/utils/requireAdminBypass"

export default defineEventHandler(async (event) => {
  requireAdminBypass(event)

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