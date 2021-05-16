import { useEffect, useState, useCallback } from 'react'
import queryString, { ParsedQuery, ParseOptions } from 'query-string'

const parseOptions: ParseOptions = {
  arrayFormat: 'index'
}

export const useQueryState = function<
  T extends ParsedQuery
>(defaultValue?: T): [
  T,
  (query: any) => void
] {
  const getQueryWithDefault = useCallback(() => {
    const query = queryString.parse(
      window.location.search, parseOptions
    ) as T

    return { ...defaultValue, ...query }
  }, [defaultValue])

  const [queryState, setQueryState] = useState<T>(getQueryWithDefault())

  const updateQuery = useCallback((query?) => { 
    query = { ...getQueryWithDefault(), ...query }
    const str = queryString.stringify(query, parseOptions)
    window.history.pushState(null, '', `?${str}`)
    setQueryState(query)
  }, [getQueryWithDefault])

  useEffect(() => {
    updateQuery()
  }, [updateQuery])

  useEffect(() => {
    const handler = () => setQueryState(getQueryWithDefault())
    window.addEventListener('popstate', handler)
    return () => window.removeEventListener('popstate', handler)
  }, [getQueryWithDefault])

  return [queryState, updateQuery]
}
