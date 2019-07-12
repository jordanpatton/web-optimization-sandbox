import * as React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import { IUser } from '../../reducers';

interface IUsersProps {
    indexUsers: any;
    users?: IUser[];
};
interface IUsersState {};

export class Users extends React.Component<IUsersProps, IUsersState> {
    componentDidMount() {
        if (!this.props.users) {
            this.props.indexUsers();
        }
    }

    renderTable() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email Address</th>
                        <th>Company Name</th>
                        <th>Avatar</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.users.map(user => (
                        <tr key={user.id}>
                            <th>{user.id}</th>
                            <th>{user.first_name} {user.last_name}</th>
                            <th>{user.email_address}</th>
                            <th>{user.company_name}</th>
                            <th><img src={user.image_url} alt="avatar" title="avatar" /></th>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    render() {
        return this.props.users ? (
            <div style={{ padding: '24px' }}>
                <h2 style={{ fontSize: '36px' }}>All Users</h2>
                {this.renderTable()}
            </div>
        ) : (
            <div style={{ padding: '24px' }}>Loading...</div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    users: state.reducers.users.data ? state.reducers.users.data.users : undefined,
});

const mapDispatchToProps = (dispatch: any) => ({
    indexUsers: () => dispatch(actions.indexUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
