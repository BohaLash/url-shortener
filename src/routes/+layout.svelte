<script>
	import Header from './Header.svelte';
    import Footer from './Footer.svelte';
	import '../app.scss';
</script>

<div class="app">
	<Header />

	<main class="container">
		<slot />
	</main>

	<Footer />
</div>

<style lang="scss">
</style>
