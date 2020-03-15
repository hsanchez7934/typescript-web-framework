import axios from 'axios';
import {User} from './models/User';

const user = new User({name: 'Sam', age: 30});

user.events.on('change', () => {
	console.log('test');
});

user.events.trigger('change');
