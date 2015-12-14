import single from './single';
import blog from './blog';
module.exports = (opts) => {
  const options = opts || {};
  options.mode = options.mode || 'single';
  switch(options.mode){
    case 'single': return single(options);
    case 'blog': return blog(options);
    default: return Promise.resolve(true);
  }
};
