<script lang="ts">
	export let onClick = (e: Event) => {};
</script>

<svg
	on:click={onClick}
	xmlns="http://www.w3.org/2000/svg"
	width="17"
	height="16"
	viewBox="0 0 17 16"
	fill="none"
>
	<path d="M1 1H16" stroke="black" stroke-linecap="round" stroke-width="1.5" />
	<path d="M1 8H16" stroke="black" stroke-linecap="round" stroke-width="1.5" />
	<path d="M1 15H16" stroke="black" stroke-linecap="round" stroke-width="1.5" />
</svg>
