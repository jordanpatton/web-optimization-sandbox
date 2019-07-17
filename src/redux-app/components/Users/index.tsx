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
interface IUsersState {};

export class Users extends React.Component<IUsersProps, IUsersState> {
    private tableRef = React.createRef<Table>();
    private windowScrollerRef = React.createRef<WindowScroller>();

    componentDidMount() {
        if (!this.props.users) {
            this.props.indexUsers();
        }
    }

    renderTable({
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
                        <button onClick={() => indexUsers()} type="button">
                            reload
                        </button>
                        <button onClick={() => indexUsersWithWorker()} type="button">
                            reload with worker
                        </button>
                    </div>
                    <Blinker />
                </div>
                <div style={{ padding: '62px 24px 24px 24px' }}>
                    <WindowScroller ref={this.windowScrollerRef}>
                        {({ height, isScrolling, onChildScroll, scrollTop }) => (
                            <AutoSizer disableHeight>
                                {({ width }) => this.renderTable({ height, isScrolling, onChildScroll, scrollTop, width })}
                            </AutoSizer>
                        )}
                    </WindowScroller>
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
