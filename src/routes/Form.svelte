<script lang="ts">
	let isLoading = true;
	let generatedStatsUrl: string;

	const generate = async () => {
		isLoading = false;

		const delay = (ms: any) => new Promise((res) => setTimeout(res, ms));
		await delay(1000);
		generatedStatsUrl = "stats";

		isLoading = true;
	};

	const handleUrlProtocol = (e: FocusEvent) => {
		const DEFAULT_PROTOCOL = "https";
		const WHITE_LIST = ["", "http", "https"];
		const PROTOCOL_REGEX = /^[a-zA-z0-9+-]+:.*/;

		const element = e.target as HTMLInputElement;

		if (element.validity.valid) return;
		if (WHITE_LIST.includes(element.value)) return;
		if (PROTOCOL_REGEX.test(element.value)) return;

		element.value = DEFAULT_PROTOCOL + "://" + element.value;
	};
</script>

<form on:submit={generate}>
	<fieldset>
		<label>
			URL
			<input
				type="url"
				name="url"
				required
				placeholder="https://example.com"
				aria-label="Target URL you to shorten"
				on:blur={handleUrlProtocol}
			/>
		</label>

		<label>
			Alias
			<input
				name="alias"
				required
				placeholder="short-url"
				aria-label="A shortening alias for the URL"
			/>
		</label>
	</fieldset>

	{#if generatedStatsUrl}
		<div>
			<a href={generatedStatsUrl}>
				Open stats of your newly generated link
			</a>
		</div>
	{:else}
		<button
			type="submit"
			aria-busy={!isLoading}
			aria-label={isLoading ? "Generate a link" : "Please wait..."}
			disabled={!isLoading}
		>
			{#if isLoading}
				Generate
			{/if}
		</button>
	{/if}
</form>

<style class="scss">
	form {
		text-align: start;
	}
</style>
