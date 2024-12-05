"use client";

import TodoList from "@/components/toDolist";
import { ToastContainer } from 'react-toastify';  // Importando o ToastContainer
import 'react-toastify/dist/ReactToastify.css';   // Importando os estilos do Toastify

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <TodoList />
      <ToastContainer />
    </div>
  );
}
