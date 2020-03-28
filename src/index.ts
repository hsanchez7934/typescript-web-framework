import {UserForm} from './views/UserForm';
import {User} from './models/User';

const root = document.getElementById('root')

if (root) {
	const userForm = new UserForm(
		root,
		User.buildUser({ name: 'Sara', age: 25 })
	);
	userForm.render();
} else {
	throw new Error('Root element not found');
}
