// server/api/admin/skills/[id].put.ts
import { prisma } from "~/server/utils/prisma"
import { requireAdminBypass } from "~/server/utils/requireAdminBypass"
import { getRouterParam, readBody, createError } from "h3"

export default defineEventHandler(async (event) => {
  requireAdminBypass(event)

  const id = Number(getRouterParam(event, "id") || 0)
  if (!id) throw createError({ statusCode: 400, statusMessage: "id invalide" })

  const body = await readBody(event)

  const name = String(body?.name || "").trim()
  const level = String(body?.level || "").trim()
  const order = Number.isFinite(Number(body?.order)) ? Number(body.order) : 0

  if (!name) throw createError({ statusCode: 400, statusMessage: "name requis" })
  if (!level) throw createError({ statusCode: 400, statusMessage: "level requis" })

  const updated = await prisma.skill.update({
    where: { id },
    data: { name, level, order },
  })

  return updated
})