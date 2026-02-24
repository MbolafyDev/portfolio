// server/api/admin/skills/index.post.ts
import { prisma } from "~/server/utils/prisma"
import { requireAdminBypass } from "~/server/utils/requireAdminBypass"
import { readBody, createError } from "h3"

export default defineEventHandler(async (event) => {
  requireAdminBypass(event)

  const body = await readBody(event)

  const name = String(body?.name || "").trim()
  const level = String(body?.level || "").trim()
  const order = Number.isFinite(Number(body?.order)) ? Number(body.order) : 0

  if (!name) throw createError({ statusCode: 400, statusMessage: "name requis" })
  if (!level) throw createError({ statusCode: 400, statusMessage: "level requis" })

  const created = await prisma.skill.create({
    data: { name, level, order },
  })

  return created
})