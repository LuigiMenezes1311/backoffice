export function formatApiError(error: any): string {
  if (error instanceof Error) {
    return error.message
  }

  if (typeof error === "string") {
    return error
  }

  if (error && typeof error === "object") {
    if (error.message) {
      return error.message
    }

    if (error.error) {
      return typeof error.error === "string" ? error.error : "Unknown error occurred"
    }
  }

  return "Unknown error occurred"
}

export function isNetworkError(error: any): boolean {
  return (
    error instanceof Error &&
    (error.message.includes("network") || error.message.includes("fetch") || error.message.includes("connection"))
  )
}

export function getErrorStatus(error: any): number | null {
  if (error && typeof error === "object" && error.status) {
    return Number(error.status)
  }
  return null
}
