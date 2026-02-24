import { prisma } from "~/server/utils/prisma"
import { requireAdminBypass } from "~/server/utils/requireAdminBypass"
import { readBody, createError } from "h3"

export default defineEventHandler(async (event) => {
  requireAdminBypass(event)

  const body = await readBody(event)

  const school = String(body?.school || "").trim()
  const degree = String(body?.degree || "").trim()
  const period = String(body?.period || "").trim()

  if (!school) throw createError({ statusCode: 400, statusMessage: "school requis" })
  if (!degree) throw createError({ statusCode: 400, statusMessage: "degree requis" })
  if (!period) throw createError({ statusCode: 400, statusMessage: "period requis" })

  const created = await prisma.education.create({
    data: {
      school,
      degree,
      test: body?.test != null ? String(body.test) : null,
      period,
      order: Number.isFinite(Number(body?.order)) ? Number(body.order) : 0,
    },
  })

  return created
})