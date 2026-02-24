// server/api/portfolio/projets/[slug].get.ts
import { prisma } from "~/server/utils/prisma"

export default defineEventHandler(async (event) => {
  const slug = String(getRouterParam(event, "slug") || "")
  const p = await prisma.projet.findUnique({ where: { slug } })
  if (!p) throw createError({ statusCode: 404, statusMessage: "Projet introuvable" })

  return { ...p, tech: safeJsonArray(p.techJson) }
})

function safeJsonArray(v: string) {
  try {
    const x = JSON.parse(v || "[]")
    return Array.isArray(x) ? x : []
  } catch {
    return []
  }
}