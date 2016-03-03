const _ = require('lodash');
const fountain = require('fountain-generator');

module.exports = fountain.Base.extend({
  prompting() {
    this.fountainPrompting();
  },

  configuring: {
    pkg() {
      const pkg = {
        devDependencies: {
          'eslint': '^2.2.0',
          'eslint-config-xo-space': '^0.10.0'
        },
        eslintConfig: {
          env: {
            browser: true
          }
        }
      };

      if (this.props.modules === 'webpack') {
        _.merge(pkg, {devDependencies: {'eslint-loader': '^1.3.0'}});
      } else {
        _.merge(pkg, {devDependencies: {'gulp-eslint': '^2.0.0'}});
      }

      if (this.props.js === 'babel') {
        _.merge(pkg, {
          devDependencies: {
            'babel-eslint': '^5.0.0',
            'eslint-plugin-babel': '^3.1.0'
          },
          eslintConfig: {
            extends: [
              'xo-space/esnext'
            ]
          }
        });
      }

      if (this.props.js === 'js') {
        _.merge(pkg, {
          eslintConfig: {
            extends: [
              'xo-space'
            ]
          }
        });
      }

      if (this.props.framework === 'angular2' && this.props.js === 'babel') {
        _.merge(pkg, {
          eslintConfig: {
            rules: {
              'new-cap': [2, {capIsNewExceptions: ['Input', 'Component', 'View', 'Injectable', 'RouteConfig']}]
            }
          }
        });
      }

      this.mergeJson('package.json', pkg);
    }
  },

  writing: {
    wireing() {
      if (this.props.modules === 'webpack' && this.props.js !== 'typescript') {
        this.replaceInFileWithTemplate(
          'conf/webpack.conf.js',
          'conf/webpack.conf.js',
          / {2}module: \{/
        );
        this.replaceInFileWithTemplate(
          'conf/webpack.conf.js',
          'conf/webpack-test.conf.js',
          / {2}module: \{/
        );
      } else if (this.props.modules === 'systemjs') {
        this.copyTemplate(
          'gulp_tasks/scripts-full.js',
          'gulp_tasks/scripts.js'
        );
      } else if (this.props.modules === 'inject' && this.props.js !== 'typescript') {
        this.replaceInFileWithTemplate(
          'gulp_tasks/scripts-require.js',
          'gulp_tasks/scripts.js',
          /const gulp = require\('gulp'\);/
        );
        this.replaceInFileWithTemplate(
          'gulp_tasks/scripts-stream.js',
          'gulp_tasks/scripts.js',
          / {2}return gulp\.src[^\n]*/
        );
      }
    }
  }
});
