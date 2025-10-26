import { useEffect, useState } from 'react'

export function useCurrentRoute() {
  const [pathname, setPathname] = useState(window.location.pathname)

  useEffect(() => {
    const handleLocationChange = () => {
      setPathname(window.location.pathname)
    }

    // Listen for popstate events (back/forward navigation)
    window.addEventListener('popstate', handleLocationChange)
    
    // Listen for pushstate/replacestate events
    const originalPushState = window.history.pushState
    const originalReplaceState = window.history.replaceState
    
    window.history.pushState = function(...args) {
      originalPushState.apply(window.history, args)
      handleLocationChange()
    }
    
    window.history.replaceState = function(...args) {
      originalReplaceState.apply(window.history, args)
      handleLocationChange()
    }

    return () => {
      window.removeEventListener('popstate', handleLocationChange)
      window.history.pushState = originalPushState
      window.history.replaceState = originalReplaceState
    }
  }, [])

  return pathname
}

export function isActiveRoute(currentPath: string, targetPath: string): boolean {
  if (targetPath === '/') {
    return currentPath === '/'
  }
  return currentPath.startsWith(targetPath)
}
