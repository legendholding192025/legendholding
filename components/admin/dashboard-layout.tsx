"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  MessageSquare, 
  Newspaper, 
  FileText, 
  LogOut,
  Menu,
  Users,
  Mail,
  PanelLeftClose,
  PanelLeftOpen,
  ClipboardList,
  Shield,
  Headphones,
  Contact
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/admin/dashboard-header"
import { useAdminPermissions } from "@/hooks/use-admin-permissions"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarSeparator,
  SidebarFooter,
  useSidebar
} from "@/components/ui/sidebar"

interface AdminDashboardLayoutProps {
  children: React.ReactNode
  onSignOut: () => void
}

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
    permission: "dashboard" as const,
    superAdminOnly: false
  },
  {
    title: "Contact Management",
    icon: MessageSquare,
    href: "/admin/submissions",
    permission: "submissions" as const,
    superAdminOnly: true
  },
  {
    title: "News & Media",
    icon: Newspaper,
    href: "/admin/news",
    permission: "news" as const,
    superAdminOnly: true
  },
  {
    title: "Jobs Management",
    icon: FileText,
    href: "/admin/jobs",
    permission: "jobs" as const,
    superAdminOnly: false
  },
  {
    title: "Job Applications",
    icon: ClipboardList,
    href: "/admin/applications",
    permission: "applications" as const,
    superAdminOnly: false
  },
  {
    title: "Newsletter",
    icon: Mail,
    href: "/admin/newsletters",
    permission: "newsletters" as const,
    superAdminOnly: true
  },
  {
    title: "Customer Care",
    icon: Headphones,
    href: "/admin/customer-care",
    permission: "customer_care" as const,
    superAdminOnly: true
  },
  // {
  //   title: "Digital Business Cards",
  //   icon: Contact,
  //   href: "/admin/management-profiles",
  //   permission: "dashboard" as const,
  //   superAdminOnly: true
  // }
]

const systemMenuItems: typeof menuItems = [
  // Settings option removed as requested
]

export function AdminDashboardLayout({ children, onSignOut }: AdminDashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { userRole, isLoading, isSuperAdmin, hasPermission } = useAdminPermissions()

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full">
        {/* Mobile Menu Button */}
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="bg-white"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Sidebar */}
        <Sidebar className="border-r border-gray-200 shrink-0">
          <SidebarHeader className="border-b border-gray-200 py-5 px-6">
            <div className="flex items-center justify-between">
              <Link href="/admin/dashboard" className="flex items-center gap-2">
                <Image
                  src="/images/legend-logo.png"
                  alt="Legend Logo"
                  width={150}
                  height={40}
                  className="h-8 w-auto"
                />
              </Link>
              <SidebarTrigger />
            </div>
            {isSuperAdmin && (
              <div className="mt-2 flex items-center gap-2 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                <Shield className="h-3 w-3" />
                <span>Super Admin</span>
              </div>
            )}
          </SidebarHeader>
          
          <SidebarContent className="px-4 py-6">
            {/* Main Menu */}
            <div className="space-y-6">
              <div>
                <h2 className="mb-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Menu
                </h2>
                <SidebarMenu>
                  {menuItems.map((item) => {
                    const isActive = pathname === item.href
                    const hasAccess = hasPermission(item.permission)
                    const isSuperAdminOnly = item.superAdminOnly && !isSuperAdmin
                    
                    if (!hasAccess || isSuperAdminOnly) return null
                    
                    return (
                      <SidebarMenuItem key={item.href} className="mb-2">
                        <SidebarMenuButton
                          asChild
                          data-active={isActive}
                          className="w-full px-4 py-2.5 justify-start gap-3 rounded-lg hover:bg-primary/5 hover:text-primary data-[active=true]:bg-primary/10 data-[active=true]:text-primary group transition-colors"
                        >
                          <Link href={item.href}>
                            <item.icon className="h-5 w-5 transition-colors group-hover:text-primary shrink-0" />
                            <span className="font-medium">{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </div>

              <SidebarSeparator className="mx-4" />

              {/* System Menu */}
              <div>
                <SidebarMenu>
                  {systemMenuItems.map((item) => {
                    const isActive = pathname === item.href
                    const hasAccess = hasPermission(item.permission)
                    const isSuperAdminOnly = item.superAdminOnly && !isSuperAdmin
                    
                    if (!hasAccess || isSuperAdminOnly) return null
                    
                    return (
                      <SidebarMenuItem key={item.href} className="mb-2">
                        <SidebarMenuButton
                          asChild
                          data-active={isActive}
                          className="w-full px-4 py-2.5 justify-start gap-3 rounded-lg hover:bg-gray-100 group transition-colors data-[active=true]:bg-gray-200 data-[active=true]:text-gray-900"
                        >
                          <Link href={item.href}>
                            <item.icon className="h-5 w-5 text-gray-500 transition-colors group-hover:text-gray-900 shrink-0" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </div>
            </div>
          </SidebarContent>

          <SidebarFooter className="border-t border-gray-200 p-6">
            <SidebarMenuButton
              onClick={onSignOut}
              className="w-full px-4 py-2.5 justify-start gap-3 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-5 w-5 shrink-0" />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 min-w-0 relative">
          {/* Persistent Sidebar Toggle */}
          <SidebarToggleButton />
          <div className="h-full">
            <DashboardHeader onSignOut={onSignOut} />
            <div className="p-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

function SidebarToggleButton() {
  const { toggleSidebar, state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleSidebar}
      className={cn(
        "fixed top-4 z-50 h-8 w-8 bg-white border-gray-200 shadow-sm transition-all duration-300",
        isCollapsed ? "left-4 lg:left-4" : "left-4 lg:left-[calc(var(--sidebar-width)-3rem)]"
      )}
    >
      {isCollapsed ? (
        <PanelLeftOpen className="h-4 w-4" />
      ) : (
        <PanelLeftClose className="h-4 w-4" />
      )}
      <span className="sr-only">
        {isCollapsed ? "Show sidebar" : "Hide sidebar"}
      </span>
    </Button>
  )
}
