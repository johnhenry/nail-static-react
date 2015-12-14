import fs from  'fs';
import path from 'path';
import renderIndex from '../renderer/single/index';
import request from 'sync-request';
const cwd = process.cwd();
module.exports = (opts) => {
  const options = opts || {};
  const source = options.source || './index.html';
  const config = options.config;
  const destination = options.destination || './index.html';
  const attach = options.attach;
  const embed = options.embed;
  const amp = options.amp ;
  const attachbody = options.attachbody;
  const embedbody = options.embedbody;
  const component = options.component;
  const resolvedDestination = path.resolve(cwd, config.dir, destination);
  var data = source;
  if(typeof data === 'string'){
    if(data.indexOf('http') !== -1){
      let src =  data.substring(data.indexOf('http'));
      src = src.replace('http:/', 'http://');
      src = src.replace('https:/', 'https://');
      data = JSON.parse(String(request('GET', src).getBody()));
    }else{
      data = JSON.parse(fs.readFileSync(source.source, 'utf-8'));
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
