
import React, { useEffect, useRef, useState } from 'react'
import { useOutside } from '../../../../../shared/hooks/useOutside.hook'
import { Task } from '../../../../../shared/models/task.interface'
import { addTask } from '../../../../../shared/redux/slices/boards.slice'
import { useAppDispatch } from '../../../../../shared/redux/store/store'
import { taskManagerRemoteService } from '../../../../../shared/services/remote/task-manager/task-manager.remote.service'
import styles from './create-task.module.scss'

interface CreateTaskProps {
  boardId: string
}

export default function CreateTaskComponent({boardId}: CreateTaskProps) {
  const [isInputVisible, setIsInputVisible] = useState<boolean>(false)
  const inputRef = useRef<any>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isInputVisible) {
      inputRef.current.focus()
    }
  }, [isInputVisible])

  useOutside({
    ref: inputRef,
    callback: () => {
      setIsInputVisible(false)
    }
  })

  const handleButtonClick = (): void => {
    setIsInputVisible(true)
  }

  const handleInputKeyPress = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputRef.current.value !== "") {
      const task: Task = {
        id: "",
        title: inputRef.current.value,
        status: "to-do"
      }

      inputRef.current.value = ""

      const response = await taskManagerRemoteService.addTask("default", boardId, task.title).then(async (response) => await response.json())
      task.id = response.taskId
      dispatch(addTask({boardId, task}))
    }
  }

  return (
    <>
      {isInputVisible?
        <input className={styles.input} aria-label="add-task" type="text" ref={inputRef} placeholder={"¿Qué se debe hacer?"} onKeyPress={handleInputKeyPress}/>
        : <button type="button" className={styles.button} onClick={handleButtonClick}>
            <div className={styles.add}>
              <div className={styles.add__icon}>+</div>
            </div>
            <div className={styles.button__text}>Crear tarea</div>
          </button>
      }
    </>
    
  )
}
