import Footer from "./components/Footer"
import Header from "./components/Header"

import styles from './App.module.css'
import TaskForm from "./components/TaskForm"

import { ITask } from "./interfaces/Task"
import { useState } from "react"
import TaskList from "./components/TaskList"
import Modal from "./components/Modal"

export default function App() {
  const [taskList, setTaskList] = useState<ITask[]>([])
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null)

  const deleteTask = (id: number) => {
    setTaskList(
      taskList.filter(task => {
        return task.id != id
      })
    )
  }

  const hideOrShowModal = (display: boolean) => {
    const modal = document.querySelector("#modal")
    if (display) {
      modal!.classList.remove("hide")
    } else {
      modal?.classList.add("hide")
    }
  }


  const editTask = (task: ITask): void => {
    hideOrShowModal(true)
    setTaskToUpdate(task)
  }

  const updateTask = (id: number, title: string, difficulty: number)=>{
    const updateTask: ITask = {id, title, difficulty}
    const updatedItems = taskList.map((task)=>{
      return task.id === updateTask.id ? updateTask : task
    })

    setTaskList(updatedItems)
    hideOrShowModal(false)
  }

  return (
    <div>
      <Modal children={<TaskForm task={taskToUpdate} handleUpdate={updateTask} btnText="Editar tarefa" taskList={taskList} />} />
      <Header />
      <main className={styles.main}>
        <div>
          <h2>O que você vai fazer?</h2>
          <TaskForm btnText="Criar tarefa"
            taskList={taskList} setTaskList={setTaskList} />
          <div><
            h2>Suas tarefas</h2>
            <TaskList taskList={taskList} handleDelete={deleteTask} handleEdit={editTask} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

