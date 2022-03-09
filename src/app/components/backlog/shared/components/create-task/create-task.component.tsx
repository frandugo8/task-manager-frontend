
import React, { useEffect, useRef, useState } from 'react'
import { useOutside } from '../../../../../shared/hooks/useOutside.hook'
import styles from './create-task.module.scss'

export default function CreateTaskComponent() {
  const [isInputVisible, setIsInputVisible] = useState<boolean>(false)
  const inputRef = useRef<any>()

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

  const handleInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      console.log("Text", inputRef.current.value)
    }
  }

  return (
    <>
      {isInputVisible?
        <input className={styles.input} type="text" ref={inputRef} placeholder={"¿Qué se debe hacer?"} onKeyPress={handleInputKeyPress}/>
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
