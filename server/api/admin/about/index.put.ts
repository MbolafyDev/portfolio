// server/api/admin/about/index.put.js
import { prisma } from "~/server/utils/prisma"
import { requireAdminBypass } from "~/server/utils/requireAdminBypass"
import { readBody, createError, setHeader } from "h3"

export default defineEventHandler(async (event) => {
  requireAdminBypass(event)

  // ✅ évite cache
  setHeader(event, "Cache-Control", "no-store")

  const body = await readBody(event)
  const title = String(body?.title || "").trim()
  const description = String(body?.description || "").trim()

  if (!title) throw createError({ statusCode: 400, statusMessage: "title requis" })
  if (!description) throw createError({ statusCode: 400, statusMessage: "description requis" })

  const existing = await prisma.about.findFirst({ orderBy: { updatedAt: "desc" } })

  if (existing) {
    return prisma.about.update({
      where: { id: existing.id },
      data: { title, description },
    })
  }

  return prisma.about.create({ data: { title, description } })
})