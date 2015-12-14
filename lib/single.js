import fs from  'fs';
import path from 'path';
import renderIndex from '../renderer/single/index';
import request from 'sync-request';
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
