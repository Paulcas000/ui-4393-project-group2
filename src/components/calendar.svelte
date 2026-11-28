<script>
	import { taskStore } from '#lib/taskStore.svelte.js';

	const today = new Date();
	const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const monthFormatter = new Intl.DateTimeFormat('en-US', {
		month: 'long',
		year: 'numeric'
	});

	let month = $state(new Date(today.getFullYear(), today.getMonth(), 1));
	let monthLabel = $derived(monthFormatter.format(month));
	let weeks = $derived(buildWeeks(month));

	let assignmentsByDate = $derived.by(() => {
		const byDate = new Map();

		for (const assignment of taskStore.assignments) {
			if (!byDate.has(assignment.dueDate)) {
				byDate.set(assignment.dueDate, []);
			}

			byDate.get(assignment.dueDate).push(assignment);
		}

		return byDate;
	});

	function changeMonth(offset) {
		month = new Date(month.getFullYear(), month.getMonth() + offset, 1);
	}

	function buildWeeks(date) {
		const year = date.getFullYear();
		const monthIndex = date.getMonth();
		const firstWeekday = date.getDay();
		const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
		const monthNumber = String(monthIndex + 1).padStart(2, '0');

		const cells = Array.from(
			{ length: Math.ceil((firstWeekday + daysInMonth) / 7) * 7 },
			(_, index) => {
				const day = index - firstWeekday + 1;
				if (day < 1 || day > daysInMonth) return null;

				return {
					day,
					dateKey: `${year}-${monthNumber}-${String(day).padStart(2, '0')}`
				};
			}
		);

		const weeks = [];
		for (let index = 0; index < cells.length; index += 7) {
			weeks.push(cells.slice(index, index + 7));
		}

		return weeks;
	}
</script>

<svelte:head>
	<title>Calendar | StudyTrack</title>
</svelte:head>

<h1>Assignment Calendar</h1>

<div class="d-flex justify-content-between align-items-center mb-3">
	<button type="button" class="btn btn-outline-secondary" onclick={() => changeMonth(-1)}>
		Previous
	</button>

	<h2 id="calendar-month" class="h4 mb-0" aria-live="polite">{monthLabel}</h2>

	<button type="button" class="btn btn-outline-secondary" onclick={() => changeMonth(1)}>
		Next
	</button>
</div>

<div class="table-responsive">
	<table class="table table-bordered calendar" aria-labelledby="calendar-month">
		<thead>
			<tr>
				{#each weekdays as weekday}
					<th scope="col">{weekday}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each weeks as week}
				<tr>
					{#each week as day}
						<td>
							{#if day}
								<time datetime={day.dateKey}>{day.day}</time>

								{#each assignmentsByDate.get(day.dateKey) ?? [] as assignment (assignment.id)}
									<div class="assignment">
										{#if assignment.completed}
											<s>{assignment.title}</s> <small>(Done)</small>
										{:else}
											{assignment.title}
										{/if}
									</div>
								{/each}
							{/if}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.calendar {
		min-width: 42rem;
		table-layout: fixed;
	}

	td {
		height: 6rem;
		vertical-align: top;
	}

	.assignment {
		margin-top: 0.35rem;
		padding: 0.25rem 0.4rem;
		border-radius: 0.25rem;
		background: #e5f5e9;
		color: #1f3d2b;
		overflow-wrap: anywhere;
	}
</style>