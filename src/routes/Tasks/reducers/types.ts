import { DropResult } from "react-beautiful-dnd";

enum TaskDispatchTypes {
  ADD_TASK,
  MOVE_TASK,
  REMOVE_TASK,
  XESQUE
}

export interface TaskState {
  id: string;
  title: string;
  description: string;
}

export interface StackState {
  [x: string]: {
    name: string;
    colorClass: string;
    icon: 'inbox' | 'notStarted' | 'inProgress' | 'done';
    tasks: TaskState[];
  };
}

export interface TasksActions {
  addItem: (stackId: string, task: TaskState) => void;
  moveItem: (result: DropResult) => void;
  removeItem: (stackId: string, task: TaskState) => void;
}

export default TaskDispatchTypes;