import { create } from 'zustand';

export const useRenderQueue = create((set) => ({
  queue: [],
  addTask: (task) => set(state => ({ 
    queue: [...state.queue, { ...task, id: Date.now(), progress: 0 }]
  })),
  updateProgress: (id, progress) => set(state => ({
    queue: state.queue.map(task => 
      task.id === id ? { ...task, progress } : task
    )
  })),
  removeTask: (id) => set(state => ({
    queue: state.queue.filter(task => task.id !== id)
  }))
}));