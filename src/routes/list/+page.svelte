<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;

	let isLoading = false;

	const loadMore = async () => {
		isLoading = true;
		const response = await fetch(`/api/stats?next=${data.next}`);
		if (response.ok) {
			const res = await response.json();
			data.links.push(...res.links);
			data.next = res.next;
		}
		isLoading = false;
	};
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
		<button
			class="secondary"
			type="button"
			aria-busy={isLoading}
			aria-label={isLoading ? "Please wait..." : "Load more links"}
			disabled={isLoading}
			on:click={loadMore}
		>
			{#if !isLoading}
				Load more
			{/if}
		</button>
	{/if}
</section>

<style lang="scss">
</style>
