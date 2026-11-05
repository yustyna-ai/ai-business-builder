import { useState, useEffect } from 'react'
import { supabase } from './supabase'

function App() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setMessage('Надсилаємо...')
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: 'https://ai-business-builder-app.netlify.app' }
    })
    if (error) setMessage(error.message)
    else setMessage('Перевір пошту!')
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  if (user) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Вітаю!</h1>
        <p>Ти увійшла як: {user.email}</p>
        <button onClick={handleLogout}>Вийти</button>
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>AI Business Builder</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Твій email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />
        <button type="submit">Увійти</button>
      </form>
      <p>{message}</p>
    </div>
  )
}

export default App