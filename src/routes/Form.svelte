<script lang="ts">
	import { enhance } from "$app/forms";
	import type { ActionData, SubmitFunction } from "./$types";

	export let form: ActionData;

	$: errors = form?.validationErrors as { [index: string]: string[] | undefined }
	$: areAnyErrors = !!errors?.url || !!errors?.shortUrl || !!errors?.nonFieldErrors

	let isLoading = false;
	let generatedStatsUrl: string | undefined;

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

	const formHandler: SubmitFunction = ({}) => {
		isLoading = true;

		return async ({ result, update }) => {
			await update();
			if (result.type === 'success')
				generatedStatsUrl = result.data!.stats as string | undefined
			isLoading = false;
		};
	};
</script>

<form
	method="post"
	use:enhance={formHandler}
	on:input={() => errors && (errors.nonFieldErrors = undefined)}
	class:wrong={areAnyErrors && false}
>
	<fieldset>
		{#if errors?.nonFieldErrors}
			<legend id="nonFieldErrors-errors" class="errors">
				{#each errors?.nonFieldErrors as error}
					<span>{error}</span>
				{/each}
			</legend>
		{/if}

		<label>
			URL
			<input
				type="url"
				name="url"
				required
				placeholder="https://example.com"
				aria-label="Target URL you to shorten"
				aria-describedby="url-errors"
				aria-invalid={errors?.url && true}
				on:blur={handleUrlProtocol}
				on:input={() => errors && (errors.url = undefined)}
			/>
			<small id="url-errors">
				{#each errors?.url || [] as error}
					<span>{error}</span>
				{/each}
			</small>
		</label>

		<label>
			Alias
			<input
				name="shortUrl"
				required
				pattern="[a-zA-Z0-9-]+"
				placeholder="short-url"
				aria-label="A shortening alias for the URL"
				aria-describedby="shortUrl-errors"
				aria-invalid={errors?.shortUrl && true}
				on:input={() => errors && (errors.shortUrl = undefined)}
			/>
			<small id="shortUrl-errors">
				{#each errors?.shortUrl || [] as error}
					<span>{error}</span>
				{/each}
			</small>
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
			aria-busy={isLoading}
			aria-label={isLoading ? "Please wait..." : "Generate a link"}
			disabled={isLoading || areAnyErrors}
		>
			{#if !isLoading}
				Generate
			{/if}
		</button>
	{/if}
</form>

<style lang="scss">

	form {
		text-align: start;
	}

	.errors {
		color: rgb(136, 57, 53);
	}

	.wrong {
		outline: solid 1px;
		outline-offset: 10px;
		border-radius: 1px;
		outline-color: rgb(136, 57, 53);
	}

	@media (prefers-color-scheme: dark) {
		.errors {
			color: rgb(206, 126, 123);
		}

		.wrong {
			outline-color: rgb(206, 126, 123);
		}
	}
</style>
