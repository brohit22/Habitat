// Import required modules
import express from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import ejs from 'ejs'; // Templating engine for generating dynamic HTML
import indexRoute from './routes/index.js';

const app = express();

app.use('/', indexRoute);

// Serve static files from the "assets" directory
app.use(express.static('./assets'));

// Parse URL-encoded request bodies
app.use(express.urlencoded());

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the directory for views
app.set('views', './views');

// Use EJS layouts
app.use(expressEjsLayouts);

// Extract CSS styles and JavaScript scripts from layout files
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Set up routes (Note: using import instead of require)
import indexRouter from './routes/index.js';
app.use('/', indexRouter); // Use the index route for the root URL ("/")

export { app };
