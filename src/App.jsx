import { useState } from 'react';
import { useStore } from './store/useStore';
import AppBar     from './components/AppBar/AppBar';
import Sidebar    from './components/Sidebar/Sidebar';
import Board      from './components/Board/Board';
import List       from './components/List/List';
import Analytics  from './components/Analytics/Analytics';
import AiPanel    from './components/AiPanel/AiPanel';
import TaskModal  from './components/TaskModal/TaskModal';
import s from './App.module.css';

const VIEW_TITLES = {
  board:     'Дошка завдань',
  list:      'Список завдань',
  analytics: 'Аналітика',
};

const FILTER_LABELS = {
  high: '🔍 Критичні',
  med:  '🔍 Середні',
  low:  '🔍 Низькі',
};

export default function App() {
  const view           = useStore(s => s.view);
  const filterPriority = useStore(s => s.filterPriority);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [aiOpen, setAiOpen]           = useState(false);

  function closeDrawers() {
    setSidebarOpen(false);
    setAiOpen(false);
  }

  return (
    <div className={s.app}>
      <AppBar
        onToggleSidebar={() => setSidebarOpen(o => !o)}
        onToggleAI={() => setAiOpen(o => !o)}
      />

      <div className={s.workspace}>
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className={s.main}>
          <div className={s.mainHeader}>
            <h2>{VIEW_TITLES[view]}</h2>
            {filterPriority !== 'all' && (
              <span className={s.filterBadge}>{FILTER_LABELS[filterPriority]}</span>
            )}
          </div>
          <div className={s.mainContent}>
            {view === 'board'     && <Board />}
            {view === 'list'      && <List />}
            {view === 'analytics' && <Analytics />}
          </div>
        </main>

        <AiPanel open={aiOpen} onClose={() => setAiOpen(false)} />

        {(sidebarOpen || aiOpen) && (
          <div className={s.backdrop} onClick={closeDrawers} />
        )}
      </div>

      <TaskModal />
    </div>
  );
}
