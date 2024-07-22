<script lang="ts">
	import Form from "./Form.svelte";
</script>

<svelte:head>
	<title>Url Shortener</title>
	<meta name="description" content="Url shortener service" />
</svelte:head>

<section>
	<hgroup>
		<h2>
			Enter your <strong>URL</strong> and preferred shortening for it:
		</h2>
		<p>
			A new link will be generated 
			and will be pointing to your original url.
		</p>
	</hgroup>

	<Form />
</section>

<style lang="scss">
	section {
		padding-top: 5em;
	}
</style>
