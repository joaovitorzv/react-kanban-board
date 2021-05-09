import React, { useReducer } from 'react'
import {
  AiOutlineInbox,
  AiOutlineCoffee,
  AiOutlineHourglass,
  AiOutlineFire,
} from 'react-icons/ai'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { v4 } from 'uuid'

import Header from '../../common/components/Header'
import Stack from '../../common/components/Stack'
import Task from '../../common/components/Task'

import tasksReducer, { } from './reducers/tasksReducer'
import TaskDispatchTypes, { StackState } from './reducers/types'

import './styles.scss'
import '../../styles/_vars.scss'

const tasks = [
  { id: v4(), title: 'Task 1', description: 'Title 1 description' },
  { id: v4(), title: 'Task 2', description: 'Title 2 description' },
  { id: v4(), title: 'Task 3', description: 'Title 3 description' },
  { id: v4(), title: 'Task 4', description: 'Title 4 description' }
]

const stacksMock = {
  [v4()]: {
    name: 'Inbox',
    colorClass: 'inbox',
    icon: <AiOutlineInbox size={20} />,
    tasks
  },
  [v4()]: {
    name: 'Not started',
    colorClass: 'not-started',
    icon: <AiOutlineHourglass size={20} />,
    tasks: []
  },
  [v4()]: {
    name: 'In Progress',
    colorClass: 'in-progress',
    icon: <AiOutlineCoffee size={20} />,
    tasks: []
  },
  [v4()]: {
    name: 'Done',
    colorClass: 'done',
    icon: <AiOutlineFire size={20} />,
    tasks: []
  }
}

const initialState: StackState = stacksMock

const Tasks: React.FC = () => {
  const [stacks, dispatch] = useReducer(tasksReducer, initialState)

  return (
    <>
      <Header />
      <div className='stacks-container'>
        <DragDropContext
          onDragEnd={(result) => dispatch({ type: TaskDispatchTypes.MOVE_TASK, result, stacks })}
        >
          {Object.entries(stacks).map(([stackId, stack], idx) => {
            return (
              <Stack
                colorClass={stack.colorClass}
                icon={stack.icon}
                name={stack.name}
                key={stackId}
              >
                <Droppable droppableId={stackId} key={stackId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          minHeight: 200,
                          backgroundColor: snapshot.isDraggingOver
                            ? '#fff'
                            : '#f7f7f7'
                        }}
                      >
                        {stack.tasks.map((task, idx) => (
                          <Draggable
                            key={task.id}
                            draggableId={task.id}
                            index={idx}
                          >
                            {(provided, snapshot) => (
                              <Task
                                provided={provided}
                                snapshot={snapshot}
                                title={task.title}
                                description={task.description}
                              />
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )
                  }}
                </Droppable>
              </Stack>
            )
          })}
        </DragDropContext>
      </div>
    </>
  );
}

export default Tasks;
