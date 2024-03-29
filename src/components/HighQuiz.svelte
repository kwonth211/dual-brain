<!-- Quiz.svelte -->
<script lang="ts">
	import type { Quiz } from '../types/quiz';
	import Button from '$components/Button.svelte';
	import ProgressBar from '$components/ProgressBar.svelte';
	import { fade, fly } from 'svelte/transition';
	import axios from 'axios';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import Input from './Input.svelte';

	export let quiz: Quiz;
	export let onNext = () => {};

	let correctAnimation = {};
	let incorrectAnimation = {};
	let swingAnimation = false;

	export let onCheckAnswer = (isCorrect: boolean) => {};
	export let solvedCount: number;
	export let totalCount: number;
	export let correctCount: number;

	let displayQuestion = '';
	let index = 0;
	let userAnswer = '';
	let showHint = false;

	const typeQuestion = () => {
		if (index < quiz.question.length) {
			displayQuestion += quiz.question[index];
			index++;
			setTimeout(typeQuestion, 50);
		}
	};

	onMount(typeQuestion);

	let submittedAnswer = false;
	let answerIsCorrect = false;

	const submitAnswer = () => {
		answerIsCorrect = userAnswer === quiz.answer;
		submittedAnswer = true;

		setTimeout(() => {
			swingAnimation = true;
			// setTimeout(() => (swingAnimation = false), 1000); // 2초 후 흔들림 애니메이션 종료
		}, 500); // 떨어지는 효과 후에 0.5초 대기하고 흔들림 애니메이션 시작
		if (answerIsCorrect) {
			correctAnimation = {
				duration: 1000,
				y: -200
			};
		} else {
			incorrectAnimation = {
				duration: 1000,
				y: -100
			};
		}

		axios.post('/api/quiz', {
			quizId: quiz.id,
			answer: userAnswer
		});

		onCheckAnswer(answerIsCorrect);
	};

	const toggleHint = () => {
		showHint = !showHint;
	};

	const closeModal = () => {
		submittedAnswer = false;
	};
</script>

<div in:fade class="container">
	<div class="status-wrapper">
		<div class="progressbar-container">
			<ProgressBar high progress={(solvedCount / totalCount) * 100} />
		</div>
		<div class="count-text">
			{solvedCount}/{totalCount}
			<div class="correct-text">
				맞은개수 <span class="correct-text-count">{correctCount}개</span>
			</div>
			<div class="hint" on:click={toggleHint}>힌트 보기</div>
		</div>
	</div>
	<div class="question-container">
		<div class="question chat-style">
			<div class="q-mark">Q.</div>
			<span>{displayQuestion}<span class="blink" /></span>
		</div>
		{#if submittedAnswer}
			<div class="answer-text" in:fly={answerIsCorrect ? correctAnimation : incorrectAnimation}>
				{quiz.answer}
			</div>
			<div
				class="next-button-wrapper"
				in:fade
				on:click={() => {
					setTimeout(() => {
						onNext();
					}, 500);
				}}
				on:keydown={() => {}}
			>
				>> 다음 문제
			</div>
		{/if}
	</div>
	<div class="answer-container">
		{#if showHint}
			<div class="hint-text">{quiz.hint}</div>
		{/if}
		<Input bind:value={userAnswer} placeholder="띄어쓰기 없이 답을 입력해주세요." />
		<Button classes="answer-button" high onclick={submitAnswer} disabled={submittedAnswer}
			>제출하기</Button
		>
		<!-- <Button classes="answer-button" on:click={onNext}>다음 문제</Button> -->
	</div>
</div>

<style>
	:global(.answer-button) {
		height: var(--button-height);
	}

	.hint {
		color: #797979;
		cursor: pointer;
		position: absolute;
		right: 0px;
	}
	.hint-text {
		margin-top: 10px;
	}

	.question.chat-style {
		padding: 10px;
		border-radius: 15px;
		display: inline-flex;
		align-items: center;
		position: relative;
		box-sizing: border-box;
	}

	.blink {
		border-right: 4px solid rgba(0, 0, 0, 0.6);
		animation: blinking 1s infinite;
		height: 20px;
		vertical-align: middle; /* 이 부분 추가 */
		margin-bottom: 4px;
	}

	@keyframes blinking {
		0% {
			opacity: 0;
		}
		49% {
			opacity: 0;
		}
		50% {
			opacity: 1;
		}
	}

	.container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		overflow: scroll;
		padding: 16px;
		box-sizing: border-box;
		height: calc(100% - 32px);
	}
	.question-container {
		color: #000;
		font-family: Pretendard;
		font-size: 22px;
		font-style: normal;
		font-weight: 500;
		line-height: 22px;
		letter-spacing: -0.408px;
		justify-content: flex-start; /* 추가 */
	}
	.question {
		word-break: break-word;
		position: relative;
		overflow: hidden;
	}
	.question span {
		display: inline-block;
	}
	.question-container .q-mark {
		color: var(--high);
		font-weight: bold;

		margin-right: 15px;
	}
	.q-mark {
		flex-shrink: 0; /* 추가 */
	}

	.button-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 10px;
		width: 100%;
		gap: 8px;
		height: 45%;

		overflow: hidden;
	}
	.progressbar-container {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 100%;
		gap: 8px;
	}
	.difficulty-chip {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 36px;
		height: 26px;

		font-family: Pretendard;
		font-size: 11px;
		font-style: normal;
		font-weight: 400;
		line-height: 22px;
		border-radius: 13px;
	}
	.difficulty-chip.easy {
		/* background-color: #e8f5e9; */
		border: 1px solid #66bb6a;
		color: #66bb6a;
	}
	.difficulty-chip.medium {
		/* background-color: #fff4e5; */
		border: 1px solid #ffa64d;
		color: #ffa64d;
	}
	.difficulty-chip.hard {
		/* background-color: #ffeef0; */
		border: 1px solid #ff4c4c;
		color: #ff4c4c;
	}
	.status-wrapper {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	.button-container :global(.btn) {
		min-height: 60px;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		padding: 10px;

		font-family: Pretendard;
		font-size: 15px;
		font-style: normal;
		font-weight: 400;
		line-height: 22px;
		letter-spacing: -0.408px;
		justify-content: flex-start;
		align-items: stretch;
	}
	.button-content {
		display: flex;
		align-items: center;
		width: 100%;
	}
	.button-container .number {
		width: 30px;
	}

	.count-text {
		position: relative;
		color: #858585;
		font-family: Pretendard;
		font-size: 15px;
		font-style: normal;
		font-weight: 400;
		line-height: 22px; /* 146.667% */
		letter-spacing: -0.408px;
		display: flex;
		gap: 5px;
		align-items: center;
	}
	.correct-text {
		font-size: 13px;
		margin-bottom: 2px;
	}
	.correct-text-count {
		color: var(--high);
		font-family: Pretendard;
		font-size: 13px;
		font-style: normal;
		font-weight: 500;
		line-height: 22px;
		letter-spacing: -0.408px;
	}

	@keyframes buttonClick {
		0% {
			transform: translateY(-50%) scale(1);
		}
		50% {
			transform: translateY(-50%) scale(0.95);
		}
		100% {
			transform: translateY(-50%) scale(1);
		}
	}
	@keyframes slideRight {
		from {
			transform: translateY(-50%) translateX(10px);
			opacity: 0.5;
		}
		to {
			transform: translateY(-50%) translateX(20px);
			opacity: 1;
		}
	}

	.next-button-wrapper {
		position: absolute;
		right: 4px;
		font-size: 14px;
		top: 56%;
		transform: translateY(-50%);
		padding: 8px 12px;
		cursor: pointer;
		transition: background-color 0.3s;
		color: #797979;
	}

	.next-button-wrapper:active,
	.next-button-wrapper:hover {
		animation: slideRight 0.5s forwards;
	}
	.answer-container {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 10px;
	}

	.answer-text {
		text-align: center;
	}
</style>
