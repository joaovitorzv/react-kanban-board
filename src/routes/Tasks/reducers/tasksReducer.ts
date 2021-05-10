import { DropResult } from 'react-beautiful-dnd'
import TaskDispatchTypes, { StackState, TaskState } from './types'
import StacksStorage from '../../../services/stacksStorage'

interface TasksAction {
  type: TaskDispatchTypes;
  result?: DropResult;
  task?: TaskState
  stackId?: string;
}

function tasksReducer(state: StackState, action: TasksAction): StackState {
  const sourceStack = state[action.stackId || action.result!.source.droppableId]
  const sourceTasks = [...sourceStack.tasks]

  switch (action.type) {
    case TaskDispatchTypes.ADD_TASK:
      if (!action.task || !action.stackId) return state

      sourceTasks.push({
        id: action.task?.id,
        title: action.task?.title,
        description: action.task?.description
      })

      return {
        ...state,
        [action.stackId]: {
          ...state[action.stackId],
          tasks: sourceTasks
        }
      }
    case TaskDispatchTypes.MOVE_TASK:
      const { source, destination } = action.result!
      if (!destination) return state

      if (source.droppableId !== destination.droppableId) {
        const destStack = state[destination.droppableId]
        const sourceTasks = [...sourceStack.tasks]
        const destTasks = [...destStack.tasks]
        const [removed] = sourceTasks.splice(source.index, 1)
        destTasks.splice(destination.index, 0, removed)
        return {
          ...state,
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
        const copiedTasks = [...sourceStack.tasks]
        const [removed] = copiedTasks.splice(source.index, 1)
        copiedTasks.splice(destination.index, 0, removed)

        return {
          ...state,
          [source.droppableId]: {
            ...sourceStack,
            tasks: copiedTasks
          }
        }
      }
    case TaskDispatchTypes.REMOVE_TASK:
      if (!action.task || !action.stackId) return state

      const uptatedTasks = sourceTasks.filter(task => task.id !== action.task?.id)

      return {
        ...state,
        [action.stackId]: {
          ...state[action.stackId],
          tasks: uptatedTasks
        }
      }
    default:
      return state
  }
}


export default tasksReducer;