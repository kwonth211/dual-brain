<script>
	import { fade } from 'svelte/transition';
	import Footer from '$components/Footer.svelte';
	import QuizIcon from '$components/icons/QuizIcon.svelte';
	import { goto } from '$app/navigation';
	import DotIcon from '$components/icons/DotIcon.svelte';
	import Divider from '$components/Divider.svelte';
	import DividerVertical from '$components/DividerVertical.svelte';
	import NextIcon from '$components/icons/NextIcon.svelte';
	export let data;
	const { user, statistics } = data;
</script>

<div in:fade class="container">
	<!-- <div class="outer-container">
		<div class="title">홍길동님,</div>
		<div class="content">총 50개의 퀴즈를 푸셨어요! <br /> 아주 잘하고 있습니다!</div>
	</div> -->
	<div
		class="user-card"
		on:keydown={() => {
			goto('/profile');
		}}
		on:click={() => {
			goto('/profile');
		}}
	>
		<div class="user-name">{user?.nickname}</div>

		<div class="user-rank">랭킹 ??위 <DotIcon /> 정답률 {statistics?.accuracy}</div>
		<div class="next-icon-wrapper">
			<NextIcon />
		</div>
	</div>
	<div class="quiz-card">
		<div class="quiz-card-wrapper">
			<div class="correct-quiz-text">맞은 퀴즈</div>
			<div class="correct-quiz-count">{statistics?.correctAnswers}</div>
		</div>
		<DividerVertical />
		<div class="quiz-card-wrapper">
			<div class="incorrect-quiz-text">틀린 퀴즈</div>
			<div class="incorrect-quiz-count">{statistics?.incorrectAnswers}</div>
		</div>
	</div>
	<div class="card-container">
		<div>랭킹</div>
		<div class="overlay">준비 중이에요...</div>
		<div class="create-container">
			<div class="ranking-list-item">
				<!-- TODO 메달 추가 -->
				<div class="rank">1</div>
				<div class="rank-name">Einstein</div>
				<div class="correct-ratio">정답률 90%</div>
			</div>
			<div class="ranking-list-item">
				<!-- TODO 메달 추가 -->
				<div class="rank">2</div>
				<div class="rank-name">페이커</div>
				<div class="correct-ratio">정답률 90%</div>
			</div>
			<div class="ranking-list-item">
				<!-- TODO 메달 추가 -->
				<div class="rank">3</div>
				<div class="rank-name">알파고</div>
				<div class="correct-ratio">정답률 90%</div>
			</div>
			<div class="ranking-list-item">
				<!-- TODO 메달 추가 -->
				<div class="rank">4</div>
				<div class="rank-name">홍길동</div>
				<div class="correct-ratio">정답률 90%</div>
			</div>
			<div class="ranking-list-item">
				<!-- TODO 메달 추가 -->
				<div class="rank">5</div>
				<div class="rank-name">홍길동</div>
				<div class="correct-ratio">정답률 90%</div>
			</div>
			<div class="ranking-list-item">
				<!-- TODO 메달 추가 -->
				<div class="rank">6</div>
				<div class="rank-name">홍길동</div>
				<div class="correct-ratio">정답률 90%</div>
			</div>
		</div>
	</div>
	<Footer />
</div>

<style>
	.rank {
		color: #424242;
		text-align: center;
		font-family: Pretendard;
		font-size: 23px;
		font-style: normal;
		font-weight: 600;
		line-height: 22px; /* 95.652% */
		letter-spacing: -0.408px;
		flex: 0.3;
		/* margin-right: 15px; */
	}
	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(255, 255, 255, 0.8); /* 흰색 배경에 80% 투명도 */
		z-index: 10;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 16px;
		color: gray;
		border-radius: 16px;
		margin-bottom: 61px;
	}

	.rank-name {
		color: #424242;
		font-family: Pretendard;
		font-size: 18px;
		font-style: normal;
		flex: 1;
		font-weight: 600;
		line-height: 22px; /* 122.222% */
		letter-spacing: -0.408px;
	}
	.correct-ratio {
		color: rgba(104, 104, 104, 0.6);
		font-family: Pretendard;
		font-size: 13px;
		font-style: normal;
		font-weight: 400;
		line-height: 22px; /* 169.231% */
		letter-spacing: -0.408px;
		/* position: absolute;
		right: 10px; */
		flex: 1;
	}
	.user-name {
		color: #000;
		font-family: Pretendard;
		font-size: 23px;
		font-style: normal;
		font-weight: 700;
		line-height: 22px; /* 95.652% */
		letter-spacing: -0.408px;
	}
	.user-rank {
		color: #5387f7;
		font-family: Pretendard;
		font-size: 15px;
		font-style: normal;
		font-weight: 400;
		line-height: 22px; /* 146.667% */
		letter-spacing: -0.408px;
		display: flex;
		align-items: center;
		gap: 4px;
	}
	.quiz-card-wrapper {
		width: 100%;
		gap: 3px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.user-card {
		margin-top: 40px;
		height: 118px;
		border-radius: 16px;
		background: #fff;
		margin-left: 15px;
		margin-right: 15px;
		display: flex;
		justify-content: center;
		flex-direction: column;
		padding: 15px;
		box-sizing: border-box;
		gap: 9px;
		position: relative;
	}
	.quiz-card {
		height: 65px;
		border-radius: 16px;
		background: #fff;
		margin: 0px 15px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row;
		padding: 13px;
	}
	.container {
		height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: rgba(83, 135, 247, 0.19);
		gap: 10px;
	}

	.quiz-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 100%;
		gap: 10px;
	}

	.create-container {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.ranking-list-item {
		position: relative;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		align-items: center;
		width: 100%;
		height: 59px;
		flex-shrink: 0;
		border-radius: 10px;
		background: #f3f4f6;
		padding: 10px;
		padding-left: 20px;
		box-sizing: border-box;
	}

	.card-container {
		position: relative;
		display: flex;
		flex-direction: column;
		padding: 15px;
		background-color: white;
		margin-left: 15px;
		margin-right: 15px;
		height: 100%;
		border-radius: 16px 16px 0px 0px;
		background: #fff;
		gap: 10px;
	}
	.next-icon-wrapper {
		position: absolute;
		right: 20px;
		top: 20px;
	}
	.correct-quiz-count {
		color: #5387f7;
		font-family: Pretendard;
		font-size: 22px;
		font-style: normal;
		font-weight: 600;
		line-height: 22px; /* 100% */
		letter-spacing: -0.408px;
	}
	.correct-quiz-text {
		color: #727272;
		font-family: Pretendard;
		font-size: 15px;
		font-style: normal;
		font-weight: 400;
		line-height: 22px; /* 146.667% */
		letter-spacing: -0.408px;
	}
	.incorrect-quiz-text {
		color: #727272;
		font-family: Pretendard;
		font-size: 15px;
		font-style: normal;
		font-weight: 400;
		line-height: 22px; /* 146.667% */
		letter-spacing: -0.408px;
	}
	.incorrect-quiz-count {
		color: #ff7971;
		font-family: Pretendard;
		font-size: 22px;
		font-style: normal;
		font-weight: 600;
		line-height: 22px; /* 100% */
		letter-spacing: -0.408px;
	}
</style>