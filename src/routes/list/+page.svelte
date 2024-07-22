<script lang="ts">
	
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<svelte:head>
	<title>List</title>
	<meta name="description" content="List of generated links" />
</svelte:head>

<section>
	<hgroup>
		<h1>List of generated links:</h1>
		<p>Click to open stats</p>
	</hgroup>

	<ul>
		{#each data.links as link}
			<li>
				<a href={link + "/stats"}>{link}</a>
			</li>
		{/each}
	</ul>

	{#if data.next}
		<button class="secondary" type="button" on:click={loadMore}>
			Load more
		</button>
	{/if}
</section>

<style lang="scss">
</style>
