import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Anecdote from './components/Anecdote'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const App = () => {

  const { dispatch } = useContext(NotificationContext)

  const queryClient = useQueryClient()

  const voteAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes');
      const updatedAnecdotes = anecdotes.map((anecdote) =>
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      );
      queryClient.setQueryData('anecdotes', updatedAnecdotes);
    },
  });
  
  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    dispatch({ type: 'SET_NOTIFICATION', notification: `you voted '${anecdote.content}'` })
  };
  
  const getAnecdotesResult = useQuery(
    'anecdotes', getAnecdotes,
    { retry:1 })
  if(getAnecdotesResult.isLoading) {
    return <div>Loading...</div>
  }
  else if(getAnecdotesResult.isError) {
    return <div>Error: {getAnecdotesResult.error.message}</div>
  }
  const anecdotes = getAnecdotesResult.data
 

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} handleVote={handleVote} />
      ))}
    </div>
  )
}

export default App
