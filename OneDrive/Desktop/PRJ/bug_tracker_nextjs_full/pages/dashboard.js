import { useAuth } from "../context/AuthContext";
import { useTasks } from "../context/TaskContext";
import { useRouter } from "next/router";
import { useEffect, useState, useMemo } from "react";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import Navbar from "../components/Navbar";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const { user } = useAuth();
  const { tasks, addTask, updateTask, deleteTask, startTimer, stopTimer, activeTimers } = useTasks();
  const router = useRouter();

  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("priority");
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    if (!user) router.push("/");
  }, [user, router]);

  const handleClose = (id) => {
    const task = tasks.find((t) => t.id === id);
    updateTask(id, { ...task, status: "Pending Approval" });
  };

  const handleApprove = (id) => {
    updateTask(id, { status: "Closed" });
  };

  const handleReopen = (id) => {
    updateTask(id, { status: "Open" });
  };

  const filteredTasks = useMemo(() => {
    let list = [...tasks];
    if (filter !== "all") list = list.filter((t) => t.status === filter);
    if (sortBy === "priority") {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      list.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else if (sortBy === "time") {
      list.sort((a, b) => b.timeSpent - a.timeSpent);
    }
    return list;
  }, [tasks, filter, sortBy]);

  const trendData = useMemo(() => {
    const map = {};
    tasks.forEach((task) => {
      if (task.logs) {
        task.logs.forEach((log) => {
          const day = log.start.split("T")[0];
          if (!map[day]) map[day] = 0;
          map[day] += 1;
        });
      }
    });
    return Object.entries(map).map(([date, count]) => ({ date, count }));
  }, [tasks]);

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Welcome, {user?.username}</h1>
        {user?.role === "developer" && <button onClick={()=>{setEditingTask(null); setShowForm(true)}}>Create Task</button>}
        {user?.role === "manager" && <h3>Total Logged Hours: {tasks.reduce((a,b)=>a+b.timeSpent,0).toFixed(2)}h</h3>}

        <div className="filters">
          <div>
            <label>Status: </label>
            <select value={filter} onChange={(e)=>setFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="Open">Open</option>
              <option value="Pending Approval">Pending Approval</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div>
            <label>Sort By: </label>
            <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
              <option value="priority">Priority</option>
              <option value="time">Time Spent</option>
            </select>
          </div>
        </div>

        <div className="chart-container">
          <h2>Task Activity Trend</h2>
          {trendData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="date"/>
                <YAxis/>
                <Tooltip/>
                <Line type="monotone" dataKey="count" stroke="#0070f3" strokeWidth={3}/>
              </LineChart>
            </ResponsiveContainer>
          ) : <p>No time tracking data available yet.</p>}
        </div>

        {showForm && <TaskForm onClose={()=>setShowForm(false)} addTask={addTask} updateTask={updateTask} editingTask={editingTask} user={user} />}

        <TaskList
          tasks={filteredTasks}
          onEdit={(task)=>{setEditingTask(task); setShowForm(true)}}
          onDelete={deleteTask}
          onClose={handleClose}
          onApprove={handleApprove}
          onReopen={handleReopen}
          user={user}
          onStart={startTimer}
          onStop={stopTimer}
          activeTimers={activeTimers}
        />
      </div>
    </>
  );
}