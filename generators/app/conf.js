module.exports = function eslintConf(props) {
  const conf = {
    extends: 'eslint:recommended',
    env: { browser: true, jasmine: true },
    ecmaFeatures: { modules: true },
    globals: { module: true, inject: true }
  };

  if (props.js === 'js') {
    conf.env.commonjs = true;
  } else {
    conf.env.es6 = true;
  }

  if (props.framework === 'react') {
    conf.plugins = ['react'];
    conf.ecmaFeatures = { jsx: true };
    conf.rules = { 'react/jsx-uses-react': 1 };
  }

  if (props.modules === 'inject') {
    if (props.framework === 'react') {
      conf.globals = { React: true, ReactDOM: true };
    }

    if (props.framework === 'angular1') {
      conf.globals = { angular: true };
    }

    if (props.framework === 'angular2') {
      conf.globals = { ng: true };
    }
  }

  return conf;
};
