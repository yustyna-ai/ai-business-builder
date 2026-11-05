import { useState } from 'react'
import { supabase } from './supabase'

function App() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) setMessage(error.message)
    else setMessage('Перевір пошту!')
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