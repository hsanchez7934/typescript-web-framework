import {UserForm} from './views/UserForm';
import {User} from './models/User';

const userForm = new UserForm(
	document.getElementById('root'),
	User.buildUser({name: 'Sara', age: 25})
);

userForm.render();
