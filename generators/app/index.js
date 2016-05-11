const fountain = require('fountain-generator');

module.exports = fountain.Base.extend({
  configuring: {
    pkg() {
      this.mergeJson('package.json', {
        devDependencies: {
          'eslint': '^2.4.0',
          'eslint-config-xo-space': '^0.12.0'
        },
        eslintConfig: {
          root: true,
          env: {
            browser: true,
            jasmine: true
          }
        }
      });

      if (this.options.framework === 'react') {
        this.mergeJson('package.json', {
          devDependencies: {
            'babel-preset-react': '^6.1.18',
            'eslint-config-xo-react': '^0.7.0',
            'eslint-plugin-react': '^5.0.1'
          },
          eslintConfig: {
            extends: [
              'xo-react/space'
            ]
          }
        });
        if (this.options.modules === 'inject') {
          this.mergeJson('package.json', {
            eslintConfig: {
              globals: {
                React: true,
                ReactDOM: true,
                axios: true
              },
              rules: {
                'react/jsx-no-undef': 0,
                'no-unused-vars': 0 // eslint not compatible with react/inject
              }
            }
          });
        }
      }

      if (this.options.modules === 'webpack') {
        this.mergeJson('package.json', {
          devDependencies: {
            'eslint-loader': '^1.3.0',
            'babel-loader': '^6.2.0'
          }
        });
      } else {
        this.mergeJson('package.json', {devDependencies: {'gulp-eslint': '^2.0.0'}});
      }

      if (this.options.js === 'js') {
        this.mergeJson('package.json', {
          eslintConfig: {
            extends: [
              'xo-space'
            ]
          }
        });
      } else {
        this.mergeJson('package.json', {
          devDependencies: {
            'babel-eslint': '^6.0.2',
            'eslint-plugin-babel': '^3.1.0'
          },
          eslintConfig: {
            extends: [
              'xo-space/esnext'
            ]
          }
        });
      }

      if (this.options.framework === 'angular2' && this.options.js !== 'typescript') {
        this.mergeJson('package.json', {
          eslintConfig: {
            rules: {
              'new-cap': [2, {capIsNewExceptions: ['Input', 'Output', 'Component', 'View', 'Injectable', 'RouteConfig', 'Class']}]
            }
          }
        });
      }

      if (this.options.modules === 'inject') {
        if (this.options.framework === 'angular1') {
          this.mergeJson('package.json', {
            eslintConfig: {
              globals: {
                angular: true
              }
            }
          });
        }
        if (this.options.js === 'babel' || this.options.js === 'js' && this.options.framework === 'react') {
          this.mergeJson('package.json', {devDependencies: {'gulp-babel': '^6.1.0'}});
        }
      }

      if (this.options.modules === 'systemjs') {
        this.mergeJson('package.json', {eslintConfig: {globals: {SystemJS: true}}});

        if (this.options.framework === 'angular2') {
          this.mergeJson('package.json', {
            jspm: {
              devDependencies: {
                'babel-plugin-angular2-annotations': 'npm:babel-plugin-angular2-annotations@^5.0.0',
                'babel-plugin-transform-decorators-legacy': 'npm:babel-plugin-transform-decorators-legacy@^1.3.4',
                'babel-plugin-transform-class-properties': 'npm:babel-plugin-transform-class-properties@^6.6.0',
                'babel-plugin-transform-flow-strip-types': 'npm:babel-plugin-transform-flow-strip-types@^6.6.4'
              }
            }
          });
        } else if (this.options.framework === 'react') {
          this.mergeJson('package.json', {jspm: {devDependencies: {'babel-preset-react': 'npm:babel-preset-react@^6.5.0'}}});
        }

        if (this.options.js !== 'typescript') {
          this.mergeJson('package.json', {
            jspm: {
              dependencies: {babel: 'npm:babel-core@^6.6.5'},
              devDependencies: {'plugin-babel': 'npm:systemjs-plugin-babel@^0.0.8'}
            }
          });
        }
      }

      if (this.options.js === 'babel' || this.options.js === 'js' && this.options.framework === 'react') {
        this.mergeJson('package.json', {devDependencies: {'babel-core': '^6.2.0', 'babel-polyfill': '^6.7.4'}});
      }

      if (this.options.js === 'babel') {
        this.mergeJson('package.json', {devDependencies: {'babel-preset-es2015': '^6.2.0'}});
      }
    }
  },

  writing: {
    wiring() {
      if (this.options.modules === 'webpack' && this.options.js !== 'typescript') {
        this.replaceInFileWithTemplate(
          'conf/webpack.conf.js',
          'conf/webpack-test.conf.js',
          / {2}module: \{/
        );
        this.replaceInFileWithTemplate(
          'conf/webpack.conf.js',
          'conf/webpack-dist.conf.js',
          / {2}module: \{/
        );
      } else if (this.options.modules === 'systemjs') {
        this.copyTemplate(
          'gulp_tasks/scripts-full.js',
          'gulp_tasks/scripts.js'
        );
      } else if (this.options.modules === 'inject' && this.options.js !== 'typescript') {
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
