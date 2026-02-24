import { prisma } from "~/server/utils/prisma"
import { requireAdminBypass } from "~/server/utils/requireAdminBypass"
import { getRouterParam, readBody, createError } from "h3"

export default defineEventHandler(async (event) => {
  requireAdminBypass(event)

  const id = Number(getRouterParam(event, "id") || 0)
  if (!id) throw createError({ statusCode: 400, statusMessage: "id invalide" })

  const body = await readBody(event)

  const title = String(body?.title || "").trim()
  const slug = String(body?.slug || "").trim()
  if (!title) throw createError({ statusCode: 400, statusMessage: "title requis" })
  if (!slug) throw createError({ statusCode: 400, statusMessage: "slug requis" })

  const tech = toStringArray(body?.tech)
  const techJson = JSON.stringify(tech)

  const updated = await prisma.projet.update({
    where: { id },
    data: {
      title,
      slug,
      description: String(body?.description || ""),
      github: String(body?.github || ""),
      demo: String(body?.demo || ""),
      techJson,
      order: Number.isFinite(Number(body?.order)) ? Number(body.order) : 0,
    },
  })

  return { ...updated, tech }
})

function toStringArray(v: any): string[] {
  if (Array.isArray(v)) return v.map((x) => String(x).trim()).filter(Boolean)
  if (typeof v === "string") return v.split(",").map((s) => s.trim()).filter(Boolean)
  return []
}