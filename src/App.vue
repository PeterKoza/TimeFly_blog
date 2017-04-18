<template>
  <div id="app">
    <header class="row">
      <router-link to="/"><img src="./assets/Logo_Green.png" width="100" height="70" alt="logo"></router-link>
      <nav class="navigation-bar">
        <ul>
          <li><router-link to="/team">Team</router-link></li>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/blog">Blog</router-link></li>
          </ul>
      </nav>
    </header>
    <router-view></router-view>
  <footer class="center">
	<p class="center">COPYRIGHT &copy; 2017 TimeFly Memories IVS ALL RIGHTS RESERVED</p>
	<login></login>
  </footer>
  </div>
</template>

<script>
import Login from '@/components/Login'

export default {
		name: 'app',
		components: {
			Login
		},
		methods: {
			hallo: function () {
				return 'hallo'
			}
		}
}

</script>



<style>
body {
	font-family: MontserratBold, MontserratRegular;
	margin: 0;
	padding: 0;
}

header {
	height: 70px;
	background-color: #1fda81;
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

nav {
	display: inline;
}

ul {
	margin: 0;
	padding: 0;
	text-align: center;
}

nav ul {
    list-style: none;
}

nav ul li {
    display: inline-block;
    padding: 23px 0;
    color: blue;
}

a:hover {
	text-decoration: none;
}

nav li a {
	padding: 1.55em 2.5em;
	color: #014354;
	text-decoration: none;
	font-size: 1.2em;
}

nav li a:hover {
	background-color: white;
}

nav li {
	padding: 1.625em 0;
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

</style>
