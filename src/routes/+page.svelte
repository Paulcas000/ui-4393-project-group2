<script>
	import { onMount } from 'svelte';
	import { taskStore } from '#lib/taskStore.svelte.js';

	const priorityRank = { High: 0, Medium: 1, Low: 2 };

	let today = $state('');
	let sortBy = $state('dueDate');

	onMount(() => {
		const now = new Date();
		const month = String(now.getMonth() + 1).padStart(2, '0');
		const day = String(now.getDate()).padStart(2, '0');
		today = `${now.getFullYear()}-${month}-${day}`;
	});

	let upcoming = $derived(
		taskStore.assignments
			.filter((assignment) => !assignment.completed && assignment.dueDate >= today)
			.sort((a, b) => {
				const dueDateOrder = a.dueDate.localeCompare(b.dueDate);

				if (sortBy === 'priority') {
					const firstRank = priorityRank[a.priority] ?? 3;
					const secondRank = priorityRank[b.priority] ?? 3;
					return firstRank - secondRank || dueDateOrder;
				}

				return dueDateOrder;
			})
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
		<div class="mb-3">
			<label for="sort-upcoming">Sort by</label>

			<div class="list-group d-inline-flex">
				<div class="list-group-item p-0">
					<select id="sort-upcoming" bind:value={sortBy}>
						<option value="dueDate">Due date (soonest first)</option>
						<option value="priority">Priority (highest first)</option>
					</select>
				</div>
			</div>
		</div>

		<ul class="list-group mb-3">
			{#each upcoming as assignment (assignment.id)}
				<li class="list-group-item">
					<strong>{assignment.title}</strong>
					<span class="ml-2">
						Due <time datetime={assignment.dueDate}>{assignment.dueDate}</time>
						· {assignment.priority ?? 'No'} priority
					</span>
				</li>
			{/each}
		</ul>
	{/if}
{/if}

<a class="btn btn-primary" href="/assignments">Manage Assignments</a>

<style>

#sort-upcoming {
	background-color: inherit;
	color: inherit;
	border: 0;
	border-radius: inherit;
	padding: 0.5rem 0.75rem;
}

#sort-upcoming:focus-visible {
	outline: 2px solid currentColor;
	outline-offset: 2px;
}

</style>