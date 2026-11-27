<svelte:head>
  <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
  <link rel="stylesheet" href="/assets/css/animate.css" />
  <link rel="stylesheet" href="/assets/css/owl.carousel.min.css" />
  <link rel="stylesheet" href="/assets/css/owl.theme.default.min.css" />
  <link rel="stylesheet" href="/assets/css/magnific-popup.css" />
  <link rel="stylesheet" href="/assets/css/flaticon.css" />
  <link rel="stylesheet" href="/assets/css/style.css" />
  <link rel="stylesheet" href="/assets/css/hw4.css" />
</svelte:head>

<script>
	import { onMount } from 'svelte';
	import { taskStore } from '#lib/taskStore.svelte.js';

	let { children } = $props();

	onMount(() => {
		taskStore.load();
	});
</script>

<nav
	<nav class="navbar navbar-dark bg-dark" aria-label="Main navigation">
>
	<div class="container">
		<a class="navbar-brand" href="/">StudyTrack</a>

		<ul class="navbar-nav flex-row flex-wrap">
			<li class="nav-item">
				<a class="nav-link px-2" href="/">Home</a>
			</li>
			<li class="nav-item">
				<a class="nav-link px-2" href="/assignments">Assignments</a>
			</li>
			<li class="nav-item">
				<a class="nav-link px-2" href="/calendar">Calendar</a>
			</li>
		</ul>
	</div>
</nav>

<main class="container py-4">
	{@render children()}
</main>