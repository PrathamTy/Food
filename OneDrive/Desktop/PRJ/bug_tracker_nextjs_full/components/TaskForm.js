import { useState, useEffect } from "react";

export default function TaskForm({ onClose, addTask, updateTask, editingTask, user }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [assignee, setAssignee] = useState(user.username);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(()=>{
    if(editingTask){
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setPriority(editingTask.priority);
      setAssignee(editingTask.assignee);
      setStartDate(editingTask.startDate);
      setEndDate(editingTask.endDate);
    }
  },[editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = {
      id: editingTask ? editingTask.id : Date.now(),
      title, description, priority, status: editingTask ? editingTask.status : 'Open',
      assignee, startDate, endDate, timeSpent: editingTask?.timeSpent || 0, logs: editingTask?.logs || []
    };
    if(editingTask) updateTask(task.id, task); else addTask(task);
    onClose();
  }

  return (
    <div className="modal">
      <form className="task-form" onSubmit={handleSubmit}>
        <h2>{editingTask?'Edit':'Create'} Task</h2>
        <label>Title</label>
        <input value={title} onChange={e=>setTitle(e.target.value)} required />
        <label>Description</label>
        <textarea value={description} onChange={e=>setDescription(e.target.value)} required />
        <label>Priority</label>
        <select value={priority} onChange={e=>setPriority(e.target.value)}>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <label>Assignee</label>
        <input value={assignee} onChange={e=>setAssignee(e.target.value)} required />
        <label>Start Date</label>
        <input type="date" value={startDate} onChange={e=>setStartDate(e.target.value)} />
        <label>End Date</label>
        <input type="date" value={endDate} onChange={e=>setEndDate(e.target.value)} />
        <div className="form-buttons">
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  )
}