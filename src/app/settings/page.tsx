'use client'

import { useRouter } from 'next/navigation'
import { useLocalStore } from '@/lib/localStore'
import { Settings, Bell, Shield, CreditCard, Users, Lock } from 'lucide-react'
import Link from 'next/link'

export default function SettingsPage() {
  const { user } = useLocalStore()
  const router = useRouter()

  if (!user) {
    router.push('/auth/simple-login')
    return null
  }

  const settingsSections = [
    {
      title: 'Account',
      icon: Users,
      items: [
        { label: 'Edit Profile', href: '/profile/edit' },
        { label: 'Change Password', href: '/settings/password' },
        { label: 'Email Preferences', href: '/settings/email' }
      ]
    },
    {
      title: 'Subscription',
      icon: CreditCard,
      items: [
        { label: 'Upgrade to Pro', href: '/verify' },
        { label: 'Billing History', href: '/settings/billing' },
        { label: 'Cancel Subscription', href: '/settings/cancel' }
      ]
    },
    {
      title: 'Privacy & Security',
      icon: Shield,
      items: [
        { label: 'Privacy Settings', href: '/settings/privacy' },
        { label: 'Blocked Users', href: '/settings/blocked' },
        { label: 'Two-Factor Auth', href: '/settings/2fa' }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { label: 'Push Notifications', href: '/settings/notifications' },
        { label: 'Email Notifications', href: '/settings/email-notif' },
        { label: 'Comment Alerts', href: '/settings/comment-alerts' }
      ]
    }
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold mb-8 flex items-center space-x-3">
        <Settings className="w-10 h-10 text-cyan-400" />
        <span>Settings</span>
      </h1>

      <div className="space-y-6">
        {settingsSections.map((section) => (
          <div key={section.title} className="gradient-border glow-border p-6 bg-gray-900/90 backdrop-blur-sm rounded-lg">
            <div className="flex items-center space-x-3 mb-4">
              <section.icon className="w-6 h-6 text-cyan-400" />
              <h2 className="text-xl font-bold">{section.title}</h2>
            </div>
            <div className="space-y-2">
              {section.items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block px-4 py-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
