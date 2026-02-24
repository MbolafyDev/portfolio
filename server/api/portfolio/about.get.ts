// server/api/about.get.ts
import { prisma } from "~/server/utils/prisma"

export default defineEventHandler(async () => {
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