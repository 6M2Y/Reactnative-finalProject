//---------------------------------------------
// TaskContext - provides task data and functions to manage tasks across the app
// Used in various screens and hooks for task management
// ---------------------------------------------

import { getTasks } from '../api/taskApi';
import { ITask } from '../types/task';
import { IUser } from '../types/user';
import { createContext, useCallback, useContext, useState } from 'react';

const TaskContext = createContext(null);

export const TaskContextProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: IUser;
}) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Function to fetch tasks from API
  const fetchTasks = useCallback(async () => {
    if (!user?.familyCode) return; // Ensure user and familyCode exist
    setLoading(true);

    try {
      const allTasks = await getTasks(user.familyCode); // Fetch all tasks from API
      setTasks(allTasks);
    } catch (err) {
      console.error('Failed to fetch tasks', err);
    }
    setLoading(false);
  }, [user]);

  // Function to refresh a specific task by its ID
  const refreshTask = (taskId: string) => {
    return tasks.find(t => t._id === taskId);
  };
  // Function to update a task in state
  const updateTaskInState = (taskId: string, update: any) => {
    setTasks(prevTasks =>
      prevTasks.map(t => (t._id === taskId ? { ...t, ...update } : t)),
    );
  };

  return (
    <TaskContext.Provider
      value={{ tasks, fetchTasks, refreshTask, updateTaskInState, setTasks }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
