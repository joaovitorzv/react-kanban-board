import React, { Dispatch, SetStateAction, useRef } from 'react'
import { DraggableProvided, DraggableStateSnapshot, DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd'


import './styles.scss'
import '../../../styles/_vars.scss';

export enum StatusTypes {
  INBOX,
  NOT_STARTED,
  IN_PROGRESS,
  DONE
}

export interface ITask {
  title: string;
  description: string;
  status?: StatusTypes;
}

interface Props {
  title: string;
  description: string;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
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
      <h3>{props.title}</h3>
      <p>{props.description}</p>
    </div>
  );
}

export default Task