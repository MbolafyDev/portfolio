// server/utils/requireAdminBypass.ts
import { createError, parseCookies } from "h3"

export function requireAdminBypass(event: any) {
  const cookies = parseCookies(event)
  if (cookies.admin_bypass !== "1") {
    throw createError({ statusCode: 401, statusMessage: "Admin bypass required" })
  }
}