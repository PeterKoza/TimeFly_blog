<template>
  <div id="app">
	<header class="row">
		<nav>
			<div class="navbar-header">
				<router-link to="/"><img src="./assets/Logo_Green.png" width="100" height="70" alt="logo"></router-link>
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
			</div>
			<ul class="nav navbar-nav navbar-collapse collapse">
				<li v-on:click="setPageIndex()"><router-link to="/team" :class="{active: active.team}">Team</router-link></li>
				<li v-on:click="setPageIndex()"><router-link to="/" :class="{active: active.home}">Home</router-link></li>
				<li v-on:click="setPageIndex()"><router-link to="/blog" :class="{active: active.blog}">Blog</router-link></li>
			</ul>
		</nav>	  
  </header>
    <v-touch v-if="supportsTouch" @swipeleft="getNewLinks(1)" @swiperight="getNewLinks(-1)">
		<transition :name="pageTransmitionMode" mode="out-in">
			<router-view></router-view>
		</transition>
	</v-touch>
	<transition v-else :name="pageTransmitionMode" mode="out-in">
		<router-view></router-view>
	</transition>
	<i v-if="areArrowsVisible()" v-on:click="getNewLinks(-1)" class="fa fa-angle-left fa-4x" aria-hidden="true"></i>
	<i v-if="areArrowsVisible()" v-on:click="getNewLinks(1)" class="fa fa-angle-right fa-4x" aria-hidden="true"></i>
  <footer class="center">
		<p class="center">COPYRIGHT &copy; 2017 TimeFly Memories IVS ALL RIGHTS RESERVED</p>
		<login></login>
  </footer>
  </div>
</template>

<script>
import Login from '@/components/Login'

import Vue from 'vue'
import VueTouch from 'vue-touch'

Vue.use(VueTouch)
VueTouch.config.swipe = {
    direction: 'horizontal'
}

export default {
	name: 'app',
	components: {
		Login
	},
	methods: {
		getNewLinks: function (direction) {
			this.index += direction
			if (this.index < 0) {
				this.index = this.paths.length -1
			}
			this.index = this.index % this.paths.length
			this.page = this.paths[this.index]
			this.pageTransmitionMode = direction === -1 ? 'left' : 'right'
			this.$router.push(this.page)
		},
		setPageIndex: function () {
			const _paths = ['team', 'home', 'blog']
			this.index = _paths.indexOf(this.$route.name)
			this.pageTransmitionMode = ''
		},
		areArrowsVisible: function () {
			const route_name = this.$route.name
			return !this.supportsTouch && route_name !== 'article' && route_name !== 'new_article'
		}
	},
	watch: {
		'$route' (to, from) {
			const route_name = this.$route.name
			this.active.team = route_name === 'team'
			this.active.home = route_name === 'home'
			this.active.blog = route_name === 'blog' || route_name === 'article' || route_name === 'new_article'
		}
	},
  	data () {
		const _paths = ['team', 'home', 'blog']
		const route_name = this.$route.name
		return {
			paths: ['team', '/', 'blog'],
			index: _paths.indexOf(this.$route.name),
			page: '',
			pageTransmitionMode: 'left',
			active: {
				team: route_name === 'team',
				home: route_name === 'home',
				blog: route_name === 'blog' || route_name === 'article' || route_name === 'new_article'
			},
			supportsTouch: 'ontouchstart' in window || navigator.msMaxTouchPoints ? true : false
		}
  	},
}

</script>



<style>
body {
	font-family: MontserratBold, MontserratRegular;
	margin: 0;
	padding: 0;
	z-index: -1;
}

html, body {
	overflow-x: hidden;
}

header {
	height: 70px;
	background-color: #1fda81;
	z-index: 1;
}

header img {
	float: left;
	padding: 0 0 0 2em;
}

section img {
	width: 150px;
	height: 150px;
	margin-left: auto;
	margin-right: auto;
	display: block;
}

.center {
	text-align: center; 
}

section {
	padding: 5%;
}

footer {
	background-color: #171717;
	color: #939393;
	width: 100%;
	height: 150px;
}

h1, h4 {
	text-align: center;
	padding: 15px;
}

.fa-angle-left {
	color: black;
	position: fixed;
	top: 50%;
	left: 2%;
}

.fa-angle-right {
	color: black;
	position: fixed;
	top: 50%;
	right: 2%;
}

.fa-angle-right:hover, .fa-angle-left:hover {
	color: gray;
	cursor: pointer;
}

/* -----------------------------------------*/
.right-enter-active, .left-enter-active {
	transition: opacity 0.7s, transform 0.7s;
}

.right-leave-active, .left-leave-active {
	transition: opacity 0.3s, transform 0.3s;
}

.right-leave-to {
	opacity: 0;
	transform: translateX(-30%);
}

.right-enter {
	opacity: 1;
	transform: translateX(30%);
}

.left-leave-to {
	opacity: 0;
	transform: translateX(30%);
}

.left-enter {
	opacity: 1;
	transform: translateX(-30%);
}
/* -----------------------------------------*/
@media (min-width: 768px) {
	nav {
		display: inline;
		float: none;
	}
	
	.navbar-collapse {
		position: absolute;
		left: 50%;
    	-ms-transform: translate(-50%, 0); /* IE 9 */
    	-webkit-transform: translate(-50%, 0); /* Safari */
    	transform: translate(-50%, 0);
	}

	nav li {
		height: 70px;
		width: 100px;
		padding: 0 1px;
		text-align: center;
	}

	.nav li a {
		height: 70px;
		width: 100px;
		padding: 20px 0 0 0;
		font-size: 1.3em;
	}
}
@media (max-width: 767px) {
	.navbar-collapse {
		width: 100%;
		text-align: center;
		border-top: 1px solid white;
		border-bottom: 1px solid #1fda81;
		margin: 0;
		padding: 0;
		z-index: 1;
	}
	.nav-header {
		float: none;
	}
	.navbar-toggle {
		display: block;
		border: 1px solid white;
		margin: 20px 40px;
	}
	.navbar-toggle span {
		background-color: white;
	}
	.navbar-collapse.collapse {
		display: none !important; 
	}
	.navbar-nav {
		float: none !important;
	}
	.navbar-nav>li {
		float: none;
	}
	.navbar-collapse.collapse.in {
		display: block !important;
	}
	.nav li a {
		z-index: 1;
		background-color: #1fda81;
	}
	.fa-angle-left, .fa-angle-right {
		display: none;
	}
}

.active {
	background-color: white !important;
}

@media (hover:on-demand) {
	nav a:hover, nav a:focus {
		background-color: none !important;
	}
}
@media (hover:hover) {
	nav a:hover {
		background-color: white !important;
	}
}

</style> 
