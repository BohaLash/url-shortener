<script lang="ts">
	import type { PageData, ActionData } from "./$types";

	export let data: PageData;
</script>

<svelte:head>
	<title>Stats</title>
	<meta name="description" content="Stats of generated links" />
</svelte:head>

<section>
	<h1>List of generated links:</h1>
	<p>Click to open stats</p>

	<ul>
		{#each data.links as link}
			<li>
				<a href={link.shortUrl + "/stats"}>{link.url}</a>
			</li>
		{/each}
	</ul>
</section>

<style lang="scss">
</style>
