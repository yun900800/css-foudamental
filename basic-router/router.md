# 如何使用基本的js实现一个简答的路由

实现一个简单的路由包括两个基本功能，其一是监听浏览器地址栏的变化，其二是根据地址栏的变化来渲染不同的内容。

## 监听地址栏变化

- hash实现

- History 实现

## 渲染内容

- 根据地址栏的变化，匹配路由表，找到对应的组件或内容。
- 渲染匹配到的组件或内容到页面上。

## React Router 基本理解

- 它包含三类组件
  - Router：路由器组件，负责监听地址栏变化。 <BrowserRouter> 和 <HashRouter>
  - Route：路由匹配组件，定义路径和对应的组件。<Route> 和 <Switch>
  - Link：导航链接组件，用于导航。 <Link> 和 <NavLink>

- 它的工作原理是通过监听地址栏变化，匹配路由表，渲染对应的组件。

React Router 重新实现了一遍开头原生路由的功能，二者既有对应，也有差别。<Link>  对应 a标签，实现跳转路由的功能； <Route>对应 onPopState() 中的渲染逻辑，匹配路由并渲染对应组件；而<BrowserRouter> 对应 addEventListener 对路由变化的监听。