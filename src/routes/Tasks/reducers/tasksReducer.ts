import React from 'react'
import { DropResult } from 'react-beautiful-dnd'
import { ITask } from '../../../common/components/Task'
import TaskDispatchTypes, { StackState } from './types'

interface TasksAction {
  type: TaskDispatchTypes;
  result: DropResult;
  stacks: StackState;
}

function tasksReducer(state: StackState, action: TasksAction): StackState {
  switch (action.type) {
    case TaskDispatchTypes.ADD_TASK:
      return {
        tasks: { ...state.tasks }
      }
    case TaskDispatchTypes.MOVE_TASK:
      if (!action.result.destination) {
        return state
      }
      const { source, destination } = action.result

      if (source.droppableId !== destination.droppableId) {
        const sourceStack = action.stacks[source.droppableId]
        const destStack = action.stacks[destination.droppableId]
        const sourceTasks = [...sourceStack.tasks]
        const destTasks = [...destStack.tasks]
        const [removed] = sourceTasks.splice(source.index, 1)
        destTasks.splice(destination.index, 0, removed)
        return {
          ...action.stacks,
          [source.droppableId]: {
            ...sourceStack,
            tasks: sourceTasks
          },
          [destination.droppableId]: {
            ...destStack,
            tasks: destTasks
          }
        }
      } else {
        const stack = action.stacks[source.droppableId]
        const copiedTasks = [...stack.tasks]
        const [removed] = copiedTasks.splice(source.index, 1)
        copiedTasks.splice(destination.index, 0, removed)

        return {
          ...action.stacks,
          [source.droppableId]: {
            ...stack,
            tasks: copiedTasks
          }
        }
      }
    default:
      return state
  }
}


export default tasksReducer;