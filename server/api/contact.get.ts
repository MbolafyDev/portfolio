// server/api/contact.get.ts
import { prisma } from "~/server/utils/prisma"
import { defineEventHandler, setHeader } from "h3"

export default defineEventHandler(async (event) => {
  setHeader(event, "Cache-Control", "no-store")

  const item = await prisma.contact.findFirst({
    orderBy: { updatedAt: "desc" },
  })

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