生产环境打包构建：
    1.首先运行npm run build打包编译代码，
    2.cd dist目录，然后运行node server.js 启动node服务，即可通过localhost:3000端口访问
    
待解决的问题：
1.使用css提取样式文件并以外链的形式引用，在浏览器network-preview预览，发现css没生效。实际
上页面是能够正常显示的（禁用浏览器的js后，也能正常显示）。但是引用的antd的样式，在network-preview
的时候是生效的
   2020.03.16：如果以外链的形式引用本地css文件，如：
    <link 
        rel="stylesheet"
        href="/assets/static/css/SideBarLayout.31270e6e.chunk.css"
     />
     <link href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.0.1/antd.min.css" rel="stylesheet"/>
     如果查看浏览器network->preview预览，会发现引入的antd.min.css样式会生效，而本地的SideBarLayout.31270e6e.chunk.css
     预览的时候不生效，页面显示正常。排查了一下发现是由于浏览器的network->preview实现方式的问题。href要以绝对路径的形式引入，比如
     这里可以配置output.publicPath: 'http://localhost:3000/'给打包的css添加前缀
     <link 
         rel="stylesheet"
         href="http://localhost:3000/assets/static/css/SideBarLayout.31270e6e.chunk.css"
      />
      这样在浏览器network->preview预览的时候，样式就正常了


    
    
React服务端渲染的思路：
    -> 服务器端运行React代码渲染出HTML(这个HTML同时包含script标签加载客户端脚本，这点很重要，
       不然浏览器接收的只是一个静态的HTML，页面上所有的元素都不可交互)
       因此需要配置服务端webpack配置以打包服务器端代码，然后运行打包后的代码。
    -> 发送HTML给浏览器 
    -> 浏览器接收到内容展示
    -> 浏览器加载HTML里面script标签的js脚本
    -> js中的React代码在浏览器端重新执行，浏览器不会重新生成HTML，而是试图往HTML标记中添加事件等操作
    -> js中的React代码接管页面操作，比如元素点击，页面导航都交由浏览器端js脚本处理
    
据实践，在服务端渲染中，只有组件的componentWillMount生命周期会调用
React服务端渲染的几大难点：
    1.同构。即如何让服务端返回的html标记可交互。
    2.css的服务端渲染。即如何收集组件的css并插入到服务端生成的html当中。
        
React服务端渲染路由问题：
    在服务端渲染与客户端渲染有许多不同，因为服务器端是无状态的。因此服务器端使用
    无状态的<StaticRouter>替代<BrowserRouter>，然后通过来自于服务端的请求url使得路由能够匹配上。
    对于客户端React代码路由，此时需要使用<BrowserRouter>而不能使用<HashRouter>，因为<HashRouter>
    使用的是hash导航，页面路径/#/后面的URL不会发送到服务端，从而造成服务端路由匹配不上。

<StaticRouter>的context属性：
    context是个原生js对象。在渲染期间(during the render)，组件能够往context对象添加属性以存储渲染
    信息。
    
    
    
1.服务端渲染 VS 客户端渲染 的利弊
    1.1页面由前端渲染，前后端分离，开发效率得到极大提高
    1.2客户端渲染的流程：浏览器下载JS文件 -> 浏览器运行React代码 -> 页面准备就绪
    1.3服务端渲染的流程：浏览器下载html文档 -> 页面显示
    1.4因此客户端渲染虽然提高了开发效率，但是牺牲了首屏加载速度，而且SEO(搜索引擎优化)不友好。
        SSR虽然开发效率低，但是首屏加载快，而且SEO友好。
    1.5客户端渲染，React代码在浏览器上执行，消耗的是用户浏览器的性能。
    1.6服务端渲染，React代码在服务器上执行，消耗的是服务器的性能。比如在服务端将虚拟dom转换成
       字符串需要大量的计算。
    1.7总结：如果不是对SEO比较执着，而且网站首屏时间在合理范围，还是不要使用SEO，毕竟太伤服务器。   
        
2.ReactDOMServer(react-dom/server)可以把react组件渲染成静态标记。
    ReactDOMServer提供了四个方法：
        1.renderToString()：既可以在服务端，也可以在客户端使用。
            这个方法会生成静态标记，并添加额外的属性，如data-reactroot。如果做服务端渲染，需要和ReactDOM.hydrate()结合使用
            ReactDOM.hydrate会尝试往已经生成好的html标记中添加事件监听器，而不会重新生成html标记
        2.renderToStaticMarkup：既可以在服务端，也可以在客户端使用。
        3.renderToNodeStream()及renderToStaticNodeStream()方法由于依赖于
        stream这个包，因此只能在服务端使用，不能在浏览器端使用。

3.ReactDOM.hydrate(以下内容翻译自react官网):
    1.和ReactDOM.render()方法一样，都是客户端方法。
    2.会尝试往ReactDOMServer.renderToString方法生成的html标记上添加事件监听器。
    3.React期望服务端生成的html标记和客户端生成的html标记要相同。
    4.总之ReactDOM.render方法一定要和ReactDOMServer.renderToString方法一起使用。
    
    
4.同构：服务器端使用renderToString方法生成的html标记不会生成事件监听这些属性，renderToString
    生成的html标记是静态的，不可交互。如果我们需要html标记可交互，比如点击按钮能执行某些操作。
    那么我们可以先让renderToString生成静态的html标记并返回给客户端，然后在客户端使用ReactDOM.hydrate
    方法再加载同样的一个js脚本，ReactDOM.hydrate不会重新生成一个html标记，而是会尝试往已生成的html标记
    中添加事件属性等。这个过程就是同构。即一套代码在服务端执行一次生成html文档，在客户端再执行一次以绑定
    事件等属性
    
5.CSS服务端渲染：
    使用isomorphic-style-loader取代style-loader，isomorphic-style-loader功能和style-loader相似。
    但是isomorphic-style-loader针对关键路径CSS渲染进行了优化，并且在同构app中能很好的运行。
    在服务端渲染中，使用isomorphic-style-loader，isomorphic-style-loader提供了两个辅助函数：
    _insertCss（给dom注入css）以及_getCss(返回一个css字符串)。
    因此服务端CSS渲染的思路(或者说原理)是：
    1.首先在组件的componentWillMount生命周期内：
        import styles from './index.css'
        ...
        componentWillMount () {
          if(this.props.staticContext){
            this.props.staticContext.css.push(styles._getCss())
          }
        }
        通过staticContext获取到组件的样式字符串，staticContext由StaticRouter提供。StaticRouter的context
        属性会在组件渲染期间收集一些信息。
    2.然后在服务端渲染的时候，将context收集到的css插入到html中：
          const context = {
            css: [],
          };
          const content = renderToString(
            <StaticRouter location={req.path} context={context}>
              { Routes }
            </StaticRouter>
          )
          const cssStr = context.css.join('\n')
          return `
            <html>
              <head>
                 <title>ssr</title>
                 <style>${cssStr}</style>
              </head>
              <body>
                <div id="root">${content}</div>
                <script src="/client.bundle.js"></script>
              </body>
            </html>`
    3.所以问题来了，凡是需要服务端渲染的组件，内部都要实现componentWillMount生命周期以收集组件css。这样难免会
    很麻烦
        componentWillMount () {
          if(this.props.staticContext){
            this.props.staticContext.css.push(styles._getCss())
          }
        }
    因此为了解决上面这个问题，可以实现一个高阶函数withStyle.js:
        export default (DecoratedComponent, styles) => {
          return class NewComponent extends React.Component{
            componentWillMount () {
              if(this.props.staticContext){
                this.props.staticContext.css.push(styles._getCss())
              }
            }
        
            render() {
              return <DecoratedComponent {...this.props} />
            }
          }
        }
    这个函数接受一个组件及该组件的css对象。
    比如header.jsx组件如果需要做服务端渲染，那么可以用withStyle(Header, styles)包装一下。
    4.这个估计就是isomorphic-style-loader提供的StyleContext以及withStyles的实现原理？
    
6.异步数据服务器渲染：
    在客户端渲染的实现当中，一般在组件的生命周期函数内，如componentDidMount，获取异步数据并渲染。
    但是在服务端渲染中，大部分组件生命周期函数都不会执行（试了以下只有componentWillMount会执行）。因此
    需要在服务端渲染的过程中调用接口获取数据并填充store。可以借助于react-router-dom提供的路由的loadData
    属性。具体可看react-router官网的server-rendering指南
    关于服务端渲染数据获取的一个流程：
    1.服务端会根据路由匹配对应的页面
    2.如果匹配到的页面定义了loadData方法，那么就调用这些loadData方法
    3.等所有的loaData方法执行完毕，并填充到store后，返回给浏览器。
    4.此时浏览器需要想方法获取到服务端返回的store里面的数据，这就是数据的脱水和注水过程，
        服务端返回给浏览器的html文档中，会额外插入一个脚本及全局变量
        那么浏览器在初始化store的时候，可以从这个全局变量中拿到初始的数据并初始化浏览器端的store
    
    
    

关于开发环境的搭建的几点思路：
1.服务端和客户端各自编译并监听文件改动，如果只改变到服务端文件，则只重新编译服务端代码。
如果只改动客户端文件，则只重新编译客户端代码


登录的问题：
1.刚进入页面，处于非登录状态
2.用户点击登录按钮，进行登录操作
  2.1浏览器发送请求给NodeJS服务器
  2.2node服务器转发请求到Java服务器，进行登录
  2.3Java服务器生成cookie
  2.4浏览器上存在了cookie，登录成功
3.当用户重新刷新页面的时候
  3.1浏览器去请求html(携带了cookie)
  3.2NodeJS服务器进行服务器端渲染
  3.3NoJS服务器进行服务器端渲染，首先要去Java服务器取数据，当NodeJS服务器
    去Java服务器取数据的时候，如果不携带cookie，Java服务器会认为用户未登录。
  因此在处理登录逻辑的时候，需要注意浏览器->node->java服务器之间cookie的一致性。
