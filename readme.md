1.服务端渲染 VS 客户端渲染 的利弊
    1.1页面由前端渲染，前后端分离，开发效率得到极大提高
    1.2客户端渲染的流程：浏览器下载JS文件 -> 浏览器运行React代码 -> 页面准备就绪
    1.3服务端渲染的流程：浏览器下载html文档 -> 页面显示
    1.4因此客户端渲染虽然提高了开发效率，但是牺牲了首屏加载速度，而且SEO(搜索引擎优化)不友好。
        SSR虽然开发效率低，但是首屏加载快，而且SEO友好。
        
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
    1.会尝试往ReactDOMServer.renderToString方法生成的html标记上添加事件监听器。
    2.React期望服务端生成的html标记和客户端生成的html标记要相同。
3.运行：
    1.首先运行npm run build-server打包node端代码，
    然后运行npm run start-server启动node服务。
