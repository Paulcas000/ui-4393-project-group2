
<script>
  import { onMount } from 'svelte';
  import { taskStore } from '../lib/taskStore.svelte.js';

  let title = $state('');
  let description = $state('');
  let dueDate = $state('');
  let priority = $state('Medium');

  onMount(() => {
    taskStore.load();
  });

  function addAssignment() {
    if (!title.trim() || !dueDate) {
      alert('Please enter a title and due date.');
      return;
    }

    taskStore.add({
      title,
      description,
      dueDate,
      priority
    });

    title = '';
    description = '';
    dueDate = '';
    priority = 'Medium';
  }

  function editAssignment(id) {
    const assignment = taskStore.assignments.find(
      (item) => item.id === id
    );

    if (!assignment) return;

    const newTitle = prompt(
      'Edit assignment title:',
      assignment.title
    );

    if (newTitle === null || !newTitle.trim()) return;

    const newDescription = prompt(
      'Edit description:',
      assignment.description
    );

    if (newDescription === null) return;

    const newDueDate = prompt(
      'Edit due date (YYYY-MM-DD):',
      assignment.dueDate
    );

    if (newDueDate === null) return;

    const newPriority = prompt(
      'Edit priority (Low, Medium, High):',
      assignment.priority
    );

    if (newPriority === null) return;

    const validDate =
      /^\d{4}-\d{2}-\d{2}$/.test(newDueDate) &&
      !Number.isNaN(Date.parse(`${newDueDate}T00:00:00`));

    const validPriority =
      ['Low', 'Medium', 'High'].includes(newPriority);

    if (!validDate || !validPriority) {
      alert('Please enter a valid date and priority.');
      return;
    }

    taskStore.update(id, {
      title: newTitle.trim(),
      description: newDescription.trim(),
      dueDate: newDueDate,
      priority: newPriority
    });
  }
</script>

<h1>StudyTrack</h1>
<p>Keep track of your assignments.</p>

<section>
  <h2>Add Assignment</h2>

  <form
    onsubmit={(event) => {
      event.preventDefault();
      addAssignment();
    }}
  >
    <label for="title">Assignment Title</label>
    <input
      id="title"
      bind:value={title}
      placeholder="Enter title"
    />

    <label for="description">Description</label>
    <textarea
      id="description"
      bind:value={description}
    ></textarea>

    <label for="dueDate">Due Date</label>
    <input
      id="dueDate"
      type="date"
      bind:value={dueDate}
    />

    <label for="priority">Priority</label>
    <select id="priority" bind:value={priority}>
      <option>Low</option>
      <option>Medium</option>
      <option>High</option>
    </select>

    <button type="submit">Add Assignment</button>
  </form>
</section>

<section>
  <h2>My Assignments</h2>

  {#if taskStore.assignments.length === 0}
    <p>No assignments yet.</p>
  {:else}
    {#each taskStore.assignments as assignment (assignment.id)}
      <div>
        <h3>
          {assignment.title}
          {#if assignment.completed}
            ✅
          {/if}
        </h3>

        <p>{assignment.description}</p>
        <p>Due: {assignment.dueDate}</p>
        <p>Priority: {assignment.priority}</p>

        <p>
          Status:
          {assignment.completed ? 'Completed' : 'Incomplete'}
        </p>

        <button
          onclick={() => taskStore.toggleComplete(assignment.id)}
        >
          {assignment.completed ? 'Mark Incomplete' : 'Complete'}
        </button>

        <button onclick={() => editAssignment(assignment.id)}>
          Edit
        </button>

        <button onclick={() => taskStore.remove(assignment.id)}>
          Delete
        </button>
      </div>
    {/each}
  {/if}
</section>
