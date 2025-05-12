"use client"

import { useState } from "react"
import { useApi } from "@/lib/api-context"
import { useToast } from "@/components/ui/use-toast"

export function useApiMutation<T, P>(
  mutationFn: (params: P) => Promise<T>,
  options?: {
    onSuccess?: (data: T) => void
    onError?: (error: Error) => void
    successMessage?: string
  },
) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { setError: setGlobalError } = useApi()
  const { toast } = useToast()

  const mutate = async (params: P): Promise<T | null> => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await mutationFn(params)

      if (options?.successMessage) {
        toast({
          title: "Sucesso",
          description: options.successMessage,
        })
      }

      if (options?.onSuccess) {
        options.onSuccess(result)
      }

      return result
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error("An unknown error occurred")
      setError(errorObj.message)
      setGlobalError(errorObj.message)

      toast({
        title: "Erro",
        description: errorObj.message,
        variant: "destructive",
      })

      if (options?.onError) {
        options.onError(errorObj)
      }

      return null
    } finally {
      setIsLoading(false)
    }
  }

  return { mutate, isLoading, error }
}
