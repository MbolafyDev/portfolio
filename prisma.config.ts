import "dotenv/config"
import { defineConfig, env } from "prisma/config"

export default defineConfig({
  // Prisma CLI utilisera TOUJOURS prisma/schema.prisma (celui copié par ton script)
  schema: "prisma/schema.prisma",

  // URL de connexion pour migrate/db/studio etc.
  datasource: {
    url: env("DATABASE_URL"),
  },

  migrations: {
    path: "prisma/migrations",
  },
})