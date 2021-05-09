enum TaskDispatchTypes {
  ADD_TASK,
  MOVE_TASK,
  REMOVE_TASK
}

export interface StackState {
  [x: string]: {
    name: string;
    colorClass: string;
    icon: JSX.Element;
    tasks: {
      id: string;
      title: string;
      description: string;
    }[];
  };
}

export default TaskDispatchTypes;