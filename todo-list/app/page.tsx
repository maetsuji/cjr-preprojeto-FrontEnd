"use client";
import { useRef, useEffect, useState } from 'react';
import "./globals.css";

function useSessionStorage<T>(key: string, defaultValue: any){
  const [state, setState] = useState<Task[]>(() => {
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
  <div className='text-wrap flex items-center justify-between mt-4 mx-3 rounded-lg border-2 m-auto my-2'> 
    <input 
      type="checkbox" 
      checked={task.isComplete} 
      onChange={() => toggleComplete(task.taskID)}
      className="m-2 appearance-none w-5 h-5 border-2 mr-2 rounded-sm bg-white peer shrink-0
      checked:bg-terracota checked:border-0"
    />

    <label style={{ textDecoration: task.isComplete ? "line-through" : 'none'}} className="p-2 text-center text-wrap static">{task.taskName}</label>
    
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
      <header className="text-gray-dark border-gray-dark flex items-center justify-center p-4">
          <input id='entrada' autoFocus ref={inputRef} className="p-2 border-2 rounded-lg mr-2"
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                  AddTask();
                }
              }
            }
           type="text" 
           placeholder="Nova tarefa"/>
          <button 
            className="
              ml-2 p-1
              border-2 rounded-lg 
              text-white border-gray-dark bg-gray-dark 
              hover:bg-terracota hover:border-terracota 
              transition-colors duration-300" 
            onClick={AddTask}>
              <svg className='fill-white' xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z"></path></svg>
          </button>
      </header>
    );
  }

  
  function ListBody() {

    return( 
      <div
        className="max-h-screen overflow-y-auto px-1 my-2 mb-3 justify-center"
       style={{ maxHeight: "35rem", minHeight: "10rem" }}
        id="to-do list"
      >
        {filteredTasks.length === 0 ? (
         <p className={`text-gray-dark text-center self-center flex-col`}>
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
          <button className="min-w-20 p-2 border-2 rounded-lg text-gray-dark border-gray-dark hover:bg-terracota hover:border-terracota transition-colors duration-300" onClick={() => setFilter("all")}>Todas</button>
          <button className="min-w-20 p-2 border-2 rounded-lg text-gray-dark border-gray-dark hover:bg-terracota hover:border-terracota transition-colors duration-300" onClick={() => setFilter("active")}>A Fazer</button>
          <button className="min-w-20 p-2 border-2 rounded-lg text-gray-dark border-gray-dark hover:bg-terracota hover:border-terracota transition-colors duration-300" onClick={() => setFilter("completed")}>Feitas</button>
        </div>
        <div className="text-wrap flex items-center justify-between p-3">
          <div>
            {tasks.length === 0 ? (
              <p className= "text-wrap text-center"></p>
            ) : (
            <p className="border-black mx-2 text-wrap text-center">Tarefas restantes: {remainingTasks}</p>
            )}
          </div>
          <div>
            {tasks.length !== 0 ? (
              <button className= "text-gray-dark border-gray-dark mx-2 p-2 border-2 rounded-lg hover:bg-terracota hover:border-terracota transition-colors duration-300" 
                onClick={() => {
                  const incompleteTasks = tasks.filter((task: Task) => !task.isComplete);
                  setTasks(incompleteTasks);
                }}
                >Limpar Feitas
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
    //function focusInput() {
    //  let InputBox = document.querySelector("input"); 
    //  if (InputBox !== null) {
    //   InputBox.focus();
    //  } 
    //} 
    return(
      <main className="flex flex-col justify-center align-center m-auto max-w-96 flex border-gray-dark rounded-3xl p-2 border-2">
        <div className="flex items-center justify-center mx-2 mt-2">
          <h1 className="font-bold text-gray-dark text-6xl mr-4">PraFazê!</h1>
          {/* <button onClick={focusInput()}> */}
          <svg className="fill-gray-dark active:animate-bounce hover:fill-terracota transition-colors duration-300" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 256 256"><path d="M224,48V208a16,16,0,0,1-16,16H136a8,8,0,0,1,0-16h72V48H48v96a8,8,0,0,1-16,0V48A16,16,0,0,1,48,32H208A16,16,0,0,1,224,48ZM125.66,154.34a8,8,0,0,0-11.32,0L64,204.69,45.66,186.34a8,8,0,0,0-11.32,11.32l24,24a8,8,0,0,0,11.32,0l56-56A8,8,0,0,0,125.66,154.34Z"></path></svg>
          {/* </button> */} 
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
    <div className="h-screen w-screenz m-auto flex justify-center align-center content-center">
      <TodoList />
    </div>
    
  );
}
