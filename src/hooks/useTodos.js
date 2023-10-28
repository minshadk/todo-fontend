import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

const baseUrl = 'https://todo-backend-3s50.onrender.com'

export const useTodos = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { user } = useAuthContext()

  const createTodo = async (title, description, dueDate, priority, status) => {
    setIsLoading(true)
    setError(null)
    console.log(title, description, dueDate, priority, status)
    try {
      const token = user.token

      const response = await fetch(`${baseUrl}/api/todo/createTodo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          dueDate,
          priority,
          status,
        }),
      })

      if (!response.ok) {
        const json = await response.json()
        setError(json.error)
      }
    } catch (error) {
      setError('An error occurred while creating the todo.')
    } finally {
      setIsLoading(false)
    }
  }

  const getAllTodos = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const token = user.token

      const response = await fetch(`${baseUrl}/api/todo`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const json = await response.json()
        setIsLoading(false)
        setError(json.error)
      }

      if (response.ok) {
        const json = await response.json()
        console.log(json)
        setIsLoading(false)

        return json
      }
    } catch (error) {
      setError('An error occurred while creating the todo.')
    } finally {
      setIsLoading(false)
    }
  }
  const getTodoById = async (todoId) => {
    setIsLoading(true)
    setError(null)
    try {
      const token = user.token

      const response = await fetch(`${baseUrl}/api/todo/${todoId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const json = await response.json()
        setIsLoading(false)
        setError(json.error)
      }

      if (response.ok) {
        const json = await response.json()
        setIsLoading(false)

        return json
      }
    } catch (error) {
      setError('An error occurred while fetching todo.')
    } finally {
      setIsLoading(false)
    }
  }
  const deleteTodo = async (todoId) => {
    setIsLoading(true)
    setError(null)
    try {
      const token = user.token

      const response = await fetch(`${baseUrl}/api/todo/${todoId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const json = await response.json()
        setError(json.error)
      }

      if (response.ok) {
        const json = await response.json()
        console.log(json)
        return json
      }
    } catch (error) {
      setError('An error occurred while fetching todo.')
    } finally {
      setIsLoading(false)
    }
  }
  const updateTodo = async (todoId, updatedTodoData) => {
    setIsLoading(true)
    setError(null)
    try {
      const token = user.token

      const response = await fetch(`${baseUrl}/api/todo/${todoId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedTodoData),
      })

      if (!response.ok) {
        const json = await response.json()
        setError(json.error)
      }

      if (response.ok) {
        const json = await response.json()
        console.log(json)
        return json
      }
    } catch (error) {
      setError('An error occurred while fetching todo.')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    createTodo,
    getAllTodos,
    getTodoById,
    updateTodo,
    deleteTodo,
    isLoading,
    error,
  }
}
