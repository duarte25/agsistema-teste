"use client";

import ToDoList from "@/components/toDoList.jsx";
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

export default function Home() {
  return (
  <div className="h-screen flex justify-center items-center">
      <ToDoList />
      <ToastContainer />
    </div>
  );
}
