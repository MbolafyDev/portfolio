// server/api/admin/profile.post.ts
import { prisma } from "~/server/utils/prisma"
import { requireAdminBypass } from "~/server/utils/requireAdminBypass"
import { readBody, createError } from "h3"

export default defineEventHandler(async (event) => {
  requireAdminBypass(event)

  const body = await readBody(event)

  const data = {
    name: String(body?.name || ""),
    title: String(body?.title || ""),
    location: String(body?.location || ""),
    intro: String(body?.intro || ""),
    photo: String(body?.photo || ""),
    cvUrl: String(body?.cvUrl || ""),
  }

  const existing = await prisma.profile.findFirst({ orderBy: { updatedAt: "desc" } })

  if (existing) {
    const updated = await prisma.profile.update({
      where: { id: existing.id },
      data,
    })
    return updated
  }

  const created = await prisma.profile.create({ data })
  return created
})