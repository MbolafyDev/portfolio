// server/api/about.get.ts
import { prisma } from "~/server/utils/prisma"
import { setHeader } from "h3"

export default defineEventHandler(async (event) => {
  // ✅ évite qu'une ancienne valeur reste en cache
  setHeader(event, "Cache-Control", "no-store")

  const item = await prisma.about.findFirst({
    orderBy: { updatedAt: "desc" },
  })

  return (
    item ?? {
      id: 0,
      title: "À propos",
      description: "",
      updatedAt: new Date(),
    }
  )
})