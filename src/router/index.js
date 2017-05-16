import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Team from '@/components/Team'
import Blog from '@/components/Blog'

import Article from '@/components/Article'
import NewArticle from '@/components/NewArticle'

import VueRouterTransition from 'vue-router-transition'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/team',
      name: 'team',
      component: Team
    },
    {
      path: '/blog',
      name: 'blog',
      component: Blog
    },
    {
      path: '/article/:articleKey',
      name: 'article',
      component: Article
    },
    {
      path: '/new_article',
      name: 'new_article',
      component: NewArticle
    }
  ]
})
