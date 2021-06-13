let db = {
	users: [
		{
			userId: 'dhr324j2i34k2l234',
			email: 'user@email.com',
			handle: 'user',
			createdAt: '2021-06-12T10:20:102Z',
			imageUrl: 'image/deornjfskldsf/asdklajk',
			bio: 'Hello I am someone, nice to see you here ',
			website: 'https://user.com',
			location: 'Berlin, DE',
		},
	],
	screams: [
		{
			userHandle: 'user',
			body: 'this is the scream body',
			createdAt: '2021-06-11T10:38:59.848Z',
			likeCount: 5,
			commentCount: 2,
		},
	],
	comments: [
		{
			userHandle: 'user',
			scremaId: 'usdirgh3i455njsdkflsdufhseu',
			body: 'nice one mate!',
			createdAt: '2021-06-12T10:20:10.234Z',
		},
	],
	notification: [
		{
			recipient: 'user',
			sender: 'john',
			read: 'true | false',
			screamId: 'asd234jio32234',
			type: 'like | comment',
			createdAt: '2021-06-12T10:20:10.234Z',
		},
	],
}
const userDetails = {
	//Redux data
	credentials: {
		userId: 'dhr324j2i34k2l234',
		email: 'user@email.com',
		handle: 'user',
		createdAt: '2021-06-12T10:20:102Z',
		imageUrl: 'image/deornjfskldsf/asdklajk',
		bio: 'Hello I am someone, nice to see you here ',
		website: 'https://user.com',
		location: 'Berlin, DE',
	},
	likes: [
		{
			userHandle: 'user',
			screamId: 'asdjiweu342jnfd',
		},
		{
			userHandle: 'user',
			screamId: 'sdfdsfdsf3434r3',
		},
	],
}
