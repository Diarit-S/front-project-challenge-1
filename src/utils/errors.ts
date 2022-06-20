type ErrorWithMessage = {
  message: string
}

const isErrorWithMessage = (error: unknown): error is ErrorWithMessage => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  )
}

const toErrorWithMessage = (potentialError: unknown): ErrorWithMessage => {
  if (isErrorWithMessage(potentialError)) return potentialError

  try {
    return new Error(JSON.stringify(potentialError))
  } catch {
    // fallback in case there's an error stringifying the potentialError
    // like with circular references for example.
    return new Error(String(potentialError))
  }
}

export const getErrorMessage = (error: unknown): string => {
  return toErrorWithMessage(error).message
}
