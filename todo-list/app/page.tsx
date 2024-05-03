"use client";
import { useRef, useEffect, useState } from 'react';
import "./globals.css";

function useSessionStorage<T>(key: string, defaultValue: any){
  const [state, setState] = useState<T>(() => {
    if (typeof window !== "undefined") {
      const storedValue = sessionStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } else {
      return defaultValue;
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state]);

  return [state, setState];
}

interface Task {
  isComplete: boolean;
  taskName: string;
  taskID: number;
}

interface Props {
task: Task;
toggleComplete: (id: number) => void;
deleteTask: (id: number) => void;
}

const TodoListItem: React.FC<Props> = ({
task,
toggleComplete,
deleteTask }) => {
return (
  <div className='text-wrap flex items-center justify-between mt-4 rounded-lg border-2 m-auto my-2'> 
    <input 
      type="checkbox" 
      checked={task.isComplete} 
      onChange={() => toggleComplete(task.taskID)}
      className="m-2 appearance-none w-5 h-5 border-2 mr-2 rounded-sm bg-white peer shrink-0
      checked:bg-terracota checked:border-0"
    />
    <label className="static">{task.taskName}</label>
    <button 
      className="m-2 align-self-center hover:scale-110 hover:fill-terracota" 
      onClick={() => deleteTask(task.taskID)}>
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 256 256">
        
          <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
        </svg>
      
    </button> 
  </div>
);
};

export default function Home() {
  const [tasks, setTasks] = useSessionStorage<Task[]>("tasks", []);
  const [filter, setFilter] = useState("all");
  const remainingTasks = tasks.reduce(
    (count: number, task: Task) => (task.isComplete ? count : count + 1),
    0
  );
  console.log(tasks)
  const filteredTasks = tasks.filter(
    (task: Task) => 
      filter === "all" || 
      (filter === "completed" && task.isComplete) || 
      (filter === "active" && !task.isComplete)
  );
  
  function AddTask() {

    let inputElement = document.querySelector("input");
    if (inputElement !== null) {
    const taskText: string = inputElement.value.trim();
    if (taskText !== "") {
      const newTask = {
        isComplete: false, 
        taskName: taskText, 
        taskID: Date.now()}
      setTasks([...tasks, newTask]);
      };
    inputElement.value = "";
    }
  }
  
  function deleteTask(id: number) {
    setTasks(tasks.filter((task: Task) => task.taskID !== id));
  }

  function toggleComplete(id: number) {
    const newList = 
    setTasks(
      tasks.map((task: Task) => 
        task.taskID == id ? { ...task, isComplete: !task.isComplete} : task
      )
    )
  }

  function ListHeader() {

    const inputRef = useRef<HTMLInputElement>(null);

    return(
      <header className="flex items-center justify-center p-4">
          <input autoFocus ref={inputRef} className="p-2 border-2 rounded-lg mr-2"
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                  AddTask();
                }
              }
            }
           type="text" 
           placeholder="Nova tarefa"/>
          <button className="ml-2 p-2 border-2 rounded-lg hover:bg-terracota hover:border-terracota transition-colors duration-300" onClick={AddTask}>Add</button>
      </header>
    );
  }

  
  function ListBody() {

    return( 
      <div
        className="max-h-screen overflow-y-auto px-1 my-2 justify-center"
       style={{ maxHeight: "35rem", minHeight: "10rem" }}
        id="to-do list"
      >
        {filteredTasks.length === 0 ? (
         <p
            className={`text-center self-center flex-col`}
        >
          Não há tarefas! Hora de descansar 😴
        </p>
        ) : (
          filteredTasks.map((task: Task) => (
            <TodoListItem
              key={task.taskID}
              task={task}
              toggleComplete={toggleComplete}
              deleteTask={deleteTask}
            />
          ))
        )}
    </div>
    );
  }
  
  function ListFooter() {
    return(
      <footer>
        <div className="flex items-center justify-evenly p-4">
        <button className="p-2 border-2 rounded-lg hover:bg-terracota hover:border-terracota transition-colors duration-300" onClick={() => setFilter("all")}>Todas</button>
        <button className="p-2 border-2 rounded-lg hover:bg-terracota hover:border-terracota transition-colors duration-300" onClick={() => setFilter("active")}>A Fazer</button>
        <button className="p-2 border-2 rounded-lg hover:bg-terracota hover:border-terracota transition-colors duration-300" onClick={() => setFilter("completed")}>Completas</button>
        </div>
        <div className="text-wrap flex items-center justify-evenly p-4">
          <div>
            {tasks.length === 0 ? (
              <p className="text-center"></p>
            ) : (
            <p className="text-center">Tarefas restantes: {remainingTasks}</p>
            )}
          </div>
          <div>
            {tasks.length !== 0 ? (
              <button className="p-2 border-2 rounded-lg hover:bg-terracota hover:border-terracota transition-colors duration-300" 
                onClick={() => {
                  const incompleteTasks = tasks.filter((task: Task) => !task.isComplete);
                  setTasks(incompleteTasks);
                }}
                >Limpar Concluidas
              </button>
              ) : (
              <p className="text-center"></p>
            )}

          </div>
        </div>
      </footer>
    );
  }

  function TodoList() {
  
    return(
      <main className="m-auto w-fit display-flex border-gray-dark rounded-lg p-2 border-2">
        <div className="flex items-center justify-center mt-4">
          <h1 className="font-bold text-6xl mr-4">PraFazê!</h1>
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="gray-dark" viewBox="0 0 256 256"><path d="M224,48V208a16,16,0,0,1-16,16H136a8,8,0,0,1,0-16h72V48H48v96a8,8,0,0,1-16,0V48A16,16,0,0,1,48,32H208A16,16,0,0,1,224,48ZM125.66,154.34a8,8,0,0,0-11.32,0L64,204.69,45.66,186.34a8,8,0,0,0-11.32,11.32l24,24a8,8,0,0,0,11.32,0l56-56A8,8,0,0,0,125.66,154.34Z"></path></svg>
        </div>
        <div> 
          <ListHeader />
          <ListBody />
          <ListFooter />
        </div>
      </main>
    );
  }

  return (
    <div className="flex-auto  h-screen items-center justify-self-center justify-center content-center">
      <TodoList />
    </div>
    
  );
}
