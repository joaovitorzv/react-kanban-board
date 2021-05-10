import React from 'react'
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'
import { AiOutlineDelete } from 'react-icons/ai'

import { TasksActions, TaskState } from '../../../routes/Tasks/reducers/types'

import './styles.scss'
import '../../../styles/_vars.scss';

interface Props {
  task: TaskState;
  stackId: string;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  actions: TasksActions;
}

const Task: React.FC<Props> = (props) => {

  return (
    <div
      className={`task-container ${props.snapshot.isDragging ? '.isDragging' : null}`}
      ref={props.provided.innerRef}
      {...props.provided.draggableProps}
      {...props.provided.dragHandleProps}
      style={{
        userSelect: 'none',
        backgroundColor: props.snapshot.isDragging
          ? '#fff'
          : '#f7f7f7',
        ...props.provided.draggableProps.style
      }}
    >
      <div>
        <h3>{props.task.title}</h3>
        <p>{props.task.description}</p>
      </div>
      <button
        className='delete-task'
        onClick={() => props.actions.removeItem(props.stackId, props.task)}
      >
        <AiOutlineDelete size={20} />
      </button>
    </div>
  );
}

export default Task