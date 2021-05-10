import React, { useReducer } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

import Header from '../../common/components/Header'
import Stack from '../../common/components/Stack'
import Task from '../../common/components/Task'

import tasksReducer from './reducers/tasksReducer'
import TaskDispatchTypes, { StackState, TasksActions } from './reducers/types'
import StacksStorage from '../../services/stacksStorage'

import './styles.scss'
import '../../styles/_vars.scss'

const initialState: StackState = StacksStorage.getStacks()

const Tasks: React.FC = () => {
  const [stacks, dispatch] = useReducer(tasksReducer, initialState)

  const actions: TasksActions = {
    addItem: (stackId, task) => {
      dispatch({ type: TaskDispatchTypes.ADD_TASK, stackId, task })
    },
    moveItem: (result) => {
      dispatch({ type: TaskDispatchTypes.MOVE_TASK, result })
    },
    removeItem: (stackId, task) => {
      dispatch({ type: TaskDispatchTypes.REMOVE_TASK, stackId, task })
    }
  }

  return (
    <>
      <Header />
      <div className='stacks-container'>
        <DragDropContext onDragEnd={(result) => actions.moveItem(result)}>
          {Object.entries(stacks).map(([stackId, stack]) => {
            return (
              <Stack
                colorClass={stack.colorClass}
                icon={stack.icon}
                name={stack.name}
                key={stackId}
                actions={actions}
                stackId={stackId}
              >
                <Droppable droppableId={stackId} key={stackId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
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
                                task={task}
                                stackId={stackId}
                                actions={actions}
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
