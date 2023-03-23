import { useMutation, useQueryClient } from "react-query"

import { createAnecdote } from "../services/requests"
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const anecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    },
    onError: () => {
      dispatch({ type: "ERROR" })
      setTimeout(() => {
        dispatch({ type: "NULL" })
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    anecdoteMutation.mutate({ content, votes: 0 })
    dispatch({
      type: "CREATE",
      payload: content
    })
    setTimeout(() => {
      dispatch({ type: "NULL" })
  }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
