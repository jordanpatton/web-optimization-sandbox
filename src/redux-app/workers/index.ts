import './declarations.d.ts';
import behaviors = require('./behaviors.worker.ts');

// This single export is the *only* thing that normal window-based application code should
// import. The import, however, does not behave as you might expect. It only works because
// webpack transforms it into a URL for use with a Web Worker.
export default behaviors;
