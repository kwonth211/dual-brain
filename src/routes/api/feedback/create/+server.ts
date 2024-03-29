import { json } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import { NAVER_LOGIN_ID, NAVER_LOGIN_PW } from '$env/static/private';

export async function POST({ request }: { request: Request }) {
	const { email, message, selectedOption } = await request.json();

	if (!email || !message || !selectedOption) {
		return json({ error: '필수값을 입력해주세요.' }, { status: 400 });
	}

	const transporter = nodemailer.createTransport({
		service: 'Naver',
		auth: {
			user: NAVER_LOGIN_ID,
			pass: NAVER_LOGIN_PW
		}
	});

	const mailOptions = {
		from: 'kwonth211@naver.com',
		to: 'kwonth211@naver.com',
		subject: '피드백이 도착했어요.',
		text: `새로운 퀴즈가 생성되었습니다.\n\n이메일: ${email}\n내용: ${message}\n선택한 옵션: ${selectedOption}`
	};

	try {
		await new Promise((resolve, reject) => {
			transporter.sendMail(mailOptions, (err, info) => {
				if (err) {
					reject(err);
				} else {
					resolve(info);
				}
			});
		});
	} catch (error) {
		return json({ error: '메일을 보내는 데 실패했습니다.' }, { status: 500 });
	}

	return json({ message: '관리자에게 메일이 발송되었습니다.' }, { status: 201 });
}
