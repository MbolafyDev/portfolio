// server/api/portfolio/profile.get.ts
import { prisma } from "~/server/utils/prisma"

export default defineEventHandler(async () => {
  const p = await prisma.profile.findFirst({ orderBy: { updatedAt: "desc" } })

  // JAMAIS undefined -> toujours un objet
  return (
    p ?? {
      photo: "",
      name: "",
      title: "",
      location: "",
      intro: "",
      cvUrl: "",
    }
  )
})