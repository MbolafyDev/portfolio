// server/api/admin/me.get.ts
import { requireAdminBypass } from "~/server/utils/requireAdminBypass"

export default defineEventHandler((event) => {
  requireAdminBypass(event)
  return { ok: true }
})