import fs from  'fs';
import path from 'path';
import getData from './get-data';
import renderIndex from '../renderer/blog/index';
import renderPost from '../renderer/blog/post';
import ampify from './ampify-embeded-scripts';
const cwd = process.cwd();
module.exports = (opts) => {
  const options = opts || {};
  const config = options.config;
  const source = options.source || `./markdown`;
  const destination = options.destination;
  const attach = options.attach;
  const embed = options.embed;
  const amp = options.amp;
  const attachbody = options.attachbody;
  const embedbody = options.embedbody;
  const itemsperpage = options.itemsperpage = 3;
  const reverse = options.reverse;
  const component = options.component;
  const postcomponent = options.postcomponent;

  const resolvedSource = path.resolve(cwd, source);
  const resolvedDestination = path.resolve(cwd, config.dir, destination || '.');
  const IndexPage = component ?
    require(path.resolve(process.cwd(), component))
  : require(path.resolve(__dirname, '../component/blog/index.jsx'));
  const PostPage = postcomponent ?
    require(path.resolve(process.cwd(), postcomponent))
  : require(path.resolve(__dirname, '../component/blog/post.jsx'));

  return getData(resolvedSource).then(posts => {
    const embed = (amp && amp.length) ? amp.map(ampify).filter(_=>_) : embed || [];
    if(reverse) posts = posts.reverse();
    const length = posts.length;
    //Index Pages
    const size = itemsperpage;

    var index = 0;
    for (var i = 0; i < length; i += size) {
        const postArray = posts.slice(i, i + size);
        const file = renderIndex({
                  index : index,
                  posts : postArray,
                  last : (i >= length - size)
                },
                attach,
                embed,
                attachbody,
                embedbody,
                IndexPage);
        const filePath = path.resolve(resolvedDestination, (index === 0 ?  'index' : index + 1) + ".html");
        index++;
        try{
          fs.writeFileSync(
            filePath,
            file
            );
        }catch(e){
          console.log(error);
        }
    };
    //Individual Pages
    if(!fs.existsSync(path.resolve(resolvedDestination, 'post')))
    fs.mkdirSync(path.resolve(resolvedDestination, 'post'));

    posts.forEach((post, index, posts)=>{
      const file = renderPost({
                    index : index,
                    post : post,
                    prev : posts[index - 1],
                    next : posts[index + 1]
                  },
                  attach,
                  embed,
                  attachbody,
                  embedbody,
                  PostPage);
      const filePath = path.resolve(resolvedDestination, 'post', post.slug + ".html");
      try{
        fs.writeFileSync(
          filePath,
          file);
      }catch(e){
        console.log(error);
      }
    });
    return true;
  })
}
