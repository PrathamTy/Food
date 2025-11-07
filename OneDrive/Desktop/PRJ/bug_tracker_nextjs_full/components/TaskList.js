export default function TaskList({tasks, onEdit, onDelete, onClose, onApprove, onReopen, user, onStart, onStop, activeTimers}) {
  return (
    <div>
      {tasks.length === 0 ? <p>No tasks yet</p> : tasks.map(task => (
        <div key={task.id} style={{background:'#fff', padding:'10px', margin:'10px 0', borderRadius:'6px'}}>
          <h3>{task.title} ({task.priority})</h3>
          <p>Status: {task.status}</p>
          <p>Assignee: {task.assignee}</p>
          <p>Time Spent: {task.timeSpent}h</p>
          <p>Start: {task.startDate} End: {task.endDate}</p>
          <button onClick={()=>onStart(task.id)} disabled={activeTimers[task.id]}>Start</button>
          <button onClick={()=>onStop(task.id)} disabled={!activeTimers[task.id]}>Stop</button>

          {user?.role === 'developer' && task.status === 'Open' && (
            <>
              <button onClick={()=>onEdit(task)}>Edit</button>
              <button onClick={()=>onClose(task.id)}>Close</button>
              <button onClick={()=>onDelete(task.id)}>Delete</button>
            </>
          )}
          {user?.role === 'manager' && task.status === 'Pending Approval' && (
            <>
              <button onClick={()=>onApprove(task.id)}>Approve</button>
              <button onClick={()=>onReopen(task.id)}>Reopen</button>
            </>
          )}
        </div>
      ))}
    </div>
  )
}