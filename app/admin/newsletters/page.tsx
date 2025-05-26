"use client"

import { NewsletterTable } from "@/components/admin/newsletter-table"
import { UnsubscribeTable } from "@/components/admin/unsubscribe-table"
import { AdminDashboardLayout } from "@/components/admin/dashboard-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NewslettersPage() {
  const handleSignOut = () => {
    // Handle sign out logic
  }

  return (
    <AdminDashboardLayout onSignOut={handleSignOut}>
      <div className="p-6 md:p-8 lg:p-10">
        <Tabs defaultValue="subscriptions" className="space-y-6">
          <TabsList>
            <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
            <TabsTrigger value="unsubscribe">Unsubscribe Requests</TabsTrigger>
          </TabsList>
          
          <TabsContent value="subscriptions">
            <NewsletterTable />
          </TabsContent>
          
          <TabsContent value="unsubscribe">
            <UnsubscribeTable />
          </TabsContent>
        </Tabs>
      </div>
    </AdminDashboardLayout>
  )
} 