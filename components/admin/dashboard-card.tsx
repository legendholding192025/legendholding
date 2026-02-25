import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare, FileText, Newspaper, ArrowRight } from "lucide-react"
import Link from "next/link"

interface DashboardCardsProps {
  submissions: any[]
  jobApplicationsCount?: number
  newsArticlesCount?: number
}

export function DashboardCards({ submissions, jobApplicationsCount = 0, newsArticlesCount = 0 }: DashboardCardsProps) {
  const cards = [
    {
      title: "Contact Submissions",
      value: submissions.length,
      icon: MessageSquare,
      color: "blue" as const,
      description: "View and manage contact form submissions",
      href: "/admin/submissions"
    },
    {
      title: "Job Applications",
      value: jobApplicationsCount,
      icon: FileText,
      color: "green" as const,
      description: "Review and process job applications",
      href: "/admin/applications"
    },
    {
      title: "News Articles",
      value: newsArticlesCount,
      icon: Newspaper,
      color: "purple" as const,
      description: "Manage published news articles",
      href: "/admin/news"
    }
  ]

  const styles = {
    blue: {
      iconBg: "bg-blue-500/10 dark:bg-blue-500/20",
      icon: "text-blue-600 dark:text-blue-400",
      border: "border-blue-200/60 dark:border-blue-800/50",
      hover: "hover:border-blue-300/80 dark:hover:border-blue-700/60"
    },
    green: {
      iconBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
      icon: "text-emerald-600 dark:text-emerald-400",
      border: "border-emerald-200/60 dark:border-emerald-800/50",
      hover: "hover:border-emerald-300/80 dark:hover:border-emerald-700/60"
    },
    purple: {
      iconBg: "bg-violet-500/10 dark:bg-violet-500/20",
      icon: "text-violet-600 dark:text-violet-400",
      border: "border-violet-200/60 dark:border-violet-800/50",
      hover: "hover:border-violet-300/80 dark:hover:border-violet-700/60"
    }
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 min-w-0">
      {cards.map((card, index) => {
        const s = styles[card.color]
        return (
          <Link
            key={index}
            href={card.href}
            className={`group block min-w-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl transition-all duration-200`}
          >
            <Card
              className={`relative overflow-hidden min-w-0 border ${s.border} bg-card shadow-sm hover:shadow-md ${s.hover} transition-all duration-200 h-full`}
            >
              <CardContent className="p-6 md:p-7 flex flex-col h-full">
                <div className="flex items-start justify-between gap-4">
                  <div className={`p-3.5 rounded-xl ${s.iconBg} ${s.icon} transition-transform duration-200 group-hover:scale-110`}>
                    <card.icon className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  <span className="text-3xl md:text-4xl font-bold tabular-nums text-foreground tracking-tight">{card.value}</span>
                </div>
                <div className="mt-5 flex-1">
                  <h3 className="font-semibold text-foreground text-base">{card.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{card.description}</p>
                </div>
                <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  <span>View all</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
