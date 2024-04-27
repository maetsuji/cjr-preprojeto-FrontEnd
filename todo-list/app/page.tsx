"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useState } from 'react';
import "./globals.css";

interface tasks {
  isComplete: boolean;
  taskName: string;
  taskID: number;
}


export default function Home() {
  const [task, setTask] = useState<tasks[]>();
  const [inputValue, setInputValue] = useState<>('');

  function AddTask() {
    const newTask: tasks = {isComplete: false, taskName: inputValue, taskID: Date.now()}
    const newList = task
    newList?.push(newTask);
    setTask(newList);
  }
  
  function DeleteTask() {
  
  }

  function ListHeader() {



    return(
      <header className="display-flex flex-wrap p-4">
          <input className="p-2 border-4"
          onChange={(e) => setInputValue(e.target.value)} 
          value={inputValue}
           type="text" 
           placeholder="Nova tarefa"/>
          <button className="p-2 border-4" onClick={AddTask}>botão!</button>
      </header>
    );
  }

  
  function ListBody() {

    return(
      
    );
  }
  
  function TodoList() {
  
    return(
      <main className="display-flex border-4 rounded-lg">
  
        <div className="display-inline-flex">
          <h1 className="font-bold text-6xl">PraFazê!</h1>
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="#000000" viewBox="0 0 256 256"><path d="M224,48V208a16,16,0,0,1-16,16H136a8,8,0,0,1,0-16h72V48H48v96a8,8,0,0,1-16,0V48A16,16,0,0,1,48,32H208A16,16,0,0,1,224,48ZM125.66,154.34a8,8,0,0,0-11.32,0L64,204.69,45.66,186.34a8,8,0,0,0-11.32,11.32l24,24a8,8,0,0,0,11.32,0l56-56A8,8,0,0,0,125.66,154.34Z"></path></svg>
        </div>
        <div> 
          <ListHeader />
          <ListBody />
        </div>  
      </main>
    );
  }

  return (
    <TodoList />
  );
}
