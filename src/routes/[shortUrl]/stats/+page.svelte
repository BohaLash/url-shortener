<script lang="ts">
	import type { PageData, ActionData } from "./$types";

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

	<h5>URL: <a href="data.url">{data.url}</a></h5>

	<h5>Total clicks: <mark>{data.totals}</mark></h5>

	{#if data.clicks.length}
		<table>
			<thead>
				<tr>
					<th scope="col">Time</th>
					<th scope="col">IP</th>
					<th scope="col">Useragent</th>
					<th scope="col">Geo</th>
				</tr>
			</thead>
			<tbody>
				{#each data.clicks as click}
					<tr>
						<th scope="row">{click.datetime}</th>
						<td>{click.ip}</td>
						<td>{click.useragent}</td>
						<td>{click.geo}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
</section>

<style lang="scss">
</style>
