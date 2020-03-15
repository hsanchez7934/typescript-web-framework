import axios from 'axios';
import {User} from './models/User';

const user = new User({name: 'Arthur', age: 20});

user.save();
