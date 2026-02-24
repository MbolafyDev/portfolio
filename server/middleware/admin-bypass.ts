// server/middleware/admin-bypass.ts
import {
  getHeader,
  getRequestURL,
  parseCookies,
  setCookie,
  setHeader,
  send,
} from "h3"

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)

  const isAdminPage = url.pathname === "/admin" || url.pathname.startsWith("/admin/")
  const isAdminApi = url.pathname.startsWith("/api/admin")

  if (!isAdminPage && !isAdminApi) return

  const cookies = parseCookies(event)
  if (cookies.admin_bypass === "1") return

  const config = useRuntimeConfig(event)
  const expectedPassword = String(config.adminBypassPassword || "")

  if (!expectedPassword) {
    event.node.res.statusCode = 500
    return send(event, "ADMIN_BYPASS_PASSWORD missing (runtimeConfig.adminBypassPassword empty)")
  }

  const auth = getHeader(event, "authorization") || ""
  const isBasic = auth.toLowerCase().startsWith("basic ")

  if (isBasic) {
    const b64 = auth.slice(6).trim()
    let decoded = ""
    try {
      decoded = Buffer.from(b64, "base64").toString("utf8")
    } catch {
      decoded = ""
    }

    const idx = decoded.indexOf(":")
    const pass = idx >= 0 ? decoded.slice(idx + 1) : ""

    if (pass === expectedPassword) {
      setCookie(event, "admin_bypass", "1", {
        httpOnly: false, // pour pouvoir supprimer côté front
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      })
      return
    }
  }

  // ✅ Challenge Basic Auth (popup navigateur) : 401 + WWW-Authenticate
  setHeader(event, "WWW-Authenticate", 'Basic realm="Admin Bypass"')
  event.node.res.statusCode = 401
  return send(event, "Auth required")
})