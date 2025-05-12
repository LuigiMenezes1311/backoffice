"use client"

import { useState, useEffect } from "react"
import { useApi } from "@/lib/api-context"

export function useApiQuery<T>(
  queryFn: () => Promise<T>,
  dependencies: any[] = [],
): {
  data: T | null
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
} {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { setError: setGlobalError } = useApi()

  const fetchData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await queryFn()
      setData(result)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred"
      setError(errorMessage)
      setGlobalError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

  const refetch = async () => {
    await fetchData()
  }

  return { data, isLoading, error, refetch }
}
