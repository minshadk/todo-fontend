import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const login = async (userName, password) => {
    console.log("loaing is running")
    setIsLoading(true)
    setError(null)

    const response = await fetch('https://todo-backend-3s50.onrender.com/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName,
        password,
      }),
    })

    const json = await response.json()

    if (!response.ok) {
      console.log(json.message)
      setIsLoading(false)
      setError(json.message)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({ type: 'LOGIN', payload: json })

      // update loading state
      setIsLoading(false)
    }
  }

  return { login, isLoading, error }
}
