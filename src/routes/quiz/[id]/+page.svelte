<script lang="ts">
	import { goto } from '$app/navigation';
	import Header from '$components/Header.svelte';
	import IssueModal from '$components/IssueModal.svelte';
	import Quiz from '$components/Quiz.svelte';
	import QuizComplete from '$components/QuizComplete.svelte';
	import QuestionIcon from '$components/icons/QuestionIcon.svelte';
	import AdminFeedbackModal from '$components/AdminFeedbackModal.svelte';
	import axios from 'axios';
	import { page } from '$app/stores';
	import type { CATEGORY } from '$types/categories';

	export let data;
	const {
		currentQuiz,
		nextQuiz,
		solvedCount: _solvedCount,
		unSolvedCount: _unsolvedCount,
		correctCount: _correctCount
	} = data;

	let solvedCount = _solvedCount ?? 0;
	let correctCount = _correctCount ?? 0;
	let unSolvedCount = _unsolvedCount ?? 0;
	let showFeedbackModal = false;
	let showAdminFeedbackModal = false;
	const categoryId = $page.url.searchParams.get('category') as keyof typeof CATEGORY;

	const handleNext = () => {
		if (!nextQuiz) {
			goto('/quiz/complete', {
				replaceState: true
			});
			return;
		}
		const nextUrl = categoryId
			? `/quiz/${nextQuiz.id}?category=${categoryId}`
			: `/quiz/${nextQuiz.id}`;
		window.location.href = nextUrl;
	};
	const handleFeedbackClick = (e: MouseEvent | KeyboardEvent) => {
		e.stopPropagation();
		showFeedbackModal = true;
	};

	const pageTitle = currentQuiz?.question;
	const metaDescription = `${currentQuiz?.option1}, ${currentQuiz?.option2}, ${currentQuiz?.option3}, ${currentQuiz?.option4}. ${currentQuiz?.explanation}`;
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={metaDescription} />

	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={metaDescription} />
	<!-- <meta property="og:image" content="path/to/your/image.jpg" /> -->
</svelte:head>

<div style="height: 100%;">
	<Header
		onClick={() => {
			goto('/');
		}}
		>상식 퀴즈
		<span
			style="position: absolute; top: 7px; right: 10px; cursor: pointer;"
			on:click={handleFeedbackClick}
			on:keydown={(e) => {
				if (e.key === 'Enter') {
					handleFeedbackClick(e);
				}
			}}
		>
			<QuestionIcon />
		</span>
	</Header>

	{#if currentQuiz}
		<Quiz
			onNext={handleNext}
			{correctCount}
			{unSolvedCount}
			onCheckAnswer={(isCorrect) => {
				solvedCount++;
				unSolvedCount--;

				if (isCorrect) {
					correctCount++;
				}
			}}
			quiz={currentQuiz}
		/>
	{:else}
		<QuizComplete />
	{/if}

	{#if showFeedbackModal}
		<IssueModal
			onClose={() => {
				showFeedbackModal = false;
			}}
			onSubmit={async (value) => {
				try {
					showFeedbackModal = false;
					await axios.post('/api/feedback/create', {
						quizId: currentQuiz?.id,
						content: value
					});
					showAdminFeedbackModal = true;
				} catch (error) {}
			}}
		/>
	{/if}

	{#if showAdminFeedbackModal}
		<AdminFeedbackModal
			close={() => {
				showAdminFeedbackModal = false;
			}}
		/>
	{/if}
</div>