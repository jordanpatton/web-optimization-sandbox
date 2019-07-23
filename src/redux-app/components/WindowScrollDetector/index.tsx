import * as React from 'react';
import { throttle } from 'lodash';

/** Expires timeout when idle. */
const IDLE_EXPIRATION_MILLISECONDS = 1000;
/** Throttles event listener. Must be shorter than `IDLE_EXPIRATION_MILLISECONDS`. */
const THROTTLE_WAIT_MILLISECONDS = 900;

interface IWindowScrollDetectorProps {
    children: ({ isScrolling }: { isScrolling: boolean }) => React.ReactNode;
}
interface IWindowScrollDetectorState {
    timeoutId?: number;
}

export class WindowScrollDetector extends React.Component<
    IWindowScrollDetectorProps,
    IWindowScrollDetectorState
> {
    constructor(props: IWindowScrollDetectorProps) {
        super(props);
        this.state = { timeoutId: undefined };
        this.handleScroll = throttle(
            this.handleScroll.bind(this),
            THROTTLE_WAIT_MILLISECONDS
        );
    }

    handleScroll() {
        const { timeoutId } = this.state;

        if (typeof window !== 'undefined') {
            // clear previous timeout
            if (typeof timeoutId === 'number') {
                window.clearTimeout(timeoutId);
            }

            // start next timeout
            if (typeof window !== 'undefined') {
                this.setState({ timeoutId: window.setTimeout(() => {
                    // user stopped scrolling; clear expired timeout
                    this.setState({ timeoutId: undefined });
                }, IDLE_EXPIRATION_MILLISECONDS) });
            }
        }
    }

    componentDidMount() {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', this.handleScroll);
        }
    }

    shouldComponentUpdate(
        _nextProps: IWindowScrollDetectorProps,
        nextState: IWindowScrollDetectorState
    ) {
        const currIsScrolling = typeof this.state.timeoutId === 'number';
        const nextIsScrolling = typeof nextState.timeoutId === 'number';
        return currIsScrolling !== nextIsScrolling;
    }

    componentWillUnmount() {
        if (typeof window !== 'undefined') {
            window.removeEventListener('scroll', this.handleScroll);
        }
    }

    render() {
        const { children } = this.props;
        const { timeoutId } = this.state;
        return children({ isScrolling: typeof timeoutId === 'number' });
    }
}

export default WindowScrollDetector;
