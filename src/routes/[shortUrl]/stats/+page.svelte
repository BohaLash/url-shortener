<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
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

	<h5>URL: <a href={data.url}>{data.url}</a></h5>

	<h5>Total clicks: <mark>{data.totals}</mark></h5>

	{#if data.clicks.length}
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
					{@const date = new Date(click.time)}
					<tr>
						<th scope="row">{date.toLocaleTimeString()}</th>
						<th scope="row">{date.toLocaleDateString()}</th>
						<td>{click.ip || 'unknown'}</td>
						<td>{click.useragent || 'unknown'}</td>
						<td>{click.geo || 'unknown'}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
</section>

<style lang="scss">
</style>
