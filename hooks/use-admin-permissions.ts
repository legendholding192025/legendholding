import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export interface UserRole {
  id: string
  user_id: string
  email: string
  role: 'super_admin' | 'admin'
  permissions: {
    dashboard?: boolean
    submissions?: boolean
    news?: boolean
    jobs?: boolean
    applications?: boolean
    newsletters?: boolean
    settings?: boolean
  }
  created_at?: string
  updated_at?: string
}

export interface AdminPermissions {
  userRole: UserRole | null
  isLoading: boolean
  isSuperAdmin: boolean
  isAdmin: boolean
  hasPermission: (permission: keyof UserRole['permissions']) => boolean
  canAccess: (path: string) => boolean
}

export function useAdminPermissions(): AdminPermissions {
  const [userRole, setUserRole] = useState<UserRole | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchUserRole()
  }, [])

  const fetchUserRole = async () => {
    try {
      setIsLoading(true)
      
      // Get current user with error handling
      let user = null
      try {
        const { data, error } = await supabase.auth.getUser()
        if (error) {
          console.error('Auth error:', error)
          setUserRole(null)
          return
        }
        user = data.user
      } catch (authError) {
        console.error('Auth error in try-catch:', authError)
        setUserRole(null)
        return
      }
      
      if (!user) {
        console.log('No user found')
        setUserRole(null)
        return
      }

      console.log('Current user:', user.email, user.id)

      // Create fallback role based on email
      const isSuperAdmin = user.email === 'waseem.k@legendholding.com'
      const fallbackRole: UserRole = {
        id: 'fallback',
        user_id: user.id,
        email: user.email || '',
        role: isSuperAdmin ? 'super_admin' : 'admin',
        permissions: isSuperAdmin ? {
          dashboard: true,
          submissions: true,
          news: true,
          jobs: true,
          applications: true,
          newsletters: true,
          settings: true
        } : {
          dashboard: true,  // Allow dashboard access for all users
          submissions: false,
          news: false,
          jobs: true,
          applications: true,
          newsletters: false,
          settings: false
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      // Try to get user role from database, but don't fail if it doesn't work
      try {
        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('*')
          .eq('user_id', user.id)
          .single()

        console.log('Role query result:', { roleData, roleError })

        if (roleError) {
          console.log('Database role lookup failed, using fallback:', roleError.message)
          setUserRole(fallbackRole)
        } else if (roleData) {
          console.log('Found user role in database:', roleData)
          setUserRole(roleData)
        } else {
          console.log('No role data found, using fallback')
          setUserRole(fallbackRole)
        }
      } catch (dbError) {
        console.log('Database error, using fallback:', dbError)
        setUserRole(fallbackRole)
      }
      
    } catch (error) {
      console.error('Unexpected error in fetchUserRole:', error)
      
      // Last resort fallback
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const isSuperAdmin = user.email === 'waseem.k@legendholding.com'
          const fallbackRole: UserRole = {
            id: 'fallback',
            user_id: user.id,
            email: user.email || '',
            role: isSuperAdmin ? 'super_admin' : 'admin',
            permissions: isSuperAdmin ? {
              dashboard: true,
              submissions: true,
              news: true,
              jobs: true,
              applications: true,
              newsletters: true,
              settings: true
            } : {
              dashboard: true,  // Allow dashboard access for all users
              submissions: false,
              news: false,
              jobs: true,
              applications: true,
              newsletters: false,
              settings: false
            },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
          
          console.log('Setting fallback role from outer catch block:', fallbackRole)
          setUserRole(fallbackRole)
        } else {
          console.log('No user found in outer catch block')
          setUserRole(null)
        }
      } catch (finalError) {
        console.error('Final fallback error:', finalError)
        setUserRole(null)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const isSuperAdmin = userRole?.role === 'super_admin'
  const isAdmin = userRole?.role === 'admin' || isSuperAdmin

  const hasPermission = (permission: keyof UserRole['permissions']): boolean => {
    if (!userRole) return false
    if (isSuperAdmin) return true // Super admin has all permissions
    return userRole.permissions[permission] || false
  }

  const canAccess = (path: string): boolean => {
    if (!userRole) return false
    if (isSuperAdmin) return true // Super admin can access everything

    // Map paths to permissions
    const pathPermissions: Record<string, keyof UserRole['permissions']> = {
      '/admin/dashboard': 'dashboard',
      '/admin/submissions': 'submissions',
      '/admin/news': 'news',
      '/admin/jobs': 'jobs',
      '/admin/applications': 'applications',
      '/admin/newsletters': 'newsletters',
      '/admin/settings': 'settings'
    }

    const permission = pathPermissions[path]
    return permission ? hasPermission(permission) : false
  }

  return {
    userRole,
    isLoading,
    isSuperAdmin,
    isAdmin,
    hasPermission,
    canAccess
  }
} 