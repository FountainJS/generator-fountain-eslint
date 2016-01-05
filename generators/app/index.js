const _ = require('lodash');
const fountain = require('fountain-generator');
const conf = require('./conf');

module.exports = fountain.Base.extend({
  prompting() {
    this.fountainPrompting();
  },

  configuring: {
    pkg() {
      var pkg = { devDependencies: { eslint: '^1.10.3' } };

      if (this.props.modules === 'webpack') {
        _.merge(pkg, { devDependencies: { 'eslint-loader': '^1.1.1' } });
      } else {
        _.merge(pkg, { devDependencies: { 'gulp-eslint': '^1.0.0' } });
      }

      this.mergeJson('package.json', pkg);
    },

    eslint() {
      this.fs.writeJSON(this.destinationPath('conf/eslint.conf.json'), conf(this.props));
    },

    rc() {
      ['conf', 'gulp_tasks', 'src'].forEach(path => {
        this.fs.copyTpl(
          this.templatePath(`${path}/.eslintrc`),
          this.destinationPath(`${path}/.eslintrc`)
        );
      });
    }
  },

  writing: {
    wireing() {
      if (this.props.modules === 'webpack' && this.props.js !== 'typescript') {
        this.replaceInFile(
          'conf/webpack.conf.js',
          'conf/webpack.conf.js',
          / {2}module: \{/
        );
        this.replaceInFile(
          'conf/webpack.conf.js',
          'conf/webpack-test.conf.js',
          / {2}module: \{/
        );
      } else if (this.props.modules === 'systemjs') {
        this.fs.copyTpl(
          this.templatePath('gulp_tasks/scripts-full.js'),
          this.destinationPath('gulp_tasks/scripts.js')
        );
      } else if (this.props.modules === 'inject' && this.props.js !== 'typescript') {
        this.replaceInFile(
          'gulp_tasks/scripts-require.js',
          'gulp_tasks/scripts.js',
          /const gulp = require\('gulp'\);/
        );
        this.replaceInFile(
          'gulp_tasks/scripts-stream.js',
          'gulp_tasks/scripts.js',
          / {2}return gulp\.src[^\n]*/
        );
      }
    }
  }
});
