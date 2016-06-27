module.exports.base = {
  devDependencies: {
    'eslint': '^2.11.0',
    'eslint-config-xo-space': '^0.12.0'
  },
  eslintConfig: {
    root: true,
    env: {
      browser: true,
      jasmine: true
    }
  }
};

module.exports.reactBase = {
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
};

module.exports.jsBase = {
  eslintConfig: {
    extends: [
      'xo-space'
    ]
  }
};

module.exports.injectAngular1 = {
  eslintConfig: {
    globals: {
      angular: true
    }
  }
};

module.exports.babelBase = {
  devDependencies: {
    'babel-preset-es2015': '^6.2.0',
    'babel-core': '^6.2.0',
    'babel-polyfill': '^6.7.4'
  }
};

module.exports.angular2NotTypescriptBase = {
  eslintConfig: {
    rules: {
      'new-cap': [2, {capIsNewExceptions: ['Input', 'Output', 'Component', 'Injectable', 'RouteConfig', 'Class', 'ViewChild', 'Directive', 'Pipe']}]
    }
  }
};

module.exports.systemjsAngular2 = {
  jspm: {
    devDependencies: {
      'babel-plugin-transform-es2015-typeof-symbol': 'npm:babel-plugin-transform-es2015-typeof-symbol@^6.8.0',
      'babel-plugin-angular2-annotations': 'npm:babel-plugin-angular2-annotations@^5.0.0',
      'babel-plugin-transform-decorators-legacy': 'npm:babel-plugin-transform-decorators-legacy@^1.3.4',
      'babel-plugin-transform-class-properties': 'npm:babel-plugin-transform-class-properties@^6.6.0',
      'babel-plugin-transform-flow-strip-types': 'npm:babel-plugin-transform-flow-strip-types@^6.6.4'
    }
  }
};

module.exports.babelTypescriptBase = {
  devDependencies: {
    'babel-eslint': '^6.0.2',
    'eslint-plugin-babel': '^3.1.0'
  },
  eslintConfig: {
    extends: [
      'xo-space/esnext'
    ]
  }
};

module.exports.webpackBase = {
  devDependencies: {
    'eslint-loader': '^1.3.0',
    'babel-loader': '^6.2.0'
  }
};

module.exports.systemjsBase = {
  devDependencies: {
    'gulp-eslint': '^2.0.0'
  },
  eslintConfig: {
    globals: {
      SystemJS: true
    }
  }
};

module.exports.injectBase = {
  devDependencies: {
    'gulp-eslint': '^2.0.0'
  }
};

module.exports.systemjsReactBase = {
  jspm: {
    devDependencies: {
      'babel-preset-react': 'npm:babel-preset-react@^6.5.0'
    }
  }
};

module.exports.injectReactBase = {
  eslintConfig: {
    globals: {
      React: true,
      ReactDOM: true,
      axios: true
    },
    rules: {
      'react/jsx-no-undef': 0,
      'no-undef': 0,
      'no-unused-vars': 0
    }
  }
};
