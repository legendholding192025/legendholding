"use client"

import { useState } from "react"
import { AdminDashboardLayout } from "@/components/admin/dashboard-layout"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import {
  User,
  Bell,
  Moon,
  Shield,
  Mail,
  Key,
  Smartphone,
  Save,
  Loader2,
  UserCog,
  BellRing,
  Palette,
  Lock,
  CircleUserRound,
  BellDot,
  PaintBucket,
  ShieldCheck
} from "lucide-react"

export default function SettingsPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: ""
  })
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    notifyOnNewSubmission: true,
    notifyOnNewApplication: true
  })
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: "light",
    fontSize: "normal",
    compactMode: false
  })
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: "30"
  })

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
    router.push("/admin/login")
  }

  const updateProfile = async () => {
    setLoading(true)
    try {
      const { error } = await supabase
        .from('admin_profiles')
        .upsert({
          ...profileData,
          updated_at: new Date().toISOString()
        })

      if (error) throw error
      toast.success("Profile updated successfully")
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error("Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  const updateNotificationSettings = async () => {
    setLoading(true)
    try {
      const { error } = await supabase
        .from('admin_settings')
        .upsert({
          type: 'notifications',
          settings: notificationSettings,
          updated_at: new Date().toISOString()
        })

      if (error) throw error
      toast.success("Notification settings updated")
    } catch (error) {
      console.error('Error updating notification settings:', error)
      toast.error("Failed to update notification settings")
    } finally {
      setLoading(false)
    }
  }

  const updateAppearance = async () => {
    setLoading(true)
    try {
      const { error } = await supabase
        .from('admin_settings')
        .upsert({
          type: 'appearance',
          settings: appearanceSettings,
          updated_at: new Date().toISOString()
        })

      if (error) throw error
      toast.success("Appearance settings updated")
    } catch (error) {
      console.error('Error updating appearance settings:', error)
      toast.error("Failed to update appearance settings")
    } finally {
      setLoading(false)
    }
  }

  const updateSecurity = async () => {
    setLoading(true)
    try {
      const { error } = await supabase
        .from('admin_settings')
        .upsert({
          type: 'security',
          settings: securitySettings,
          updated_at: new Date().toISOString()
        })

      if (error) throw error
      toast.success("Security settings updated")
    } catch (error) {
      console.error('Error updating security settings:', error)
      toast.error("Failed to update security settings")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminDashboardLayout onSignOut={handleSignOut}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-sm text-gray-500">
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <CircleUserRound className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <BellDot className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <PaintBucket className="h-4 w-4" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your account profile information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <UserCog className="h-4 w-4 text-gray-500" />
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Your email"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4 text-gray-500" />
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      placeholder="Your phone number"
                      value={profileData.phone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                </div>
                <Button onClick={updateProfile} disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose how you want to receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="flex items-center gap-2">
                        <BellRing className="h-4 w-4 text-gray-500" />
                        Email Notifications
                      </Label>
                      <p className="text-sm text-gray-500">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) =>
                        setNotificationSettings(prev => ({ ...prev, emailNotifications: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-gray-500">
                        Receive push notifications in browser
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={(checked) =>
                        setNotificationSettings(prev => ({ ...prev, pushNotifications: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>New Contact Submissions</Label>
                      <p className="text-sm text-gray-500">
                        Get notified when someone submits a contact form
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.notifyOnNewSubmission}
                      onCheckedChange={(checked) =>
                        setNotificationSettings(prev => ({ ...prev, notifyOnNewSubmission: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>New Job Applications</Label>
                      <p className="text-sm text-gray-500">
                        Get notified when someone applies for a job
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.notifyOnNewApplication}
                      onCheckedChange={(checked) =>
                        setNotificationSettings(prev => ({ ...prev, notifyOnNewApplication: checked }))
                      }
                    />
                  </div>
                </div>
                <Button onClick={updateNotificationSettings} disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>
                  Customize how the dashboard looks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="theme" className="flex items-center gap-2">
                      <Palette className="h-4 w-4 text-gray-500" />
                      Theme
                    </Label>
                    <Select
                      value={appearanceSettings.theme}
                      onValueChange={(value) =>
                        setAppearanceSettings(prev => ({ ...prev, theme: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="fontSize">Font Size</Label>
                    <Select
                      value={appearanceSettings.fontSize}
                      onValueChange={(value) =>
                        setAppearanceSettings(prev => ({ ...prev, fontSize: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select font size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Compact Mode</Label>
                      <p className="text-sm text-gray-500">
                        Use compact layout for tables and lists
                      </p>
                    </div>
                    <Switch
                      checked={appearanceSettings.compactMode}
                      onCheckedChange={(checked) =>
                        setAppearanceSettings(prev => ({ ...prev, compactMode: checked }))
                      }
                    />
                  </div>
                </div>
                <Button onClick={updateAppearance} disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your account security preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="flex items-center gap-2">
                        <Lock className="h-4 w-4 text-gray-500" />
                        Two-Factor Authentication
                      </Label>
                      <p className="text-sm text-gray-500">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch
                      checked={securitySettings.twoFactorAuth}
                      onCheckedChange={(checked) =>
                        setSecuritySettings(prev => ({ ...prev, twoFactorAuth: checked }))
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="sessionTimeout">Session Timeout</Label>
                    <Select
                      value={securitySettings.sessionTimeout}
                      onValueChange={(value) =>
                        setSecuritySettings(prev => ({ ...prev, sessionTimeout: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select timeout duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={updateSecurity} disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminDashboardLayout>
  )
} 