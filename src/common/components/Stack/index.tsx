import React, { Dispatch, ReactNode, useRef, useState } from 'react';

import Task, { ITask, StatusTypes } from '../Task'

import { useToggle } from '../../../utils'

import './styles.scss';
import '../../../styles/_global.scss'

export interface StackActions {
  addItem: (task: ITask) => void;
  moveItem: (task: ITask, draggingTask: number | undefined, draggingOverTask: number | undefined) => void;
}

interface Props {
  name: string;
  colorClass: string;
  icon: ReactNode;
}

const Stack: React.FC<Props> = ({ children, name, colorClass, icon }) => {
  const [showTaskForm, setShowTaskForm] = useToggle()
  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [formError, setFormError] = useState(false)


  return (
    <div className='stack-container'>
      <div className={`task-header ${colorClass}`}>
        {icon}
        <h2>{name}</h2>
      </div>
      {children}
      <div className='actions-container'>
        <form className={`actions-container__form${!showTaskForm ? '--hidden' : ''}`}>
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