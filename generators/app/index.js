const _ = require('lodash');
const fountain = require('fountain-generator');

module.exports = fountain.Base.extend({
  prompting() {
    this.fountainPrompting();
  },

  configuring: {
    pkg() {
      const pkg = {devDependencies: {eslint: '^1.10.3'}};

      if (this.props.modules === 'webpack') {
        _.merge(pkg, {devDependencies: {'eslint-loader': '^1.1.1'}});
      } else {
        _.merge(pkg, {devDependencies: {'gulp-eslint': '^1.0.0'}});
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
