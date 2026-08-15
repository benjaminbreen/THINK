'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Send } from 'lucide-react'
import { siteConfig } from '@/lib/config'
import { cn } from '@/lib/utils'

/* 16px text on small screens keeps iOS Safari from zooming in on focus */
const fieldClass =
  'flex h-11 w-full rounded-lg border border-input bg-background px-3.5 text-base placeholder:text-muted-foreground/70 ' +
  'transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:h-10 sm:text-sm'

const labelClass = 'block text-sm font-medium leading-none text-foreground'

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    affiliation: '',
    type: 'project',
    message: ''
  })

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Construct mailto link with form data
    const subject = `THINK Submission: ${formData.type.charAt(0).toUpperCase() + formData.type.slice(1)}`
    const body = `Name: ${formData.name}
Email: ${formData.email}
Affiliation: ${formData.affiliation}
Type: ${formData.type}

Message:
${formData.message}`

    const mailtoLink = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailtoLink

    setSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (submitted) {
    return (
      <Card className="border-amber-200/70 dark:border-amber-900/30">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
              <Mail className="h-5 w-5 text-amber-600 dark:text-amber-500" />
            </div>
            <div>
              <CardTitle className="text-xl">Thank you!</CardTitle>
              <CardDescription>Your email client should open shortly.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-5 text-muted-foreground">
            We've prepared an email with your submission. If your email client didn't open automatically,
            please send your message to <a href={`mailto:${siteConfig.email}`} className="text-amber-700 dark:text-amber-500 hover:underline">{siteConfig.email}</a>.
          </p>
          <Button onClick={() => setSubmitted(false)} variant="outline" ripple>
            Submit another message
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-amber-200/70 dark:border-amber-900/30">
      <CardHeader>
        <CardTitle className="text-xl">Get in Touch</CardTitle>
        <CardDescription>
          Fill out the form below and we'll get back to you as soon as possible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contact form">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className={labelClass}>
                Name <span aria-hidden="true">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                aria-required="true"
                aria-describedby="name-hint"
                value={formData.name}
                onChange={handleChange}
                className={fieldClass}
                placeholder="Your name"
              />
              <span id="name-hint" className="sr-only">Required field</span>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className={labelClass}>
                Email <span aria-hidden="true">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                aria-required="true"
                aria-describedby="email-hint"
                value={formData.email}
                onChange={handleChange}
                className={fieldClass}
                placeholder="you@example.com"
              />
              <span id="email-hint" className="sr-only">Required field, enter a valid email address</span>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="affiliation" className={labelClass}>
              Affiliation
            </label>
            <input
              id="affiliation"
              name="affiliation"
              type="text"
              aria-describedby="affiliation-hint"
              value={formData.affiliation}
              onChange={handleChange}
              className={fieldClass}
              placeholder="University or organization (optional)"
            />
            <span id="affiliation-hint" className="sr-only">Optional field</span>
          </div>

          <div className="space-y-2">
            <label htmlFor="type" className={labelClass}>
              Submission Type <span aria-hidden="true">*</span>
            </label>
            <select
              id="type"
              name="type"
              required
              aria-required="true"
              value={formData.type}
              onChange={handleChange}
              className={fieldClass}
            >
              <option value="project">Share a Project</option>
              <option value="collaboration">Propose a Collaboration</option>
              <option value="question">Ask a Question</option>
              <option value="feedback">Provide Feedback</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className={labelClass}>
              Message <span aria-hidden="true">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              aria-required="true"
              aria-describedby="message-hint"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              className={cn(fieldClass, "h-auto resize-y py-2.5")}
              placeholder="Tell us about your project, idea, or question..."
            />
            <span id="message-hint" className="sr-only">Required field</span>
          </div>

          <Button
            type="submit"
            aria-label="Send message"
            className="w-full bg-amber-600 text-white hover:bg-amber-700 sm:w-auto"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            Send Message
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
