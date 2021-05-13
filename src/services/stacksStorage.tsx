import { StackState } from '../routes/Tasks/reducers/types'
import { v4 } from 'uuid'

const stacksMock = {
  [v4()]: {
    name: 'Inbox',
    colorClass: 'inbox',
    icon: 'inbox',
    tasks: []
  },
  [v4()]: {
    name: 'Not started',
    colorClass: 'not-started',
    icon: 'notStarted',
    tasks: []
  },
  [v4()]: {
    name: 'In Progress',
    colorClass: 'in-progress',
    icon: 'inProgress',
    tasks: []
  },
  [v4()]: {
    name: 'Done',
    colorClass: 'done',
    icon: 'done',
    tasks: []
  }
}
const key = 'persist:tasks'

const StacksStorage = {
  getStacks: () => {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify(stacksMock))
    }

    try {
      const stacks: StackState = JSON.parse(localStorage.getItem(key) || '{}')
      return stacks
    } catch {
      localStorage.clear()
      return {}
    }
  },
  updateStacks: (updatedStacks: StackState) => {
    return localStorage.setItem(key, JSON.stringify(updatedStacks))
  }
}


export default StacksStorage