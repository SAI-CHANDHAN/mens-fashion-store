import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { auth } from '../firebase'

function ProtectedRoute({ children }) {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Keep route guard in sync with Firebase auth session state.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(Boolean(user))
      setIsCheckingAuth(false)
    })

    return () => unsubscribe()
  }, [])

  if (isCheckingAuth) {
    return (
      <div className="grid min-h-screen place-items-center px-4">
        <p className="rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-semibold text-black/70 shadow-soft">
          Checking admin access...
        </p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute