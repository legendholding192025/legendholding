import { Button } from "@/components/ui/button"
import { Calendar, Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function DashboardHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-white rounded-lg border shadow-sm p-4">
      <div className="flex-1">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Welcome back</h1>
        <p className="text-sm text-gray-500 mt-1">Here's what's happening with your dashboard today.</p>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            type="search" 
            placeholder="Search..." 
            className="pl-9 w-full sm:w-[240px] bg-gray-50 border-gray-200 focus:bg-white"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon"
            className="relative h-9 w-9 border-gray-200"
          >
            <Bell className="h-4 w-4 text-gray-600" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
              3
            </span>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="h-9 border-gray-200 bg-gray-50 hover:bg-white"
          >
            <Calendar className="mr-2 h-4 w-4 text-gray-600" />
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </Button>
        </div>
      </div>
    </div>
  )
}
