<script lang="ts">
	import { page } from '$app/stores';
	import logo from '$lib/images/url-logo.svg';
	import github from '$lib/images/github.svg';
</script>

<header>
	<div class="corner">
		<a href="/">
			<img src={logo} alt="SvelteKit" />
		</a>
	</div>

	<nav>
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			<li aria-current={$page.url.pathname.endsWith('/stats') ? 'page' : undefined}>
				<a href="/stats">Stats</a>
			</li>
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				<a href="/about">About</a>
			</li>
		</ul>
	</nav>

	<div class="corner">
		<a href="https://github.com/BohaLash/url-shortener">
			<img src={github} alt="GitHub" class="dark-theme-invert" />
		</a>
	</div>
</header>

<style lang="scss">
	header {
		display: flex;
		justify-content: space-between;
	}

	.corner {
		width: 3em;
		height: 3em;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 1.5em;
		height: 1.5em;
		object-fit: contain;
	}

	@media (prefers-color-scheme: dark) {
		.dark-theme-invert {
			filter: invert(1);
		}
	}
</style>
