
import { browser } from '$app/environment';

const STORAGE_KEY = 'studytrack-assignments';

function createTaskStore() {
  let assignments = $state([]);

  function load() {
    if (!browser) return;

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const parsed = saved ? JSON.parse(saved) : [];

      assignments = Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error('Failed to load assignments:', error);
      assignments = [];
    }
  }

  function save() {
    if (!browser) return;

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(assignments)
      );
    } catch (error) {
      console.error('Failed to save assignments:', error);
    }
  }

  function add(data) {
    const assignment = {
      id: crypto.randomUUID(),
      title: data.title.trim(),
      description: data.description.trim(),
      dueDate: data.dueDate,
      priority: data.priority,
      completed: false,
      createdAt: new Date().toISOString()
    };

    assignments = [...assignments, assignment];
    save();
  }

  function update(id, changes) {
    assignments = assignments.map((assignment) =>
      assignment.id === id
        ? { ...assignment, ...changes }
        : assignment
    );

    save();
  }

  function remove(id) {
    assignments = assignments.filter(
      (assignment) => assignment.id !== id
    );

    save();
  }

  function toggleComplete(id) {
    assignments = assignments.map((assignment) =>
      assignment.id === id
        ? { ...assignment, completed: !assignment.completed }
        : assignment
    );

    save();
  }

  return {
    get assignments() {
      return assignments;
    },
    load,
    add,
    update,
    remove,
    toggleComplete
  };
}

export const taskStore = createTaskStore();
