import loadable from "@loadable/component"
import React from "react"
import { Route } from "react-router-dom"
import Page from "../components/atoms/Page"
import Header from "../components/templates/Header"
const Home = loadable(() => import("../pages/Home"))
const Search = loadable(() => import("../pages/Search"))
const Mypage = loadable(() => import("../pages/Mypage"))
const Admin = loadable(() => import("../pages/Admin"))

const MainRoutes = () => (
  <Page>
    <Header/>
    <Route exact path="/" component={Home} />
    <Route exact path="/search" component={Search} />
    <Route exact path="/mypage" component={Mypage} />
    <Route exact path="/admin" component={Admin} />
  </Page>
)


export default MainRoutes