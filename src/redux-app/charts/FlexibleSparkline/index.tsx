import * as React from 'react';
import { AutoSizer } from 'react-virtualized';
import { LineSeries, XYPlot } from 'react-vis';

/** `LineSeries` styles as SVG properties. */
export const LINE_SERIES_STYLES = [
    { stroke: '#FF0000', strokeDasharray: '', strokeWidth: 2 },
    { stroke: '#00FF00', strokeDasharray: '', strokeWidth: 2 },
    { stroke: '#0000FF', strokeDasharray: '', strokeWidth: 2 },
];

namespace Series {
    export type TValue = Date | number | string;
    export interface IObservation { x: TValue; y: TValue; }
}

export interface IFlexibleSparklineProps {
    data: { [seriesName: string]: Series.IObservation[]; };
    xDomain?: [Series.TValue, Series.TValue];
    xType?: string;
}

/**
 * FlexibleSparkline component.
 * Implements custom resize behavior instead of using FlexibleXYPlot.
 */
export const FlexibleSparkline: React.FC<IFlexibleSparklineProps> = ({
    data,
    xDomain = [],
    xType = 'time',
}) => (
    <AutoSizer>
        {({ height, width }) => (
            <XYPlot
                height={height}
                margin={{ left: 1, bottom: 1, top: 1, right: 1 }}
                width={width}
                xDomain={xDomain}
                xType={xType}
            >
                {Object.entries(data).map(([seriesName, seriesData], idx) => (
                    <LineSeries
                        data={seriesData}
                        getNull={(d: Series.IObservation) => d.x !== null && d.y !== null}
                        key={`${seriesName}-line`}
                        {...LINE_SERIES_STYLES[idx % LINE_SERIES_STYLES.length]}
                    />
                ))}
            </XYPlot>
        )}
    </AutoSizer>
);

export default FlexibleSparkline;
