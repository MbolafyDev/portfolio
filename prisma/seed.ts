// prisma/seed.ts
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function main() {
  const profileExists = await prisma.profile.count()
  if (!profileExists) {
    await prisma.profile.create({
      data: {
        name: "Ton Nom",
        title: "Développeur Web",
        location: "Antananarivo",
        intro: "Je construis des apps web modernes...",
        photo: "/img/profile.jpg",
        cvUrl: "/cv.pdf",
      },
    })
  }

  const contactExists = await prisma.contact.count()
  if (!contactExists) {
    await prisma.contact.create({
      data: {
        email: "test@mail.com",
        phone: "+261000000000",
        github: "https://github.com/xxxx",
        linkedin: "https://linkedin.com/in/xxxx",
      },
    })
  }
}

main().finally(async () => prisma.$disconnect())