// Adding the question mark to the props
// inside of the interface will make it optional

import {Eventing} from './Eventing';
import {Sync} from './Sync';
import {Attributes} from './Attributes';
import {AxiosResponse} from 'axios';
import {Model} from './Model'

export interface UserProps {
	name?: string;
	age?: number;
	id?: number;
}

const rootUrl = 'http://localhost:3000/users';

export class User extends Model<UserProps> {
	
}
