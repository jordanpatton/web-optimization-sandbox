import * as React from 'react';

interface IBlinkerProps {}
interface IBlinkerState {
    isActive: boolean;
}

export class Blinker extends React.Component<IBlinkerProps, IBlinkerState> {
    constructor(props: IBlinkerProps) {
        super(props);
        this.state = { isActive: true };
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({ isActive: !this.state.isActive });
        }, 500);
    }

    render() {
        return (
            <div style={{
                backgroundColor: this.state.isActive ? 'blue' : 'transparent',
                height: '20px',
                transition: '500ms ease-in-out',
                width: '100%',
            }} />
        );
    }
}

export default Blinker;
