import fs from 'fs';
import path from 'path';

export const users = {
	admin: {
	    name: 'Big Cheese',
	    email: 'admin@aula-radio.com',
	    password: 'admin123', // We should require all passwords to be as highly secure as this one!
	    provider: 'local',
	    roles: ['admin']
	},
	joe: {
		name: 'Joe Plumber',
		email: 'joe@example.com',
		password: 'iamjoe',
		provider: 'local',
		roles: []
	}
}

export const tracks = {
	heaven: {
		title: 'Stairway To Heaven'
	},
	thriller: {
		title: 'Thriller',
		type: 'audio/mp3',
		content: fs.readFileSync(path.resolve(__dirname, 'resources/thriller.mp3'))
	},
	doves: {
		title: 'When Doves Cry'
	}
}

export const albums = {
	zeppelin_iv: {
		title: '',
		released: '1971-11-08'
	},
	thriller: {
		title: 'Thriller',
		released: '1982-11-30'
	},
	purplerain: {
		title: 'Purple Rain',
		released: '1984-06-25'
	}
}

export const artists = {
	prince: {
		name: 'Prince',
		gender: 'M'
	},
	zeppelin: {
		name: 'Led Zeppelin',
		country: 'UK'
	},
	jackson: {
		name: 'Michael Jackson',
		gender: 'M'
	}
}
