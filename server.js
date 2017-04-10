import dotenv from 'dotenv';
import webpack from 'webpack';
import express from 'express';
import path from 'path';
import open from 'open';
import config from './webpack.config.dev';
import app from './server/routes/index';


dotenv.config({ silent: true });

const port = process.env.PORT;

app.use(express.static(path.join(__dirname, '/client')));

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
