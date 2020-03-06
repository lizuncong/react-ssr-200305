React服务端渲染的思路：
    -> 服务器端运行React代码渲染出HTML(这个HTML同时包含script标签加载客户端脚本，这点很重要，
       不然浏览器接收的只是一个静态的HTML，页面上所有的元素都不可交互)
       因此需要配置服务端webpack配置以打包服务器端代码，然后运行打包后的代码。
    -> 发送HTML给浏览器 
    -> 浏览器接收到内容展示
    -> 浏览器加载HTML里面script标签的js脚本
    -> js中的React代码在浏览器端重新执行，浏览器不会重新生成HTML，而是试图往HTML标记中添加事件等操作
    -> js中的React代码接管页面操作，比如元素点击，页面导航都交由浏览器端js脚本处理
    
    
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
3.运行：
    1.首先运行npm run build-server打包node端代码，
    然后运行npm run start-server启动node服务。
