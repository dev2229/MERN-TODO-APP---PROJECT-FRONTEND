import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, createTodo, updateTodoAsync, deleteTodoAsync } from './features/todoAsyncActions';

function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const [newTodo, setNewTodo] = useState('');
  const [updateTodoText, setUpdateTodoText] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [updatingTodo, setUpdatingTodo] = useState(null);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleCreateTodo = () => {
    if (newTodo.trim() === '') {
      return;
    }

    dispatch(createTodo({ text: newTodo, completed: false }));
    setNewTodo('');
  };

  const handleStartUpdate = (todo) => {
    setUpdatingTodo(todo);
    setUpdateTodoText(todo.text);
  };

  const handleCancelUpdate = () => {
    setUpdatingTodo(null);
    setUpdateTodoText('');
  };

  const handleUpdateTodo = async () => {
    if (!updatingTodo || updateTodoText.trim() === '') {
      return;
    }

    try {
      await dispatch(updateTodoAsync(updatingTodo._id, { text: updateTodoText, completed: updatingTodo.completed }));
      setUpdatingTodo(null);
      setUpdateTodoText('');
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleToggleComplete = (id) => {
    dispatch(updateTodoAsync(id, { completed: !todos.find(todo => todo._id === id).completed }));
  };
  

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodoAsync(id));
  };

  return (
    <div className="App">
      <h1>TODO List</h1>
      <div className='top-main'>
        <input
          type="text"
          placeholder="New Todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCreateTodo()}
        />
        <button onClick={handleCreateTodo}>Add Todo</button>
      </div>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleComplete(todo._id)}
            />
            {updatingTodo === todo ? (
              <>
                <input
                  type="text"
                  value={updateTodoText}
                  onChange={(e) => setUpdateTodoText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUpdateTodo();
                    } else if (e.key === 'Escape') {
                      handleCancelUpdate();
                    }
                  }}
                  placeholder="Update todo text"
                />
                <button onClick={handleUpdateTodo}>Save</button>
                <button onClick={handleCancelUpdate}>Cancel</button>
              </>
            ) : (
              <>
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none', marginRight: '10px' }}>{todo.text}</span>
                <button onClick={() => handleStartUpdate(todo)}>Update</button>
                <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
