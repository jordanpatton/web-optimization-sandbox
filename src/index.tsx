import * as React from 'react';
import * as ReactDOM from 'react-dom';

import ReduxApp from './redux-app/components/App';

export const Root = () => <ReduxApp />;

ReactDOM.render(<Root />, document.getElementById('root'));
