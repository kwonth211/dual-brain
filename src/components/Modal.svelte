<script lang="ts">
	export let close: () => void;
	let modal: EventTarget;
</script>

<div
	class="modal"
	bind:this={modal}
	on:keydown={() => {}}
	on:click={(e) => {
		if (e.target === modal) close();
	}}
>
	<slot />
</div>

<style>
	.modal {
		position: fixed;
		bottom: 25%;
		left: 0;
		top: 0;
		width: 100%;
		max-width: var(--max-width);
		margin: 0 auto;
		right: 0px;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 100;
	}
</style>
