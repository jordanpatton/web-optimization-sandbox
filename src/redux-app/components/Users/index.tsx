import * as React from 'react';
import { connect } from 'react-redux';
import { AutoSizer, Column, Table, WindowScroller } from 'react-virtualized';

import { indexUsers } from '../../actions/users';
import { indexUsersWithWorker } from '../../actions/usersWithWorker';
import { IUser } from '../../types';
import Blinker from './components/Blinker';
import Chart from './components/Chart';

interface IUsersProps {
    indexUsers: () => Promise<any>;
    indexUsersWithWorker: () => Promise<any>;
    users?: IUser[];
};
interface IUsersState {
    chartIsVisible: boolean;
    tableIsVirtualized: boolean;
};

export class Users extends React.Component<IUsersProps, IUsersState> {
    constructor(props: IUsersProps) {
        super(props);
        this.state = {
            chartIsVisible: false,
            tableIsVirtualized: false,
        };
    }

    componentDidMount() {
        if (!this.props.users) {
            this.props.indexUsers();
        }
    }

    renderBasicTable() {
        const { users } = this.props;
        const { chartIsVisible } = this.state;
        return (
            <table style={{ textAlign: 'left', width: '100%' }}>
                <thead>
                    <tr style={{ fontWeight: 'bold', height: '40px', textTransform: 'uppercase' }}>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email Address</th>
                        <th>Company Name</th>
                        <th>Avatar</th>
                        <th>Coin Flip</th>
                        <th>Revenue</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} style={{ height: '40px' }}>
                            <td>{user.id}</td>
                            <td>{user.first_name} {user.last_name}</td>
                            <td>{user.email_address}</td>
                            <td>{user.company_name}</td>
                            <td><img src={user.image_url} alt="avatar" title="avatar" /></td>
                            <td>{user.coin_flip}</td>
                            <td>{chartIsVisible ? <Chart /> : ''}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    renderVirtualizedTable() {
        const { users } = this.props;
        const { chartIsVisible } = this.state;
        return (
            <WindowScroller>
                {({ height, isScrolling, onChildScroll, scrollTop }) => (
                    <AutoSizer disableHeight>
                        {({ width }) => (
                            <Table
                                autoHeight
                                headerHeight={40}
                                height={height}
                                isScrolling={isScrolling}
                                onScroll={onChildScroll}
                                rowCount={users.length}
                                rowGetter={({ index }) => users[index]}
                                rowHeight={40}
                                scrollTop={scrollTop}
                                width={width}
                            >
                                <Column
                                    dataKey="id"
                                    label="ID"
                                    width={50}
                                />
                                <Column
                                    cellDataGetter={({ rowData }) => `${rowData.first_name} ${rowData.last_name}`}
                                    dataKey="name"
                                    flexGrow={2}
                                    label="Name"
                                    width={100}
                                />
                                <Column
                                    dataKey="email_address"
                                    flexGrow={2}
                                    label="Email Address"
                                    width={100}
                                />
                                <Column
                                    dataKey="company_name"
                                    flexGrow={1}
                                    label="Company Name"
                                    width={100}
                                />
                                <Column
                                    cellRenderer={({ cellData }) => <img src={cellData} alt="avatar" title="avatar" />}
                                    dataKey="image_url"
                                    label="Avatar"
                                    width={100}
                                />
                                <Column
                                    dataKey="coin_flip"
                                    label="Coin Flip"
                                    width={100}
                                />
                                <Column
                                    cellDataGetter={() => {}}
                                    cellRenderer={() => chartIsVisible ? <Chart /> : ''}
                                    dataKey="revenue"
                                    label="Revenue"
                                    width={100}
                                />
                            </Table>
                        )}
                    </AutoSizer>
                )}
            </WindowScroller>
        );
    }

    render() {
        const { indexUsers, indexUsersWithWorker, users } = this.props;
        const { chartIsVisible, tableIsVirtualized } = this.state;
        return users ? (
            <React.Fragment>
                <div style={{ position: 'fixed', top: '0', width: '100%', zIndex: 1 }}>
                    <div style={{ backgroundColor: '#CCCCCC' }}>
                        <div style={{ display: 'inline-block' }}>
                            <input
                                checked={tableIsVirtualized}
                                id="tableIsVirtualized"
                                name="tableIsVirtualized"
                                onChange={e => this.setState({ tableIsVirtualized: e.target.checked })}
                                type="checkbox"
                            />
                            <label htmlFor="tableIsVirtualized">
                                virtualize
                            </label>
                        </div>
                        <span>&nbsp;&nbsp;&nbsp;</span>
                        <div style={{ display: 'inline-block' }}>
                            <input
                                checked={chartIsVisible}
                                id="chartIsVisible"
                                name="chartIsVisible"
                                onChange={e => this.setState({ chartIsVisible: e.target.checked })}
                                type="checkbox"
                            />
                            <label htmlFor="chartIsVisible">
                                show chart
                            </label>
                        </div>
                        <span>&nbsp;&nbsp;&nbsp;</span>
                        <button onClick={() => indexUsers()} type="button">
                            reload without worker
                        </button>
                        <span>&nbsp;&nbsp;&nbsp;</span>
                        <button onClick={() => indexUsersWithWorker()} type="button">
                            reload with worker
                        </button>
                    </div>
                    <Blinker />
                </div>
                <div style={{ padding: '62px 24px 24px 24px' }}>
                    {tableIsVirtualized ? this.renderVirtualizedTable() : this.renderBasicTable()}
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
