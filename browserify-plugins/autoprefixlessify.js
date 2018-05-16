'use strict';

var through = require('through2');
var less = require('less');
var postcss = require('postcss');
var autoprefixer = require('autoprefixer');

var MATCHES_CSS_OR_LESS = /\.(css|less)$/;
var LESS_OPTIONS = {
  compress: true
};
var FUNC_START = '(function() { var head = document.getElementsByTagName(\'head\')[0];' +
  'var style = document.createElement(\'style\'); style.type = \'text/css\';';
var FUNC_END = 'if (style.styleSheet){ style.styleSheet.cssText = css; } else {' +
  'style.appendChild(document.createTextNode(css)); } head.appendChild(style);}())';

module.exports = function (file) {
  if (!MATCHES_CSS_OR_LESS.test(file)) {
    return through();
  }

  var buffer = '';

  function write (chunk, enc, next) {
    buffer += chunk;
    next();
  }

  function end (done) {
    var self = this;

    less.render(buffer, LESS_OPTIONS, function (lessError, lessResult) {
      if (lessError) {
        done(new Error('Less error: ' + (lessError && lessError.message)));
      } else {
        postcss([autoprefixer])
          .process(lessResult.css, {from: file})
          .then(function (postcssResult) {
            self.push(FUNC_START + 'var css = ' + JSON.stringify(postcssResult.css) + ';' + FUNC_END);

            // Notify watchers of new files to watch
            for (var i = 0; i < lessResult.imports.length; i += 1) {
              var imported = lessResult.imports[i];

              self.emit('file', imported);
            }

            done();
          })
          .catch(function (postcssError) {
            done(new Error('Postcss error: ' + (postcssError && postcssError.message)));
          });
      }
    });
  }

  return through(write, end);
};
