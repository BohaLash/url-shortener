<script lang="ts">
	import { page } from "$app/stores";
	import type { PageData } from "./$types";
	import type { Metadata } from "../+server";

	export let data: PageData;

	let isLoading = false;

	const loadMore = async () => {
		isLoading = true;
		const response = await fetch(
			`/api/stats/${$page.params.shortUrl}?next=${data.next}`,
		);
		if (response.ok) {
			const res = await response.json<{clicks: Metadata[], next: string | null}>();
			if (data.clicks) data.clicks.push(...res.clicks);
			else data.clicks = res.clicks;
			data.next = res.next;
		}
		isLoading = false;
	};
</script>

<svelte:head>
	<title>Stats</title>
	<meta name="description" content="{data.shortUrl} stats" />
</svelte:head>

<section>
	<hgroup>
		<h1>Stats</h1>
		<p>
			Information about the generated link
			<strong>{data.shortUrl}</strong>
		</p>
	</hgroup>

	<h5>
		Short URL:
		<a href={"/" + data.shortUrl}>
			{$page.url.host + "/" + data.shortUrl}
		</a>
	</h5>

	<h5>
		Target URL:
		<a href={data.url}>{data.url}</a>
	</h5>

	<h5>
		Total clicks:
		<mark>{data.totals ?? "Error"}</mark>
	</h5>

	{#if data.clicks?.length}
		<table>
			<thead>
				<tr>
					<th scope="col">Time</th>
					<th scope="col">Date</th>
					<th scope="col">IP</th>
					<th scope="col">Useragent</th>
					<th scope="col">Geo</th>
				</tr>
			</thead>
			<tbody>
				{#each data.clicks as click}
					{@const date = click.time && new Date(click.time) || null}
					<tr>
						<th scope="row">{date?.toLocaleTimeString() ?? "unknown"}</th>
						<th scope="row">{date?.toLocaleDateString() ?? "unknown"}</th>
						<td>{click.ip || "unknown"}</td>
						<td>{click.useragent || "unknown"}</td>
						<td>{click.geo || "unknown"}</td>
					</tr>
				{/each}
			</tbody>
		</table>

		{#if data.next}
			<button
				class="secondary"
				type="button"
				aria-busy={isLoading}
				aria-label={isLoading ? "Please wait..." : "Load more clicks"}
				disabled={isLoading}
				on:click={loadMore}
			>
				{#if !isLoading}
					Load more
				{/if}
			</button>
		{/if}
	{/if}
</section>

<style lang="scss">
</style>
