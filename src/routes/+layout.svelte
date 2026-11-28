<svelte:head>
  <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
  <link rel="stylesheet" href="/assets/css/animate.css" />
  <link rel="stylesheet" href="/assets/css/owl.carousel.min.css" />
  <link rel="stylesheet" href="/assets/css/owl.theme.default.min.css" />
  <link rel="stylesheet" href="/assets/css/magnific-popup.css" />
  <link rel="stylesheet" href="/assets/css/flaticon.css" />
  <link rel="stylesheet" href="/assets/css/style.css" />

  <!-- MEMBER 3: Theme CSS -->
  <link rel="stylesheet" href="/assets/css/member3.css" />
</svelte:head>

<script>
  import { onMount } from 'svelte';
  import { taskStore } from '#lib/taskStore.svelte.js';

  let { children } = $props();

  // MEMBER 3: Dark mode variable
  let darkMode = $state(false);

  onMount(() => {
    // Teammate's original code
    taskStore.load();

    // MEMBER 3: Remember saved theme
    darkMode = localStorage.getItem('studytrack-theme') === 'dark';

    document.documentElement.classList.toggle(
      'studytrack-dark',
      darkMode
    );
  });

  // MEMBER 3: Dark mode function
  function toggleTheme() {
    darkMode = !darkMode;

    document.documentElement.classList.toggle(
      'studytrack-dark',
      darkMode
    );

    localStorage.setItem(
      'studytrack-theme',
      darkMode ? 'dark' : 'light'
    );
  }
</script>

<!-- Original navigation -->
<nav class="navbar navbar-dark bg-dark" aria-label="Main navigation">
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

      <li class="nav-item">
        <a class="nav-link px-2" href="/clock">Clock</a>
      </li>

      <!-- MEMBER 3: Dark mode button -->
      <li class="nav-item">
        <button
          type="button"
          class="btn btn-outline-light btn-sm ms-3"
          onclick={toggleTheme}
          aria-label="Toggle light and dark mode"
          aria-pressed={darkMode}
        >
          {darkMode ? '☀ Light Mode' : '☾ Dark Mode'}
        </button>
      </li>
    </ul>
  </div>
</nav>

<!-- Teammate's original main content -->
<main class="container py-4">
  {@render children()}
</main>