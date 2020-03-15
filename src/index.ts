import axios from 'axios';
import {User} from './models/User';

const user = new User({id: 1, name: 'Armando', age: 21});

user.on('save', () => {
	console.log(user);
});

user.save();
