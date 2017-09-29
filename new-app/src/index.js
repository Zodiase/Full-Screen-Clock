import React from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css';
import 'material-components-web/dist/material-components-web.css';
import 'material-design-icons/iconfont/material-icons.css';
import './fonts.css';
import './index.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
