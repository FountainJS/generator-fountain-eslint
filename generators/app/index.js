const _ = require('lodash');
var fountain = require('fountain-generator');

module.exports = fountain.Base.extend({
  prompting: function () {
    this.fountainPrompting();
  },

  configuring: {
    package: function () {
      var pkg = { devDependencies: { eslint: '^1.10.3' } };

      if (this.props.modules === 'webpack') {
        _.merge(pkg, { devDependencies: { 'eslint-loader': '^1.1.1' } });
      } else {
        _.merge(pkg, { devDependencies: { 'gulp-eslint': '^1.0.0' } });
      }

      this.mergeJson('package.json', pkg);
    },

    eslint: function () {
      const eslint = {
        extends: 'eslint:recommended',
        env: { es6: true, browser: true, jasmine: true },
        ecmaFeatures: { modules: true },
        globals: { module: true, inject: true }
      };

      if (this.props.framework === 'react') {
        _.merge(eslint, {
          plugins: ['react'],
          ecmaFeatures: { jsx: true },
          rules: { 'react/jsx-uses-react': 1 }
        });
      }

      if (this.props.modules === 'inject') {
        if (this.props.framework === 'react') {
          _.merge(eslint, {
            globals: { React: true, ReactDOM: true }
          });
        }

        if (this.props.framework === 'angular1') {
          _.merge(eslint, {
            globals: { angular: true }
          });
        }

        if (this.props.framework === 'angular2') {
          _.merge(eslint, {
            globals: { ng: true }
          });
        }
      }

      this.fs.writeJSON(this.destinationPath('conf/eslint.conf.json'), eslint);
    },

    rc: function () {
      ['conf', 'gulp_tasks', 'src'].forEach(path => {
        this.fs.copyTpl(
          this.templatePath(`${path}/.eslintrc`),
          this.destinationPath(`${path}/.eslintrc`)
        );
      });
    }
  },

  writing: {
    wireing: function () {
      if (this.props.modules === 'webpack') {
        this.replaceInFile(
          'conf/webpack.conf.js',
          / {2}module: \{/
        );
      } else if (this.props.modules === 'systemjs') {
        this.fs.copyTpl(
          this.templatePath('gulp_tasks/scripts.js'),
          this.destinationPath('gulp_tasks/scripts.js'),
          { full: true }
        );
      } else if (this.props.modules === 'inject') {
        this.replaceInFile(
          'gulp_tasks/scripts.js',
          / {2}return gulp\.src[^\n]*/,
          { full: false }
        );
      }
    }
  }
});
