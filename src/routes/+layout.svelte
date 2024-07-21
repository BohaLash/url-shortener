<script>
	import Header from './Header.svelte';
	import '../app.scss';
</script>

<div class="app">
	<Header />

	<main class="container">
		<slot />
	</main>

	<footer>
		<p>
			created accordingly to 
			<a href="https://obs.nodeart.app/NA/Hire/Questions/Svelte-Kit-Test-Task">
				Svelte Kit Test Task
			</a> 
			manual
		</p>
	</footer>
</div>

<style lang="scss">
	footer {
		text-align: center;
	}
</style>
