import { useAuth } from '../routes/_layout'

const ROLE_ADMIN = 'admin'
const PERMISSION_ADMIN = '*:*:*'

function useAccess() {
  const { auth } = useAuth()

  /**
   * @param role 角色code
   * @returns
   */
  function hasRole(role?: string) {
    if (auth?.roles.includes(ROLE_ADMIN)) return true
    if (role && auth?.roles.includes(role)) return true
    return false
  }

  /**
   * @param permission 权限code
   * @returns
   */
  function hasPermission(permission?: string) {
    if (auth?.permissions.includes(PERMISSION_ADMIN)) {
      return true
    }
    if (permission && auth?.permissions.includes(permission)) {
      return true
    }
    return false
  }

  /**
   * @param menu 权限code
   * @returns
   */
  function hasMenu(menu?: string) {
    return false
  }

  return {
    hasRole,
    hasPermission,
    hasMenu
  }
}

export default useAccess
