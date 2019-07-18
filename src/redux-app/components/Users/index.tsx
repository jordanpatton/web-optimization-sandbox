import * as React from 'react';
import { connect } from 'react-redux';

import { indexUsers } from '../../actions/users';
import { indexUsersWithWorker } from '../../actions/usersWithWorker';
import { IUser } from '../../types';
import Blinker from '../Blinker';
import { AutoSizer, AutoSizerProps, Column, Table, WindowScroller, WindowScrollerChildProps } from 'react-virtualized';

interface IUsersProps {
    indexUsers: () => Promise<any>;
    indexUsersWithWorker: () => Promise<any>;
    users?: IUser[];
};
interface IUsersState {
    isVirtualized: boolean;
};

export class Users extends React.Component<IUsersProps, IUsersState> {
    constructor(props: IUsersProps) {
        super(props);
        this.state = { isVirtualized: false };
    }

    private tableRef = React.createRef<Table>();
    private windowScrollerRef = React.createRef<WindowScroller>();

    componentDidMount() {
        if (!this.props.users) {
            this.props.indexUsers();
        }
    }

    renderBasicTable() {
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

    renderVirtualizedTable({
        height,
        isScrolling,
        onChildScroll,
        scrollTop,
        width,
    }: {
        height: WindowScrollerChildProps['height'],
        isScrolling: WindowScrollerChildProps['isScrolling'],
        onChildScroll: WindowScrollerChildProps['onChildScroll'],
        scrollTop: WindowScrollerChildProps['scrollTop'],
        width: AutoSizerProps['width'],
    }) {
        const { users } = this.props;
        return (
            <Table
                autoHeight
                headerHeight={20}
                height={height}
                isScrolling={isScrolling}
                onScroll={onChildScroll}
                ref={this.tableRef}
                rowCount={users.length}
                rowGetter={({ index }) => users[index]}
                rowHeight={20}
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
            </Table>
        );
    }

    render() {
        const { indexUsers, indexUsersWithWorker, users } = this.props;
        return users ? (
            <React.Fragment>
                <div style={{ position: 'fixed', top: '0', width: '100%', zIndex: 1 }}>
                    <div style={{ backgroundColor: '#CCCCCC' }}>
                        <button onClick={() => this.setState({ isVirtualized: false }, () => indexUsers())} type="button">
                            reload non-virtualized table without worker
                        </button>
                        <button onClick={() => this.setState({ isVirtualized: false }, () => indexUsersWithWorker())} type="button">
                            reload non-virtualized table with worker
                        </button>
                        <button onClick={() => this.setState({ isVirtualized: true }, () => indexUsers())} type="button">
                            reload virtualized table without worker
                        </button>
                        <button onClick={() => this.setState({ isVirtualized: true }, () => indexUsersWithWorker())} type="button">
                            reload virtualized table with worker
                        </button>
                    </div>
                    <Blinker />
                </div>
                <div style={{ padding: '62px 24px 24px 24px' }}>
                    {this.state.isVirtualized ? (
                        <WindowScroller ref={this.windowScrollerRef}>
                            {({ height, isScrolling, onChildScroll, scrollTop }) => (
                                <AutoSizer disableHeight>
                                    {({ width }) => this.renderVirtualizedTable({
                                        height,
                                        isScrolling,
                                        onChildScroll,
                                        scrollTop,
                                        width,
                                    })}
                                </AutoSizer>
                            )}
                        </WindowScroller>
                    ) : this.renderBasicTable()}
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
