
<p align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://raw.githubusercontent.com/joaovitorzv/taskei/master/readme-assets/project-logo.png" alt="Logo">
  </a>

  <p align="center">
    An kanban board made with React and Typescript, see <a href='https://taskei.netlify.app/'>live here</a>
  </p>
</p>

[![Netlify Status](https://api.netlify.com/api/v1/badges/a256a6a2-fda7-4069-bd26-407f22fb594e/deploy-status)](https://taskei.netlify.app/)



## About the project
![Taskei screenshot](https://raw.githubusercontent.com/joaovitorzv/taskei/master/readme-assets/project-screenshot.png)
### Development Roadmap

The main idea was to build a simple kanban board where you can add move and delete tasks

**Project features:**
	

 - Routing between Home page and the application board
 - The pre created column stacks with a form to add new tasks
 - Draggable tasks and its button to delete
 - Every task are persisted after created
 - Responsive layout and mobile support to drag and drop

For stylize was decided to use node-sass because it's easy to start using and have good features like variables and selectors nesting, there is a home page with a simple presentation about the project and was used `react-router-dom` to handle the access between the board page. 

## The fun part
 
***State actions:*** 

a `useReducer` was used to handle all the possible tasks actions as add, move and remove, the reducer was created on `/tasks` router component (the top level directory) there is rendered the `<DragDropContext />`, `<Stack />` and `<Task />` to make the life easier calling the `reducer dispatch` was created an object of functions called `actions` and passed it as props to the components. For example the `<Stack />` component (the column of tasks) has a form to add tasks, to handle it we just have to call the `props.actions.addItem(...)` and voila he does the job for us, also for the `<Task />` where we have to handle a delete action, made simple just calling the `props.actions.removeItem()`

***behind the state actions abstraction:*** 

when we make a successful call to the `actions` somewhere this data have to be manipulated, first take a look how our state looks like:
```ts
StackState {
  [x: string]: {
    name: string;
    colorClass: string;
    icon: 'inbox' | 'notStarted' | 'inProgress' | 'done';
    tasks: TaskState[];
  };
}
```
that's all we have, so now let's imagine that we want to add a a new task, all we want from the `task` component is the `stackId` and all the data of our `task`, the `actions` do their job calling the `dispatch` and passing all the data, inside our `tasksReducer` we just look for the `stackId` on state then update with our new `task` and return the updated state.

to delete some `task` is something like adding but we also look for the `taskId` and then remove it from the state.

We also have to mutate the state when user drag and drop the `task` for this our `<DrangDropContext />` provides the `onDragEnd((result) => {})` inside the result we have everything we need, from our result we get the 	`{ source, destination } = result` you might have noticed that  there is the source and destination `<Stack />` you're right, with that in hands we do a if statement verifying if there is a destination if not we just return the current state.

but if the source is equal to the destination that means our user is trying to change the task position inside the current stack to do that we do something like that: 
```ts
  const  copiedTasks = [...sourceStack.tasks]
  const [removed] = copiedTasks.splice(source.index, 1)
  copiedTasks.splice(destination.index, 0, removed)
```
we copy the tasks from the stack state, the `source.index` is the current position of the task on its own `stack`, with the "removed" task we replace it on the array passing it `destination.index` and then return the updated state.

When a `task` is moved to a different `stack` is something like we did above but we also need to find the source and destination from the `stack` and then we just replace the dragged task to the `destination` inside its `stack` 

***persisting the data:*** 

user don't want to lose their added tasks when he close the page or update it, so was created a service that is called `StacksStorage` it has two functions 
```ts
getStacks: () => {
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify(stacksMock))
  }	
  try {
    const  stacks: StackState = JSON.parse(localStorage.getItem(key)       || '{}')
    return  stacks
  } catch {
    return {}
  }
},

updateStacks: (updatedStacks: StackState) => {
  return  localStorage.setItem(key, JSON.stringify(updatedStacks))
}
```
The `localStorage` is mutated on every dispatch case and all the data is persisted
 
### Built With
* [React](https://reactjs.org/)
* [Typescript](https://www.typescriptlang.org/)
* [Uuid](https://github.com/uuidjs/uuid)
* [Sass](https://sass-lang.com/)
* [React-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)

### How to setup locally

1. Clone the repo
   ```sh
   git clone https://github.com/joaovitorzv/taskei.git
   ```
2. Change to cloned directory
   ```sh
   cd taskei
   ```
3. Install YARN or NPM packages
   ```sh
   yarn install
   ```
4. Run the project
   ```sh
   yarn start
   ```
