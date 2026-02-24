import { prisma } from "~/server/utils/prisma"
import { requireAdminBypass } from "~/server/utils/requireAdminBypass"
import { getRouterParam, createError } from "h3"

export default defineEventHandler(async (event) => {
  requireAdminBypass(event)

  const id = Number(getRouterParam(event, "id") || 0)
  if (!id) throw createError({ statusCode: 400, statusMessage: "id invalide" })

  await prisma.projet.delete({ where: { id } })
  return { ok: true }
})