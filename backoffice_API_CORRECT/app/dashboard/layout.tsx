import type React from "react"
import { Header } from "@/components/header"
import { ApiErrorHandler } from "@/components/api-error-handler"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1 container py-6">{children}</div>
      <ApiErrorHandler />
    </div>
  )
}
