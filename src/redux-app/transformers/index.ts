import {
    IApiObservationsResponse,
    IApiUsersResponse,
    IObservation,
    IUser,
} from '../types';

export function transformObservations(observations: IApiObservationsResponse['observations']): IObservation[] {
    return observations.slice(0, 30).map((val, idx) => ({
        timestampMs: (new Date(`2019-01-${idx} 00:00:01 UTC`)).getTime(),
        valueUsd: parseFloat(val.revenue_collected),
    }));
}

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
