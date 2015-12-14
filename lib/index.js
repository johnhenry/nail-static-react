module.exports = (opts) => {
  const options = opts || {};
  options.mode = options.mode || 'single';
  switch(options.mode){
    case 'single': return require('./single')(options);
    case 'blog': return require('./blog')(options);
    default: return Promise.resolve(true);
  }
};
