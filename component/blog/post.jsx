import React  from 'react';
import markdown from './markdown-to-jsx.jsx';
module.exports = ({post, next, prev}) => {
    const prerender = [];
    var linkIndex = 0;
    if(next)
      prerender.push(<link key={linkIndex++} rel='prerender' href={ './' + next.slug + '.html' } />)
    const foot = [];
    if(prev)
      foot.push(<a key={linkIndex++} className='Prev' href={ './' + prev.slug + '.html' } title={"Previous: " + prev.title}/>);
    if(next)
      foot.push(<a key={linkIndex++} className='Next' href={ './' + next.slug + '.html' } title={"Next: " + next.title}/>);
    return <html>
      <head>
        <meta charSet='UTF-8' />
        <title>{post.title}</title>
        {prerender}
      </head>
      <body className='PostPage'>
        <h1><a href='/'></a></h1>
        <article>
          <h1 title={post.title}>{post.title}</h1>
          <h2 title={post.author}>by {post.author}</h2>
          {markdown(post.markdown)}
        </article>
        <footer><a href='../' className="Home" title="Home"></a>{foot}</footer>
      </body>
    </html>
  };
