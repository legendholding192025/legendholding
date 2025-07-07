"use client"

import { NotificationCenter } from "./notification-center"
import { Button } from "@/components/ui/button"
import { CircleUserRound, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAdminPermissions } from "@/hooks/use-admin-permissions"

interface DashboardHeaderProps {
  onSignOut?: () => void
}

export function DashboardHeader({ onSignOut }: DashboardHeaderProps) {
  const { userRole } = useAdminPermissions()

  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <NotificationCenter />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <CircleUserRound className="h-5 w-5 text-gray-700 hover:text-primary transition-colors" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="px-2 py-1.5 text-sm text-gray-600">
                {userRole?.email || 'Loading...'}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onSignOut} className="cursor-pointer text-red-600 focus:text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
