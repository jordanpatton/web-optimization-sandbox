import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { getRenderMode, RENDER_MODE_CONCURRENT } from './redux-app/helpers';
import ReduxApp from './redux-app/components/App';

export const Root = () => <ReduxApp />;

if (getRenderMode() === RENDER_MODE_CONCURRENT) {
    // render mode: concurrent (https://reactjs.org/blog/2018/11/27/react-16-roadmap.html)
    (ReactDOM as any).unstable_createRoot(document.getElementById('root')).render(<Root />);
} else {
    // render mode: normal
    ReactDOM.render(<Root />, document.getElementById('root'));
}
