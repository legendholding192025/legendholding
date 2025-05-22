import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare, Car, FileText, Newspaper, TrendingUp, TrendingDown } from "lucide-react"

interface DashboardCardsProps {
  submissions: any[]
}

export function DashboardCards({ submissions }: DashboardCardsProps) {
  const cards = [
    {
      title: "Contact Submissions",
      value: submissions.length,
      change: "+12.5%",
      trend: "up",
      icon: MessageSquare,
      color: "primary",
      description: "Total submissions this month"
    },
    {
      title: "Test Drive Requests",
      value: 24,
      change: "+8.2%",
      trend: "up",
      icon: Car,
      color: "secondary",
      description: "Pending test drive requests"
    },
    {
      title: "News Articles",
      value: 15,
      change: "-2.4%",
      trend: "down",
      icon: Newspaper,
      color: "primary",
      description: "Published articles this month"
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 min-w-0">
      {cards.map((card, index) => (
        <Card key={index} className="relative overflow-hidden min-w-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className={`p-2 rounded-lg bg-${card.color}/10`}>
                <card.icon className={`h-5 w-5 text-${card.color}`} />
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                card.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {card.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span>{card.change}</span>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="text-2xl font-bold">{card.value}</div>
              <div className="text-sm font-medium text-gray-800 mt-1">{card.title}</div>
              <div className="text-xs text-gray-500 mt-1">{card.description}</div>
            </div>

            {/* Decorative Element */}
            <div className={`absolute top-0 right-0 w-32 h-32 transform translate-x-16 -translate-y-16 rounded-full bg-${card.color}/5`} />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
