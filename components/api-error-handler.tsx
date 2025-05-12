"use client"

import { useEffect } from "react"
import { useApi } from "@/lib/api-context"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ApiErrorHandler() {
  const { error, clearError } = useApi()
  const { toast } = useToast()

  useEffect(() => {
    if (error) {
      toast({
        title: "Erro",
        description: error,
        variant: "destructive",
      })
    }
  }, [error, toast])

  if (!error) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Erro</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
        <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={clearError}>
          <X className="h-4 w-4" />
        </Button>
      </Alert>
    </div>
  )
} 