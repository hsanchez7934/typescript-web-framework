import {View} from './View';
import {User, UserProps} from '../models/User';

export class UserShow extends View<User, UserProps> {
	template = (): string => `
	<div>
		<hi1>User Detail</hi1>
		<div>User Name: ${this.model.get('name')}</div>
		<div>User Age: ${this.model.get('age')}</div>
	</div>`;
}
