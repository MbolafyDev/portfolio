import { prisma } from "~/server/utils/prisma"

export default defineEventHandler(async () => {
  const items = await prisma.projet.findMany({
    orderBy: [{ order: "asc" }, { updatedAt: "desc" }],
  })

  return items.map((p) => ({ ...p, tech: safeJsonArray(p.techJson) }))
})

function safeJsonArray(v: string) {
  try {
    const x = JSON.parse(v || "[]")
    return Array.isArray(x) ? x : []
  } catch {
    return []
  }
}