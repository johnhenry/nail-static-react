const fs =  require('fs');
const path = require ('path');
const renderIndex = require('../renderer/single/index');
const request = require('sync-request');
const cwd = process.cwd();
module.exports = ({
  source = {},
  config,
  destination = './index.html',
  attach,
  embed,
  amp,
  attachbody,
  embedbody,
  component
}) => {
  const options = opts || {};
  const source = options.source ;
  const config = options.config ;
  const destination = options.destination || './index.html';
  const attach = options.attach;
  const embed = options.embed;
  const amp = options.amp ;
  const attachbody = options.attachbody ;
  const embedbody = options.embedbody ;
  const component = options.component ;
  const resolvedDestination = path.resolve(cwd, config.dir, destination);
  var data = source;
  if(typeof data === 'string'){
    if(data.indexOf('http') !== -1){
      let source =  data.substring(data.indexOf('http'));
      source = source.replace('http:/', 'http://');
      source = source.replace('https:/', 'https://');
      data = JSON.parse(String(request('GET', source).getBody()));
    }else{
      data = JSON.parse(fs.readFileSync(s.source, 'utf-8'));
    }
  }
  const Index = component ?
    require(path.resolve(process.cwd(), component))
  : require(path.resolve(__dirname, '../component/single/index.jsx'));
  return Promise.resolve(fs.writeFileSync(
      resolvedDestination,
      renderIndex(data, attach, embed, attachbody, embedbody, Index)
      ));
};
