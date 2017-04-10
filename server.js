// import webpack from 'webpack';
// import path from 'path';
// import express from 'express';
// import open from 'open';
// import compression from 'compression';
// import app from './server/routes/index';
// import config from './webpack.config.dev';

// const port = parseInt(process.env.PORT, 10);

// /* eslint-disable no-console */
// const env = (process.env.NODE_ENV || 'development') === 'development';
// if (env) {
//   const compiler = webpack(config);
//   app.use(require('webpack-dev-middleware')(compiler, {
//     noInfo: true,
//     publicPath: config.output.publicPath
//   }));

//   app.use(require('webpack-hot-middleware')(compiler));
// } else {
//   app.use(express.static('dist'));
//   app.use(compression());
// }

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, './client/index.html'));
// });


// app.listen(port, (error) => {
//   if (error) {
//     console.log(error);
//   }
//   if (env) open(`http://localhost:${port}`);
//   console.log(`server running on port ${port}`);
// });

// export default app;
import dotenv from 'dotenv';
import webpack from 'webpack';
import express from 'express';
import path from 'path';
import open from 'open';
import config from './webpack.config.dev';
import app from './server/routes/index';


dotenv.config({ silent: true });

const port = process.env.PORT || 6060;

app.use(express.static(path.join(__dirname, '/client')))

const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/index.html'));
});

app.listen(port
  , (error) => {
    if (!error) {
      open(`http://localhost:${port}`);
    } else {
      console.log('error');
    }
  }
);
