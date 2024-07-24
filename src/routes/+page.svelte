<script lang="ts">
    import type { ActionData } from "./$types";
	import Form from "./Form.svelte";

	export let form: ActionData;
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

	<Form bind:form />
</section>

<style lang="scss">
	section {
		padding-top: 5em;
	}
</style>
