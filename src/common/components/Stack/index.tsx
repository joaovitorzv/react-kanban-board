import React, { useState } from 'react'
import { v4 } from 'uuid'
import {
  AiOutlineInbox,
  AiOutlineCoffee,
  AiOutlineHourglass,
  AiOutlineFire,
} from 'react-icons/ai'

import { TasksActions } from '../../../routes/Tasks/reducers/types'
import { useToggle } from '../../../utils'

import './styles.scss';
import '../../../styles/_global.scss'

interface Props {
  name: string;
  colorClass: string;
  icon: 'inbox' | 'notStarted' | 'inProgress' | 'done';
  actions: TasksActions
  stackId: string;
}

const icons = {
  inbox: <AiOutlineInbox size={20} />,
  notStarted: <AiOutlineHourglass size={20} />,
  inProgress: <AiOutlineCoffee size={20} />,
  done: <AiOutlineFire size={20} />
}

const Stack: React.FC<Props> = (props) => {
  const [showTaskForm, setShowTaskForm] = useToggle()
  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [formError, setFormError] = useState(false)

  function handleAddTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (taskTitle.length === 0) return setFormError(true)

    props.actions.addItem(props.stackId, { id: v4(), title: taskTitle, description: taskDescription })
    setTaskTitle('')
    setTaskDescription('')
  }

  return (
    <div className='stack-container'>
      <div className={`task-header ${props.colorClass}`}>
        {(icons[props.icon])}
        <h2>{props.name}</h2>
      </div>
      {props.children}
      <div className='actions-container'>
        <form
          className={`actions-container__form${!showTaskForm ? '--hidden' : ''}`}
          onSubmit={(e) => handleAddTask(e)}
        >
          <button
            type={!showTaskForm ? 'submit' : 'button'}
            className='action-button'
            onClick={setShowTaskForm}
          >
            adicionar {taskTitle ? taskTitle : 'task'}
          </button>
          <input
            type='text'
            placeholder='Titulo'
            value={taskTitle}
            onChange={e => setTaskTitle(e.target.value)}
          />
          {formError && <p className='error-message'>Preencha ao menos o título</p>}
          <textarea
            placeholder='Descrição'
            rows={4}
            value={taskDescription}
            onChange={e => setTaskDescription(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
}

export default Stack;