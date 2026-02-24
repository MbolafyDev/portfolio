// server/api/contact.get.ts
import { prisma } from "~/server/utils/prisma"

export default defineEventHandler(async () => {
  const item = await prisma.contact.findFirst({
    orderBy: { updatedAt: "desc" },
  })

  // fallback (évite crash si vide)
  return (
    item ?? {
      id: 0,
      email: "",
      phone: "",
      github: "",
      linkedin: "",
      updatedAt: new Date(),
    }
  )
})