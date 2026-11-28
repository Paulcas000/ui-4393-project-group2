<script>
  import { onDestroy } from 'svelte';

  let hours = $state(undefined);
  let minutes = $state(undefined);
  let seconds = $state(undefined);
  let running = $state(false);
  let finished = $state(false);

  let interval;

  function stopTimer() {
    clearInterval(interval);
    running = false;
  }

  function resetTimer() {
    stopTimer();
    hours = undefined;
    minutes = undefined;
    seconds = undefined;
    finished = false;
  }

  function startTimer(event) {
    event.preventDefault();
    if (running) return;

    const duration = (hours ?? 0) * 3600 + (minutes ?? 0) * 60 + (seconds ?? 0);
    if (duration <= 0) return;

    const endsAt = Date.now() + duration * 1000;
    finished = false;
    running = true;

    function tick() {
      const remaining = Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));

      hours = Math.floor(remaining / 3600);
      minutes = Math.floor(remaining / 60) % 60;
      seconds = remaining % 60;

      if (remaining === 0) {
        stopTimer();
        finished = true;

        const bell = new Audio('/bell_sound.mp3');
        bell.play().catch(() => {
          // The timer still shows "Time's up!" if playback is blocked.
        });
      }
    }

    tick();
    interval = setInterval(tick, 250);
  }

  onDestroy(stopTimer);
</script>

<svelte:head>
  <title>Timer | StudyTrack</title>
</svelte:head>

<h1>Timer</h1>

<form class="timer p-3 border rounded" class:running onsubmit={startTimer}>
  <div class="timer-fields mb-3">
    <label>
      Hours
      <input class="form-control" type="number" min="0" step="1"
        bind:value={hours} readonly={running} placeholder="hh" />
    </label>

    <label>
      Minutes
      <input class="form-control" type="number" min="0" step="1"
        bind:value={minutes} readonly={running} placeholder="mm" />
    </label>

    <label>
      Seconds
      <input class="form-control" type="number" min="0" step="1"
        bind:value={seconds} readonly={running} placeholder="ss" />
    </label>
  </div>

  <button class="btn btn-primary" type="submit" disabled={running}>Start Timer</button>
  <button class="btn btn-outline-secondary" type="button" onclick={resetTimer}>Reset Timer</button>

  <p class="mt-3 mb-0" role="status">
    {finished ? "Time's up!" : running ? 'Timer running' : 'Set a duration to start.'}
  </p>
</form>

<style>
  .timer {
    max-width: 28rem;
    background: white;
  }

  .timer.running {
    background: #e5f5e9;
  }

  .timer-fields {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.75rem;
  }
</style>