import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { useFilteredTasks } from '../../hooks/useFilteredTasks';
import { STATUS_COLUMNS, STATUS_LABELS } from '../../lib/constants';
import TaskCard from './TaskCard';
import s from './Board.module.css';

export default function Board() {
  const filteredTasks    = useFilteredTasks();
  const quickAddTask     = useStore(st => st.quickAddTask);
  const updateTaskStatus = useStore(st => st.updateTaskStatus);
  const filterPriority   = useStore(st => st.filterPriority);
  const [dragOverCol, setDragOverCol] = useState(null);

  const byStatus = STATUS_COLUMNS.reduce((acc, col) => {
    acc[col] = filteredTasks.filter(t => t.status === col);
    return acc;
  }, {});

  function handleQuickAdd(status) {
    const title = prompt('Назва завдання:');
    if (!title?.trim()) return;
    quickAddTask(status, title.trim(), filterPriority !== 'all' ? filterPriority : 'med');
  }

  function handleDragStart(e, taskId) {
    e.dataTransfer.setData('taskId', String(taskId));
    e.dataTransfer.effectAllowed = 'move';
  }

  function handleDragOver(e, col) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverCol(col);
  }

  function handleDrop(e, col) {
    e.preventDefault();
    setDragOverCol(null);
    const taskId = Number(e.dataTransfer.getData('taskId'));
    if (taskId) updateTaskStatus(taskId, col);
  }

  return (
    <div className={s.kanban}>
      {STATUS_COLUMNS.map(col => (
        <div
          key={col}
          className={`${s.col} ${dragOverCol === col ? s.colDragOver : ''}`}
          onDragOver={e => handleDragOver(e, col)}
          onDragLeave={() => setDragOverCol(null)}
          onDrop={e => handleDrop(e, col)}
        >
          <div className={s.colHead}>
            <span className={s.colTitle}>{STATUS_LABELS[col]}</span>
            <span className={s.colCount}>{byStatus[col].length}</span>
          </div>

          {byStatus[col].length === 0 && (
            <div className={s.empty}>
              <i className="ti ti-inbox" />
              Немає завдань
            </div>
          )}

          {byStatus[col].map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onDragStart={handleDragStart}
              onMoveStatus={updateTaskStatus}
            />
          ))}

          <button className={s.addBtn} onClick={() => handleQuickAdd(col)}>
            <i className="ti ti-plus" style={{ fontSize: 12 }} /> Додати
          </button>
        </div>
      ))}
    </div>
  );
}
