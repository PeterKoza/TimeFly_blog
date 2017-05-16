<template>
    <div id="new_article">
    <router-link to="/blog"><button type="button">
        <i class="fa fa-arrow-circle-left" aria-hidden="true"></i>Back</button>
    </router-link>
    <section v-if="isAdmin">
        <h1>Create new article</h1>
        <form v-on:submit.prevent="uploadArticle">
            <label for="bookTitle">Tilte:</label>
            <input type="text" id="bookTitle" class="form control" v-model="newArticle.title" required>
            <img :src="viewImage" />
            <input type="file" id="file" @change="onFileChange">
            <markdown-editor v-model="newArticle.text" ref="markdownEditor"></markdown-editor>
            <input type="submit" class="btn btn-success" value="upload article">
        </form>
    </section>
    <section v-else>
        <h1>permission denied</h1>
    </section>
    </div>
</template>

<script>
import Vue from 'vue'
import toastr from 'toastr'

import { db, storage } from './../FirebaseDB'

import { mapGetters, mapActions } from 'vuex'

import VueSimplemde from 'vue-simplemde'
Vue.use(VueSimplemde)
import { markdownEditor } from 'vue-simplemde'

const articlesRef = db.ref('articles')
const storageRef = storage.ref('articles');

export default {
    name: 'new_article',
    computed: mapGetters(['user', 'isAdmin']),

    methods: {
        ...mapActions(['uploadArticle']),
        uploadArticle: function () {
            const date = new Date()
            if (this.newArticle.text.length < 100) {
                toastr.success('Short article :(')
                return
            }
            this.newArticle.author =  this.user.name
            this.newArticle.date = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear()
            const playload = {article: this.newArticle, image: this.image}
            this.$store.dispatch('uploadArticle', playload)
            toastr.success('Article was uploaded')
        },

        onFileChange(e) {
        const files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        this.createImage(files[0]);
        },
        createImage(file) {
            this.newArticle.img = file.name
            const reader = new FileReader();
            reader.onload = (e) => {
                this.viewImage = e.target.result;
                this.image = file
            };
            reader.readAsDataURL(file);
        }
    },

    data () {
        return {
            newArticle: {
                author: '',
                date: '',
                img: '',
                text: '',
                title: ''
            },
            image: new Image(),
            viewImage: require('./../assets/Logo_Green.png')
        }
    },

    components: {
        markdownEditor
    }
}
</script>



<style scoped>

button{
    margin-left: 5%;
    margin-top: 10px;
    font-size: 1.5em;
}

</style>