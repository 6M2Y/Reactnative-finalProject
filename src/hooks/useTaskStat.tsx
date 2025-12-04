//---------------------------------------------
// useTaskStat Hook - computes various task statistics based on tasks and user role
//mainly used in TaskListScreen for filtering tasks and homescreen stats
// ---------------------------------------------

import { useMemo } from 'react';
import { ITask } from '../types/task';
import { IUser } from '../types/user';

// Hook to compute task statistics
export const useTaskStat = (tasks: ITask[], user: IUser) => {
  const stats = useMemo(() => {
    if (!user) {
      return {
        myTasks: [],
        unAssignedTasks: [],
        waitingApprovalTasks: [],
        overdueDate: [],
        tasksDueIn3Days: [],
      };
    }
    const myTasks = tasks.filter((t: any) => t.assignedTo?._id === user._id);
    // Unassigned tasks
    const unAssignedTasks = tasks.filter((t: any) => !t.assignedTo);
    // Tasks waiting for approval
    const waitingApprovalTasks = tasks.filter(
      (t: any) => t.completed && !t.verified,
    );

    const overdueDate = tasks.filter(t => {
      if (!t.dueDate) return false;

      // Consider task done if completed, status is completed, or verified
      const isDone =
        t.completed === true || t.status === 'completed' || t.verified === true;

      if (isDone) return false;

      const now = new Date();
      const due = new Date(t.dueDate);
      due.setHours(23, 59, 59, 999);

      // For parents, all overdue tasks; for children, only their own overdue tasks
      if (user.role === 'parent') {
        return due < now;
      }

      // For children, check if the task is assigned to them
      const assignedToId =
        typeof t.assignedTo === 'string' ? t.assignedTo : t.assignedTo?._id;

      return assignedToId === user._id && due < now;
    });

    // Tasks due in the next 3 days (including today)
    const tasksDueIn3Days = tasks.filter(t => {
      if (!t.dueDate || t.completed) return false;

      const today = new Date();
      today.setHours(0, 0, 0, 0); // Start of today

      const due = new Date(t.dueDate);
      due.setHours(23, 59, 59, 999); // End of due date

      const endWindow = new Date();
      endWindow.setDate(endWindow.getDate() + 3);
      endWindow.setHours(23, 59, 59, 999); // End of 3-day window

      //this can be refactored again ***********
      const assignedToId =
        typeof t.assignedTo === 'string' ? t.assignedTo : t.assignedTo?._id;
      // Must be due today or in the next 3 days, and not already passed.
      return due >= today && due <= endWindow && assignedToId === user._id;
    });

    return {
      myTasks,
      unAssignedTasks,
      waitingApprovalTasks,
      overdueDate,
      tasksDueIn3Days,
    };
  }, [tasks, user]);
  return stats;
};
