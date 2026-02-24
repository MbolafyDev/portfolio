import { prisma } from "~/server/utils/prisma"
import { requireAdminBypass } from "~/server/utils/requireAdminBypass"
import { getRouterParam, createError } from "h3"

export default defineEventHandler(async (event) => {
  requireAdminBypass(event)

  const id = Number(getRouterParam(event, "id") || 0)
  if (!id) throw createError({ statusCode: 400, statusMessage: "id invalide" })

  const item = await prisma.experience.findUnique({ where: { id } })
  if (!item) throw createError({ statusCode: 404, statusMessage: "Expérience introuvable" })

  return { ...item, points: safeJsonArray(item.pointsJson) }
})

function safeJsonArray(v: string) {
  try {
    const x = JSON.parse(v || "[]")
    return Array.isArray(x) ? x : []
  } catch {
    return []
  }
}