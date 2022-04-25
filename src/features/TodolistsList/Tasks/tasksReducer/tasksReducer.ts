import { TaskType, TodolistType } from '../../../../api/types';
import { ActionsType, TasksStateType, UpdateDomainTaskModelType } from '../../types';
import {
  ADD_TASK,
  ADD_TODOLIST,
  REMOVE_TASK,
  REMOVE_TODOLIST,
  SET_TASKS,
  SET_TODOLISTS,
  UPDATE_TASK,
} from '../constants';

const initialState: TasksStateType = {};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionsType,
): TasksStateType => {
  switch (action.type) {
    case REMOVE_TASK:
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(
          task => task.id !== action.taskId,
        ),
      };
    case ADD_TASK:
      return {
        ...state,
        [action.task.todoListId]: [action.task, ...state[action.task.todoListId]],
      };
    case UPDATE_TASK:
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(task =>
          task.id === action.taskId ? { ...task, ...action.model } : task,
        ),
      };
    case ADD_TODOLIST:
      return { ...state, [action.todolist.id]: [] };
    case REMOVE_TODOLIST: {
      const copyState = { ...state };
      delete copyState[action.id];
      return copyState;
    }
    case SET_TODOLISTS: {
      const copyState = { ...state };
      action.todolists.forEach((todolist: TodolistType) => {
        copyState[todolist.id] = [];
      });
      return copyState;
    }
    case SET_TASKS:
      return { ...state, [action.todolistId]: action.tasks };
    default:
      return state;
  }
};

// actions
export const removeTaskAC = (taskId: string, todolistId: string) =>
  ({ type: REMOVE_TASK, taskId, todolistId } as const);
export const addTaskAC = (task: TaskType) => ({ type: ADD_TASK, task } as const);
export const updateTaskAC = (
  taskId: string,
  model: UpdateDomainTaskModelType,
  todolistId: string,
) =>
  ({
    type: UPDATE_TASK,
    model,
    todolistId,
    taskId,
  } as const);
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
  ({
    type: SET_TASKS,
    tasks,
    todolistId,
  } as const);
