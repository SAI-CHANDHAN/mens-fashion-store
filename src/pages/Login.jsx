import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { auth } from '../firebase'
import { loginAdmin } from '../services/authService'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/admin', { replace: true })
      }
    })

    return () => unsubscribe()
  }, [navigate])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!email.trim() || !password.trim()) {
      setStatus({
        type: 'error',
        message: 'Please enter both email and password.',
      })
      return
    }

    setIsSubmitting(true)
    setStatus({ type: '', message: '' })

    try {
      await loginAdmin(email, password)
      setStatus({
        type: 'success',
        message: 'Login successful. Redirecting to dashboard...',
      })
      navigate('/admin', { replace: true })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Login failed. Please check your credentials.',
      })
      alert('Login failed. Please verify your admin email/password.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto grid min-h-[calc(100vh-72px)] w-full max-w-7xl place-items-center px-4 py-8 md:px-8">
        <section className="luxury-panel w-full max-w-md p-6 md:p-8">
          <div className="mb-6 text-center">
            <p className="chip mx-auto w-fit">Admin Login</p>
            <h1 className="mt-4 font-display text-3xl text-obsidian">Store Control</h1>
            <p className="mt-2 text-sm text-black/65">
              Sign in with your Firebase admin account to manage products.
            </p>
          </div>

          {status.message && (
            <div
              className={`mb-5 rounded-xl border px-4 py-3 text-sm ${
                status.type === 'success'
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                  : 'border-red-200 bg-red-50 text-red-700'
              }`}
            >
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5 text-left">
              <label htmlFor="email" className="text-sm font-semibold text-obsidian">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@store.com"
                className="w-full rounded-xl border border-black/15 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-obsidian"
              />
            </div>

            <div className="space-y-1.5 text-left">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-obsidian"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-black/15 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-obsidian"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-obsidian px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Login