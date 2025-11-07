import { createContext, useContext, useState } from 'react';

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [activeTimers, setActiveTimers] = useState({});

  const addTask = (task) => setTasks(prev => [...prev, task]);

  const updateTask = (id, newData) =>
    setTasks(prev => prev.map(t => (t.id === id ? newData : t)));

  const deleteTask = (id) =>
    setTasks(prev => prev.filter(t => t.id !== id));

  const startTimer = (id) => {
    console.log("IN")
    const start = new Date().toISOString();
    setActiveTimers(prev => ({ ...prev, [id]: start }));
  };

  const stopTimer = (id) => {
    const end = new Date().toISOString();
    const start = activeTimers[id];
    if (!start) return;

    const diff = (new Date(end) - new Date(start)) / 3600000; // time difference in hours
    console.log(diff)
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const updatedTask = {
      ...task,
      timeSpent: (task.timeSpent || 0) + diff,
      logs: [...(task.logs || []), { start, end }],
    };

    updateTask(id, updatedTask);

    setActiveTimers(prev => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        startTimer,
        stopTimer,
        activeTimers,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);
