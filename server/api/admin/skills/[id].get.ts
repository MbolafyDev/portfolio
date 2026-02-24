// server/api/admin/skills/[id].get.ts
import { prisma } from "~/server/utils/prisma"
import { requireAdminBypass } from "~/server/utils/requireAdminBypass"
import { getRouterParam, createError } from "h3"

export default defineEventHandler(async (event) => {
  requireAdminBypass(event)

  const id = Number(getRouterParam(event, "id") || 0)
  if (!id) throw createError({ statusCode: 400, statusMessage: "id invalide" })

  const item = await prisma.skill.findUnique({ where: { id } })
  if (!item) throw createError({ statusCode: 404, statusMessage: "Compétence introuvable" })

  return item
})