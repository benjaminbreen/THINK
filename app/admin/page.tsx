'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    netlifyIdentity: {
      on: (event: string, callback: (user?: unknown) => void) => void
      init: () => void
    }
  }
}

export default function AdminPage() {
  useEffect(() => {
    // Load Netlify Identity widget for authentication
    const identityScript = document.createElement('script')
    identityScript.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js'
    identityScript.async = true
    document.head.appendChild(identityScript)

    identityScript.onload = () => {
      if (window.netlifyIdentity) {
        window.netlifyIdentity.init()
        window.netlifyIdentity.on('init', (user) => {
          if (!user) {
            window.netlifyIdentity.on('login', () => {
              document.location.href = '/admin/'
            })
          }
        })
      }
    }

    // Load Decap CMS
    const cmsScript = document.createElement('script')
    cmsScript.src = 'https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js'
    cmsScript.async = true
    document.body.appendChild(cmsScript)

    return () => {
      // Cleanup on unmount
      if (document.head.contains(identityScript)) {
        document.head.removeChild(identityScript)
      }
      if (document.body.contains(cmsScript)) {
        document.body.removeChild(cmsScript)
      }
    }
  }, [])

  return (
    <div id="nc-root" style={{ minHeight: '100vh' }}>
      {/* Decap CMS will mount here */}
    </div>
  )
}
