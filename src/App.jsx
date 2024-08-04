import {React, useEffect, useState} from 'react';
function App(){
  const [todos,setTodos]=useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch("https://sum-server.100xdevs.com/todos");
        const json = await res.json();
        setTodos(json.todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
      // Initial fetch
      fetchTodos();

      // Set up interval to fetch todos every 10 seconds
      const interval = setInterval(fetchTodos, 10000);
  
      // Clean up interval on component unmount
      return () => clearInterval(interval);
    }, []);
  return <>
  {/* {todos.map(todo=>(<Todos key={todo.id} title={todo.title} description={todo.description} completed={todo.completed} />))} */}
  {todos.map(todo => (
        <Todos
          key={todo.id}
          title={todo.title}
          description={todo.description}
          completed={todo.completed}
        />
      ))}
  </>
}

function Todos({title,description,completed } ){
  return <>
    <h2>{title}</h2>
    <h3>{description}</h3>
    <button>  {completed ? "Completed" : "Mark as Complete"}</button>
  </>
}

export default App;