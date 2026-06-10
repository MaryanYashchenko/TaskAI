import { useMemo } from 'react';
import { useStore } from '../store/useStore';

export function useFilteredTasks() {
  const tasks          = useStore(st => st.tasks);
  const filterPriority = useStore(st => st.filterPriority);

  return useMemo(
    () => filterPriority === 'all'
      ? tasks
      : tasks.filter(t => t.priority === filterPriority),
    [tasks, filterPriority],
  );
}
