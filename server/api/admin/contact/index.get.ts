// server/api/admin/contact.get.ts
import { prisma } from "~/server/utils/prisma"
import { requireAdminBypass } from "~/server/utils/requireAdminBypass"

export default defineEventHandler(async (event) => {
  requireAdminBypass(event)

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