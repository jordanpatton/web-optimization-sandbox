import * as React from 'react';
import { connect } from 'react-redux';

import { indexUsers } from '../../actions/users';
import { indexUsersWithWorker } from '../../actions/usersWithWorker';
import { IUser } from '../../reducers/users';
import Blinker from '../Blinker';

interface IUsersProps {
    indexUsers: () => Promise<any>;
    indexUsersWithWorker: () => Promise<any>;
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
            <React.Fragment>
                <div style={{ position: 'fixed', top: '0', width: '100%' }}>
                    <Blinker />
                    <div style={{ backgroundColor: '#CCCCCC' }}>
                        <button onClick={() => this.props.indexUsers()} type="button">
                            reload
                        </button>
                        <button onClick={() => this.props.indexUsersWithWorker()} type="button">
                            reload with worker
                        </button>
                    </div>
                </div>
                <div style={{ padding: '62px 24px 24px 24px' }}>
                    {this.renderTable()}
                </div>
            </React.Fragment>
        ) : (
            <div style={{ padding: '24px' }}>Loading...</div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    users: state.reducers.users.data ? state.reducers.users.data.users : undefined,
});

const mapDispatchToProps = (dispatch: any) => ({
    indexUsers: () => dispatch(indexUsers()),
    indexUsersWithWorker: () => dispatch(indexUsersWithWorker()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
