import { prisma } from "~/server/utils/prisma"
import { requireAdminBypass } from "~/server/utils/requireAdminBypass"
import { readBody, createError } from "h3"

export default defineEventHandler(async (event) => {
  requireAdminBypass(event)

  const body = await readBody(event)

  const company = String(body?.company || "").trim()
  const role = String(body?.role || "").trim()
  const period = String(body?.period || "").trim()

  if (!company) throw createError({ statusCode: 400, statusMessage: "company requis" })
  if (!role) throw createError({ statusCode: 400, statusMessage: "role requis" })
  if (!period) throw createError({ statusCode: 400, statusMessage: "period requis" })

  const points = toStringArray(body?.points)
  const created = await prisma.experience.create({
    data: {
      company,
      role,
      period,
      pointsJson: JSON.stringify(points),
      order: Number.isFinite(Number(body?.order)) ? Number(body.order) : 0,
    },
  })

  return { ...created, points }
})

function toStringArray(v: any): string[] {
  if (Array.isArray(v)) return v.map((x) => String(x).trim()).filter(Boolean)
  if (typeof v === "string") {
    // support "point1\npoint2" ou "point1, point2"
    const s = v.includes("\n") ? v.split("\n") : v.split(",")
    return s.map((x) => x.trim()).filter(Boolean)
  }
  return []
}