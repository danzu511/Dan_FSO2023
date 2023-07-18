import { AnecdoteForm } from './components/AnecdoteForm';
import { AnectodeList } from './components/AnecdoteList';
import Filter from './components/Filter';
import Notification from './components/Notification';
import { initializeAnecdotes } from './reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteForm />
      <AnectodeList />
    </div>
  );
};

export default App;
