import { IApiUsersResponse, IUser } from '../types';

export function transformUsers(users: IApiUsersResponse['users']): IUser[] {
    return users.map(user => ({
        id: String(user.id),
        first_name: `${user.first_name} ${Math.floor(Math.random() * Math.floor(2)) ? 'heads' : 'tails'}`,
        last_name: `${user.last_name} ${Math.floor(Math.random() * Math.floor(2)) ? 'heads' : 'tails'}`,
        email_address: `${user.email_address} ${Math.floor(Math.random() * Math.floor(2)) ? 'heads' : 'tails'}`,
        company_name: `${user.company_name} ${Math.floor(Math.random() * Math.floor(2)) ? 'heads' : 'tails'}`,
        image_url: user.image_url,
    }));
}
