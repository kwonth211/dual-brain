<script>
	import Button from '$components/Button.svelte';

	import { fade } from 'svelte/transition';
	import Input from '$components/Input.svelte';
	import { signOut } from '@auth/sveltekit/client';
	import axios from 'axios';
	import { goto } from '$app/navigation';
	import { clearRemainingQuizzes } from '$utils/window/utils';
	import DrawerHeader from '$components/DrawerHeader.svelte';

	export let data;
	const { user } = data;
	let nickname = user?.nickname ?? '';
</script>

<div in:fade>
	<DrawerHeader
		onClick={() => {
			goto('/');
		}}>계정정보</DrawerHeader
	>

	{#if user}
		<form>
			{#if user.name}
				<Input label="이름" placeholder="이름 입력을 입력해주세요" value={user.name} disabled />
			{/if}

			<Input
				label="이메일"
				placeholder="이메일을 입력해주세요"
				value={user.type === 'kakao'
					? 'kakao 계정'
					: user.type === 'naver'
					? 'naver 계정'
					: user.email}
				disabled
			/>
			<Input label="닉네임" placeholder="닉네임을 입력해주세요." bind:value={nickname} />

			<Button
				primary
				classes="change-user-info"
				onclick={async () => {
					await axios.patch(`/api/user/me`, {
						nickname
					});
					goto('/my-page');
				}}>회원 정보 변경</Button
			>
			<Button
				gray
				classes="logout"
				onclick={() => {
					clearRemainingQuizzes();
					signOut();
					goto('/');
					// page refresh
				}}
			>
				로그아웃
			</Button>
		</form>
	{/if}
</div>

<style>
	form {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: calc(100vh - 82px);
		padding: 16px;
		gap: 10px;
	}
	form :global(label) {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	form :global(div) {
		width: 100px;
	}

	form :global(.logout) {
		margin-top: auto;
		height: var(--button-height);
	}
	form :global(.change-user-info) {
		height: var(--button-height);
	}
</style>
