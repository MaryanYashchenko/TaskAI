import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DEFAULT_TASKS, randomScore } from '../lib/constants';

// ── tasks slice ──────────────────────────────────────────────────────────────
const createTasksSlice = (set, get) => ({
  tasks: DEFAULT_TASKS,
  nextId: DEFAULT_TASKS.length + 1,

  addTask: (fields) => {
    const task = { ...fields, id: get().nextId, score: randomScore(), status: 'todo' };
    set(s => ({ tasks: [...s.tasks, task], nextId: s.nextId + 1 }));
    return task;
  },

  quickAddTask: (status, title, priority = 'med') => {
    const task = { id: get().nextId, title, desc: '', priority, cat: 'Backend', due: '', status, score: randomScore() };
    set(s => ({ tasks: [...s.tasks, task], nextId: s.nextId + 1 }));
  },

  updateTaskStatus: (id, status) => {
    set(s => ({
      tasks: s.tasks.map(t => (t.id === id ? { ...t, status } : t)),
    }));
  },
});

// ── ui slice ─────────────────────────────────────────────────────────────────
const createUISlice = (set) => ({
  view:           'board',   // 'board' | 'list' | 'analytics'
  filterPriority: 'all',     // 'all' | 'high' | 'med' | 'low'
  modalOpen:      false,

  setView:           (view)           => set({ view }),
  setFilterPriority: (filterPriority) => set({ filterPriority }),
  openModal:  () => set({ modalOpen: true }),
  closeModal: () => set({ modalOpen: false }),
});

// ── ai slice ─────────────────────────────────────────────────────────────────
const createAISlice = (set) => ({
  messages: [
    { role: 'ai', text: 'Вітаю! Groq підключено. Llama 3.3 70B готовий — запитайте мене про ваші завдання!', ts: now() },
  ],
  aiLoading: false,

  addMessage:   (msg) => set(s => ({ messages: [...s.messages, { ...msg, ts: now() }] })),
  setAILoading: (v)   => set({ aiLoading: v }),
});

function now() {
  return new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
}

// ── combined store ───────────────────────────────────────────────────────────
export const useStore = create(
  persist(
    (set, get) => ({
      ...createTasksSlice(set, get),
      ...createUISlice(set),
      ...createAISlice(set),

      countByPriority: (p) => get().tasks.filter(t => t.priority === p).length,
    }),
    {
      name: 'taskai-store',
      // only persist tasks + nextId; ui state resets on reload
      partialize: (s) => ({ tasks: s.tasks, nextId: s.nextId }),
    }
  )
);
