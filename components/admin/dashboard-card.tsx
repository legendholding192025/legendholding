import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare, Car, FileText, Newspaper, TrendingUp, TrendingDown } from "lucide-react"

interface DashboardCardsProps {
  submissions: any[]
  jobApplicationsCount?: number
}

export function DashboardCards({ submissions, jobApplicationsCount = 0 }: DashboardCardsProps) {
  const cards = [
    {
      title: "Contact Submissions",
      value: submissions.length,
      change: "+12.5%",
      trend: "up",
      icon: MessageSquare,
      color: "blue",
      description: "Total submissions this month"
    },
    {
      title: "Job Applications",
      value: jobApplicationsCount,
      change: "+15.3%",
      trend: "up",
      icon: FileText,
      color: "green",
      description: "Total applications received"
    },
    {
      title: "News Articles",
      value: 15,
      change: "-2.4%",
      trend: "down",
      icon: Newspaper,
      color: "purple",
      description: "Published articles this month"
    }
  ]

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-600',
          bgLight: 'bg-blue-50'
        }
      case 'green':
        return {
          bg: 'bg-green-100',
          text: 'text-green-600',
          bgLight: 'bg-green-50'
        }
      case 'purple':
        return {
          bg: 'bg-purple-100',
          text: 'text-purple-600',
          bgLight: 'bg-purple-50'
        }
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-600',
          bgLight: 'bg-gray-50'
        }
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 min-w-0">
      {cards.map((card, index) => {
        const colorClasses = getColorClasses(card.color)
        
        return (
          <Card key={index} className="relative overflow-hidden min-w-0 hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${colorClasses.bg} group-hover:scale-105 transition-transform duration-200`}>
                  <card.icon className={`h-5 w-5 ${colorClasses.text}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  card.trend === 'up' ? 'text-green-600' : 'text-red-600'
                } group-hover:scale-105 transition-transform duration-200`}>
                  {card.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span>{card.change}</span>
                </div>
              </div>
              
              <div className="mt-4 relative z-20">
                <div className="text-2xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-200">{card.value}</div>
                <div className="text-sm font-medium text-gray-800 mt-1 group-hover:text-gray-600 transition-colors duration-200">{card.title}</div>
                <div className="text-xs text-gray-500 mt-1 group-hover:text-gray-400 transition-colors duration-200">{card.description}</div>
              </div>
            </CardContent>
            
            {/* Decorative Element - Fixed positioning and hover effects */}
            <div className={`absolute top-0 right-0 w-24 h-24 transform translate-x-8 -translate-y-8 rounded-full ${colorClasses.bgLight} opacity-50 group-hover:opacity-70 transition-opacity duration-200 pointer-events-none`} />
          </Card>
        )
      })}
    </div>
  )
}
