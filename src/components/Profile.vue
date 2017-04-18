<template>
  <div id="profile">
    <button type="button" v-on:click="showProfile()">me</button>

    <div v-if="visible">
        <form v-on:submit.prevent="saveProfile">
                <i class="fa fa-times" aria-hidden="true" v-on:click="hideProfile()"></i>

                <b>{{ currentUser.name }}</b><br>

                <img :src="viewImage" id="profileImage" />
                <input type="file" id="file" @change="onFileChange">
                
                <label for="bookTitle">Department:</label>
                <input type="text" id="bookTitle" class="form control" v-model="currentUser.department" required><br>
                
                <label for="bookTitle">password:</label>
                <input type="text" id="bookTitle" class="form control" v-model="currentUser.password" required><br>
    
                <label for="bookTitle">facebook:</label>
                <input type="text" id="bookTitle" class="form control" v-model="currentUser.facebook"><br>

                <label for="bookTitle">linkedin:</label>
                <input type="text" id="bookTitle" class="form control" v-model="currentUser.linkedin"><br>

                <label for="bookTitle">twitter:</label>
                <input type="text" id="bookTitle" class="form control" v-model="currentUser.twitter"><br>

                <input type="submit" class="btn btn-success" value="save">
        </form>
    </div>

  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import { storage } from './../FirebaseDB'

const storageRef = storage.ref('authors')

export default {
    name: 'profile',
    computed: mapGetters(['user']),

    data () {
        return {
            visible: false,
            currentUser: {},
            viewImage: require('./../assets/arton3.jpg'),
            image: new Image()
        }
    },

    methods: {
        showProfile: function () {
            this.image = new Image()
            Object.assign(this.currentUser, this.user)
            if (this.currentUser.img.length > 4){
                const starsRef = storageRef.child(this.currentUser.img);
                starsRef.getDownloadURL().then(function(url) {
                    document.getElementById('profileImage').src = url
                }).catch(function(error) {
                    console.log(error.code);
                });
            }
            this.visible = true
        },

        hideProfile: function () {
            this.visible = false
        },

        saveProfile: function () {
            const playload = { profile: this.currentUser, image: this.image }
            this.$store.dispatch('saveProfile', playload)
            this.visible = false
        },

        onFileChange(e) {
        const files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        this.createImage(files[0]);
        },
        createImage(file) {
            this.currentUser.img = file.name
            const reader = new FileReader();
            reader.onload = (e) => {
                this.viewImage = e.target.result;
                this.image = file
            };
            reader.readAsDataURL(file);
        }
    }
    
}

</script>



<style scoped>

form {
    position: fixed;
    top: 10%;
    left: 50%;
    -ms-transform: translate(-50%, 0); /* IE 9 */
    -webkit-transform: translate(-50%, 0); /* Safari */
    transform: translate(-50%, 0);
    color: black;
    background-color: white;
    border: 1px solid gray;
    padding: 10%;
}

img {
	width: 150px;
	height: 150px;
	margin-left: auto;
	margin-right: auto;
	display: block;
}

i {
	position: absolute;
	top: 5px;
	right: 5px;
	cursor: pointer;
}

</style>
