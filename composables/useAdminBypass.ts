// <!-- composables/useAdminBypass.ts -->
export function useAdminBypass() {
  const isAdmin = useState<boolean>("admin_bypass_is_admin", () => false)

  const refresh = async () => {
    try {
      // IMPORTANT: utiliser un endpoint protégé /api/admin/...
      // Si cookie admin_bypass=1 => 200
      // Sinon => 401 (et sur fetch, pas de popup, c'est normal)
      await $fetch("/api/admin/me", { method: "GET" })
      isAdmin.value = true
    } catch {
      isAdmin.value = false
    }
  }

  const logout = () => {
    // supprime le cookie côté client (httpOnly:false dans ton middleware)
    document.cookie = "admin_bypass=; Path=/; Max-Age=0; SameSite=Lax"
    isAdmin.value = false

    // Option B: vrai reload vers /admin pour relancer la Basic Auth popup
    window.location.href = "/admin"
  }

  return { isAdmin, refresh, logout }
}