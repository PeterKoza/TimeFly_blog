<template>
  <div id="login">
		<div v-if="visible">
				<form v-on:submit.prevent="singin">
						<i class="fa fa-times" aria-hidden="true" v-on:click="hideLogin()"></i>
						<label for="bookTitle">Name:</label>
						<input type="text" id="bookTitle" class="form control" v-model="member.name" required><br>
						<label for="bookTitle">password:</label>
						<input type="text" id="bookTitle" class="form control" v-model="member.password" required><br>
						<input type="submit" class="btn btn-success" value="login">
				</form>
			</div>

		<div v-if="!isAdmin">	
			<button type="button" v-on:click="showLogin()">login</button>
		</div>
		<div v-else>
			<profile></profile>
			<button type="button" v-on:click="hideLogin()">login out</button>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import Profile from '@/components/Profile'

export default {
		name: 'login',
  	computed: mapGetters(['isAdmin']),

		data () {
			return {
				visible: false,
				member: {
						name: '',
						password: ''
				}
			}
		},

		methods: {
			...mapActions(['loginAsAdmin', 'loginAsWriter','logout']),  
			singin: function () {
			this.$store.dispatch('loginAsAdmin', this.member)
				if (this.isAdmin) {
					this.member.name = ''
					this.member.password = ''
					this.visible = false
				}
			},
			showLogin: function () {
				this.visible = true
			},
			hideLogin: function () {
				this.$store.dispatch('logout')
				this.visible = false
			}
		},

		components: {
			Profile
		}
}

</script>



<style scoped>

form {
  position: fixed;
  top: 30%;
  left: 50%;
  -ms-transform: translate(-50%, 0); /* IE 9 */
  -webkit-transform: translate(-50%, 0); /* Safari */
  transform: translate(-50%, 0);
  color: black;
	background-color: white;
	border: 1px solid gray;
	padding: 10%;
}

i {
	position: absolute;
	top: 5px;
	right: 5px;
	cursor: pointer;
}

</style>
