"use client"

import { useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorBoundaryProps {
  error: Error
  reset: () => void
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  const { toast } = useToast()

  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Unhandled error:", error)

    toast({
      title: "Erro",
      description: "Ocorreu um erro inesperado. Por favor, tente novamente.",
      variant: "destructive",
    })
  }, [error, toast])

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-md">
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>Ocorreu um erro ao carregar esta página. Por favor, tente novamente.</AlertDescription>
        </Alert>

        <div className="text-sm text-muted-foreground mb-6">
          <p>Detalhes do erro:</p>
          <pre className="mt-2 p-4 bg-muted rounded-md overflow-auto">{error.message}</pre>
        </div>

        <div className="flex justify-end space-x-4">
          <Button onClick={() => (window.location.href = "/")} variant="outline">
            Voltar para o início
          </Button>
          <Button onClick={reset}>Tentar novamente</Button>
        </div>
      </div>
    </div>
  )
}
