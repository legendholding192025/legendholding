import { Shield, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

interface UnauthorizedAccessProps {
  requiredPermission?: string
  currentUserRole?: string
}

export function UnauthorizedAccess({ requiredPermission, currentUserRole }: UnauthorizedAccessProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <Shield className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle className="text-xl font-semibold text-gray-900">
            Access Denied
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-sm text-gray-600">
            <p className="mb-2">
              You don't have permission to access this area.
            </p>
            {requiredPermission && (
              <p className="text-xs text-gray-500">
                Required permission: <span className="font-medium">{requiredPermission}</span>
              </p>
            )}
            {currentUserRole && (
              <p className="text-xs text-gray-500">
                Your role: <span className="font-medium">{currentUserRole}</span>
              </p>
            )}
          </div>
          
          <div className="flex flex-col gap-2">
            <Button asChild className="w-full">
              <Link href="/admin/jobs">
                Go to Jobs Management
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/admin/applications">
                Go to Job Applications
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/admin/login">
                Go to Login Page
              </Link>
            </Button>
          </div>
          
          <div className="pt-4 border-t">
            <p className="text-xs text-gray-500">
              If you believe this is an error, please contact your administrator.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 