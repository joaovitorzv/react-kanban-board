import { StackState } from '../routes/Tasks/reducers/types'
import { v4 } from 'uuid'

const stacksMock = {
  [v4()]: {
    name: 'Inbox',
    colorClass: 'inbox',
    icon: 'INBOX',
    tasks: []
  },
  [v4()]: {
    name: 'Not started',
    colorClass: 'not-started',
    icon: 'NOT_STARTED',
    tasks: []
  },
  [v4()]: {
    name: 'In Progress',
    colorClass: 'in-progress',
    icon: 'IN_PROGRESS',
    tasks: []
  },
  [v4()]: {
    name: 'Done',
    colorClass: 'done',
    icon: 'DONE',
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
      return {}
    }
  },
  updateStacks: (updatedStacks: StackState) => {
    const stacks = localStorage.setItem(key, JSON.stringify(updatedStacks))
    return stacks
  }
}


export default StacksStorage