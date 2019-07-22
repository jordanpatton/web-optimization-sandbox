import * as React from 'react';
import { connect } from 'react-redux';

import { indexObservations } from '../../../../actions/observations';
import { indexObservationsWithWorker } from '../../../../actions/observationsWithWorker';
import FlexibleSparkline from '../../../../charts/FlexibleSparkline';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import { IObservation } from '../../../../types';

interface IFlexibleSparklineContainerProps {
    indexObservations: () => Promise<any>;
    indexObservationsWithWorker: () => Promise<any>;
    observations?: IObservation[];
}

export class FlexibleSparklineContainer extends React.Component<IFlexibleSparklineContainerProps> {
    componentDidMount() {
        if (!this.props.observations) {
            this.props.indexObservations();
        }
    }

    render() {
        const { observations } = this.props;

        if (observations && observations.length) {
            // clean up observations
            const series = observations.filter(v => (
                typeof v.timestampMs !== 'undefined'
                && v.timestampMs !== null
                && !isNaN(v.timestampMs)
                && typeof v.valueUsd !== 'undefined'
                && v.valueUsd !== null
                && !isNaN(v.valueUsd)
            )).map(v => ({
                x: new Date(v.timestampMs),
                y: v.valueUsd,
            })).sort((a, b) => (
                a.x.getTime() - b.x.getTime()
            ));

            // determine start and end
            const start = series.length ? series[0].x : undefined;
            const end = series.length ? series[series.length - 1].x : undefined;

            // render as chart
            return (
                <div style={{ height: '20px', width: '200px' }}>
                    <FlexibleSparkline
                        data={{ defaultSeriesName: series }}
                        xDomain={[start, end]}
                        xType="time"
                    />
                </div>
            );
        }

        return <LoadingIndicator style={{ height: '20px', width: '20px' }} />;
    }
}

const mapStateToProps = (state: any) => ({
    observations: (
        state.reducers.observations.data
        ? state.reducers.observations.data.observations
        : undefined
    ),
});

const mapDispatchToProps = (dispatch: any) => ({
    indexObservations: () => dispatch(indexObservations()),
    indexObservationsWithWorker: () => dispatch(indexObservationsWithWorker()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FlexibleSparklineContainer);
