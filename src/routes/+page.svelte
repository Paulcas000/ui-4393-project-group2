<script>
  import { onMount } from 'svelte';
  import { taskStore } from '#lib/taskStore.svelte.js';

  let today = $state('');

  onMount(() => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    today = `${now.getFullYear()}-${month}-${day}`;
  });

  let upcoming = $derived(
    taskStore.assignments
      .filter((assignment) => !assignment.completed && assignment.dueDate >= today)
      .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
      .slice(0, 5)
  );
</script>

<svelte:head>
  <title>StudyTrack | Home</title>
</svelte:head>

<h1>StudyTrack</h1>
<h2>Upcoming Assignments</h2>

{#if today}
  {#if upcoming.length === 0}
    <p>No upcoming assignments.</p>
  {:else}
    <ul class="list-group mb-3">
      {#each upcoming as assignment (assignment.id)}
        <li class="list-group-item">
          <strong>{assignment.title}</strong>
          <span class="text-muted ml-2">
            Due <time datetime={assignment.dueDate}>{assignment.dueDate}</time>
          </span>
        </li>
      {/each}
    </ul>
  {/if}
{/if}

<a class="btn btn-primary" href="/assignments">Manage Assignments</a>