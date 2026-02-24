import { prisma } from "~/server/utils/prisma"
import { requireAdminBypass } from "~/server/utils/requireAdminBypass"
import { getRouterParam, readBody, createError } from "h3"

export default defineEventHandler(async (event) => {
  requireAdminBypass(event)

  const id = Number(getRouterParam(event, "id") || 0)
  if (!id) throw createError({ statusCode: 400, statusMessage: "id invalide" })

  const body = await readBody(event)

  const company = String(body?.company || "").trim()
  const role = String(body?.role || "").trim()
  const period = String(body?.period || "").trim()

  if (!company) throw createError({ statusCode: 400, statusMessage: "company requis" })
  if (!role) throw createError({ statusCode: 400, statusMessage: "role requis" })
  if (!period) throw createError({ statusCode: 400, statusMessage: "period requis" })

  const points = toStringArray(body?.points)

  const updated = await prisma.experience.update({
    where: { id },
    data: {
      company,
      role,
      period,
      pointsJson: JSON.stringify(points),
      order: Number.isFinite(Number(body?.order)) ? Number(body.order) : 0,
    },
  })

  return { ...updated, points }
})

function toStringArray(v: any): string[] {
  if (Array.isArray(v)) return v.map((x) => String(x).trim()).filter(Boolean)
  if (typeof v === "string") {
    const s = v.includes("\n") ? v.split("\n") : v.split(",")
    return s.map((x) => x.trim()).filter(Boolean)
  }
  return []
}