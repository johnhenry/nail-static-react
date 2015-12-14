#Static React (nail-static-react)
Create static pages and sites using React components with [John Henry's Hammer](https://github.com/johnhenry/john-henrys-hammer)

##Installation
Most nails can be installed automatically see [John Henry's Hammer](https://github.com/johnhenry/john-henrys-hammer/blob/master/readme.md#usage).
This nail, however, makes heavy use of babel-register, which is know to fail as a dependency of other modules. As such, please install this manually:

###Manual Installation: Clone

From within your project, clone this project using git.

```bash
git clone git@github.com:johnhenry/nail-static-react.git
```

OR

```bash
git clone https://github.com/johnhenry/nail-static-react.git
```

###Manual Installation: Navigate to the folder and install npm dependencies

```bash
cd nail-static-react
npm install
```

###Manual Installation: Nailfile

In your nailfile, point directly to the local installation like this:

```json
{
  "nails" : [{
      "plugin" : "./nail-static-react"
    }]

}
```

NOT This:

```json
{
  "nails" : [{
      "plugin" : "nail-static-react"
    }]

}
```
##Options

 -  source:object - source data for react component. (Defaults to {}).
 -  destination:string - destination file (Defaults to "index.html")
 -  component:string - location of react component to render
 -  attach:<string> - list of script and styles to attach to head of generated page.
 -  embed:<string> - list of script and styles to embed within head of generated page.
 -  attachbody:<string> - list of script and styles to attach to body of generated page.
 -  embedbody:<string> - list of script and styles to embed within body of generated page.
 - mode:string - set to 'blog' to create static blog rather than a single page. (Defaults to "single")

##Blog Mode
Setting the mode to "blog" modifies some options and introduces some new ones

###Modified Options
 - component:string - location of component used to render index pages for the blog
 - source:string - directory of markdown files Defaults to './markdown'
 - destination:string - destination folder relative to nailfile directory

###New Options
- postcomponent:string - location of component used to render individual post pages for the blog
- itemsperpage:number - number of posts to include per index page (Defaults to 3)
- reverse :boolean -- create pages in reverse order (defaults to false),

###Data Passed to Index
When creating a blog, the component will have access to an object with each of the following properties for every index page.


index :number - index of page
posts :<Post> - an array of posts
last  :boolean - indicator as to whether or not the post is the last one


###Data Passed to Post
When creating a blog, and object with specific keys will given to the component described in "component" to render.

index:number - index of post
post:Post - the current post
next:Post - the next post
prev:Post - the previous post
