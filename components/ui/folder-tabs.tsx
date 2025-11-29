'use client'

import { ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'

interface Tab {
  id: string
  label: string
  icon?: LucideIcon
}

interface FolderTabsProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
}

/**
 * Elegant, minimal folder-style tabs with smooth animations
 * Neutral colors for professional appearance
 */
export function FolderTabs({
  tabs,
  activeTab,
  onTabChange
}: FolderTabsProps) {
  return (
    <div className="relative mb-8">
      {/* Tab Container */}
      <div className="flex items-end gap-0.5">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          const Icon = tab.icon

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                relative group px-5 py-2.5 text-sm font-medium
                rounded-t-lg border border-b-0
                transition-all duration-200 ease-out
                ${isActive
                  ? 'text-foreground bg-background border-border z-10 shadow-sm'
                  : 'text-muted-foreground bg-muted/40 border-transparent hover:bg-muted/60 hover:text-foreground'
                }
              `}
            >
              {/* Tab content */}
              <span className="flex items-center gap-2">
                {Icon && (
                  <Icon className={`h-4 w-4 transition-opacity duration-200 ${isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-80'}`} />
                )}
                <span>{tab.label}</span>
              </span>
            </button>
          )
        })}
      </div>

      {/* Bottom border that connects tabs */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
    </div>
  )
}

interface FolderTabPanelProps {
  children: ReactNode
  isActive: boolean
}

/**
 * Tab panel with fade animation
 */
export function FolderTabPanel({ children, isActive }: FolderTabPanelProps) {
  return (
    <div
      className={`
        transition-all duration-300 ease-out
        ${isActive
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-2 absolute pointer-events-none'
        }
      `}
    >
      {children}
    </div>
  )
}
