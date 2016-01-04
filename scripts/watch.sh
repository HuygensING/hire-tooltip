#!/bin/sh

node_modules/.bin/watchify src/index.jsx \
  --extension=.jsx \
  --external react \
  --outfile 'node_modules/.bin/derequire > build/index.js' \
  --standalone HireTooltip \
  --transform [ babelify --plugins object-assign ] \
  --transform brfs \
  --verbose