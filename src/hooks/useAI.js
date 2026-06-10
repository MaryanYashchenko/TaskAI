import { useStore } from '../store/useStore';
import { callGroq } from '../lib/groq';
import { tasksSummaryForAI, tasksListForAI } from '../lib/constants';

export function useAI() {
  const tasks      = useStore(s => s.tasks);
  const addMessage = useStore(s => s.addMessage);
  const setLoading = useStore(s => s.setAILoading);
  const loading    = useStore(s => s.aiLoading);

  async function ask(text) {
    if (loading) return;
    addMessage({ role: 'user', text });
    setLoading(true);

    const summary = tasksSummaryForAI(tasks);
    try {
      const reply = await callGroq(
        `Ти AI-асистент планувальника завдань TaskAI. Відповідай коротко (2-4 речення), по-діловому, українською мовою.\nПоточні завдання:\n${summary}`,
        text,
      );
      addMessage({ role: 'ai', text: reply });
    } catch (e) {
      addMessage({ role: 'ai', text: `Помилка: ${e.message}` });
    } finally {
      setLoading(false);
    }
  }

  async function optimize() {
    if (loading) return;
    addMessage({ role: 'user', text: 'Запускаю AI-оптимізацію всього списку завдань...' });
    setLoading(true);

    const list = tasksListForAI(tasks);
    try {
      const reply = await callGroq(
        'Ти AI-оптимізатор завдань. Відповідай по-діловому, українською мовою. Давай топ-3 рекомендації нумерованим списком.',
        `Проаналізуй ці завдання і дай топ-3 рекомендації:\n${list}`,
      );
      addMessage({ role: 'ai', text: reply });
    } catch (e) {
      addMessage({ role: 'ai', text: `Помилка: ${e.message}` });
    } finally {
      setLoading(false);
    }
  }

  return { ask, optimize, loading };
}
