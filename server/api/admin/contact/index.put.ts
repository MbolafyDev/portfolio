// server/api/admin/contact.put.ts
import { prisma } from "~/server/utils/prisma"
import { requireAdminBypass } from "~/server/utils/requireAdminBypass"
import { readBody, createError } from "h3"

export default defineEventHandler(async (event) => {
  requireAdminBypass(event)

  const body = await readBody(event)

  const email = String(body?.email || "").trim()
  const phone = String(body?.phone || "").trim()
  const github = String(body?.github || "").trim()
  const linkedin = String(body?.linkedin || "").trim()

  if (!email) throw createError({ statusCode: 400, statusMessage: "email requis" })
  if (!phone) throw createError({ statusCode: 400, statusMessage: "phone requis" })
  if (!github) throw createError({ statusCode: 400, statusMessage: "github requis" })
  // linkedin peut être vide si tu veux
  // si tu veux obligatoire => décommente :
  // if (!linkedin) throw createError({ statusCode: 400, statusMessage: "linkedin requis" })

  const existing = await prisma.contact.findFirst({
    orderBy: { updatedAt: "desc" },
  })

  // Upsert “single” : si existe => update, sinon => create
  if (existing) {
    const updated = await prisma.contact.update({
      where: { id: existing.id },
      data: { email, phone, github, linkedin },
    })
    return updated
  }

  const created = await prisma.contact.create({
    data: { email, phone, github, linkedin },
  })
  return created
})