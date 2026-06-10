export const PRIORITY_LABELS = {
  high: 'Критичний',
  med:  'Середній',
  low:  'Низький',
};

export const STATUS_LABELS = {
  todo:       'До виконання',
  inprogress: 'В процесі',
  done:       'Готово',
};

export const STATUS_COLUMNS = ['todo', 'inprogress', 'done'];

export const STATUS_COLORS = {
  todo:       '#888780',
  inprogress: '#378ADD',
  done:       '#1D9E75',
};

export const STATUS_PROGRESS = {
  todo:       15,
  inprogress: 55,
  done:       100,
};

export const CATEGORIES = [
  'Backend', 'Frontend', 'Design', 'DevOps', 'Аналітика', 'Тестування',
];

export const DEFAULT_TASKS = [
  { id:1, title:'Реалізувати REST API автентифікації', desc:'JWT токени, refresh логіка, rate limiting',       priority:'high', cat:'Backend',   due:'2026-06-15', status:'todo',       score:9.2 },
  { id:2, title:'Розробити UI дашборду',               desc:'Statistic cards, charts, responsive grid',       priority:'med',  cat:'Frontend',  due:'2026-06-20', status:'todo',       score:7.8 },
  { id:3, title:'Налаштувати CI/CD pipeline',          desc:'GitHub Actions, Docker, авто-деплой на staging', priority:'high', cat:'DevOps',    due:'2026-06-12', status:'inprogress', score:8.9 },
  { id:4, title:'Проектування бази даних',             desc:'Схема PostgreSQL, індекси, міграції',            priority:'med',  cat:'Backend',   due:'2026-06-18', status:'inprogress', score:7.1 },
  { id:5, title:'Написати документацію API',           desc:'OpenAPI 3.0 специфікація та приклади',           priority:'low',  cat:'Аналітика', due:'2026-06-30', status:'done',       score:5.4 },
];

export const AI_CHIPS = [
  'Проаналізуй пріоритети',
  'Що виконати першим?',
  'Оціни ризики дедлайнів',
  'Оптимізуй розклад',
];

export function formatDue(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('uk-UA', { day: 'numeric', month: 'short' });
}

export function randomScore() {
  return parseFloat((Math.random() * 3 + 6).toFixed(1));
}

export function tasksSummaryForAI(tasks) {
  return tasks
    .map(t => `- ${t.title} [${t.priority}, ${t.cat}, ${t.status}, score:${t.score}]`)
    .join('\n');
}

export function tasksListForAI(tasks) {
  return tasks
    .map((t, i) => `${i + 1}. ${t.title} — пріоритет: ${t.priority}, дедлайн: ${t.due || 'не вказано'}, статус: ${t.status}`)
    .join('\n');
}
