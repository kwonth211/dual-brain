import { sql } from '@vercel/postgres';
import type { User } from '../../types/user';
import { redirect } from '@sveltejs/kit';

export async function load({ locals, request }) {
	const session = await locals.getSession();
	if (!session?.user) {
		throw redirect(307, '/signin');
	}

	const { rows: existingUsers } = await sql`SELECT * FROM users WHERE email=${session.user.email}`;

	if (existingUsers.length === 0) {
		throw new Error('User not found');
	}

	const user = existingUsers[0];

	return { user: user as User };
}
