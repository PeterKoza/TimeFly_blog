<template>
    <div id="article">
    <router-link to="/blog"><button type="button">
        <i class="fa fa-arrow-circle-left" aria-hidden="true"></i>Back</button>
    </router-link>
    <section>
        <div v-if="!isAdmin">
            <h1>{{ currentArticle.title }}</h1>
            <h2>Posted on <em>{{ currentArticle.date }}</em>, by <em>{{ currentArticle.author }}</em></h2>
            <img class="overflow" :id="currentArticle.img" :src="getImage(currentArticle.img)" alt="article image">
            <vue-markdown>{{ currentArticle.text }}</vue-markdown>
        </div>
        <div v-else>
            <form v-on:submit.prevent="saveArticle">
                <label for="bookTitle">Tilte:</label>
                <input type="text" id="bookTitle" class="form control" v-model="currentArticle.title" required>
                <img :id="currentArticle.img" :src="getImage(currentArticle.img)" alt="article image">
                <input type="file" id="file" @change="onFileChange">
                <markdown-editor v-model="currentArticle.text" ref="markdownEditor"></markdown-editor>
                <input type="submit" class="btn btn-success" value="save article">
            </form> 
        </div>

        <h2>Leave a Reply</h2>
        <form v-on:submit.prevent="sendComent">
            <markdown-editor v-model="coment.response" ref="markdownEditor"></markdown-editor>
            <label for="name">your name:</label>
            <input type="text" id="name" class="form control" v-model="coment.visitor" required>
            <br>
            <label for="mail">e-mail:</label>
            <input type="text" id="mail" class="form control" v-model="coment.mail" required>
            <br>
            <input type="submit" class="btn btn-success" value="POST COMENT">
        </form>
        <div v-for="coment in reverse(currentArticle.coments)">
            <h3><i class="fa fa-comment"></i> {{ coment.visitor }} <em v-if="isAdmin">{{ coment.mail }}</em>:
                <small>{{ coment.date }}</small>
            </h3>
            <vue-markdown>{{ coment.response }}</vue-markdown>
        </div>

    </section>
    </div>
</template>
 
<script>
import Vue from 'vue' 
import { db, storage } from './../FirebaseDB'
import Firebase from 'firebase'

import { mapGetters, mapActions } from 'vuex'

import _ from 'lodash'
import toastr from 'toastr'
import VueSimplemde from 'vue-simplemde'
import VueMarkdown from 'vue-markdown'

Vue.use(VueSimplemde)

import { markdownEditor } from 'vue-simplemde'

const articlesRef = db.ref('articles') 
const storageRef = storage.ref('articles');

export default {
    name: 'article',
    computed: mapGetters(['currentArticle', 'isAdmin']),

    firebase: {
        //article: articlesRef.orderByKey().equalTo(articleKey)
    },

    methods: {
        ...mapActions(['setArticle']),  
        getImage: function (img) {
            if (this.imageName === '' && this.currentArticle.img.length > 4 && !this.updated) {
                this.updated = true
                const starsRef = storageRef.child(img);
                starsRef.getDownloadURL().then(function(url) {
                    document.getElementById(img).src = url;
                }).catch(function(error) {
                    console.log(error.code);
                });
            } else {
                return this.viewImage
            }
        },

        onFileChange(e) {
        const files = e.target.files || e.dataTransfer.files;
        if (!files)
            return;
        this.createImage(files[0]);
        },
        createImage(file) {
            this.imageName = file.name
            const reader = new FileReader();
            reader.onload = (e) => {
                this.viewImage = e.target.result;
                this.image = file
            };
            reader.readAsDataURL(file);
        },
        saveArticle: function () {
            if (this.imageName) {
                this.currentArticle.img = this.imageName
            }
            const playload = {article: this.currentArticle, image: this.image}
            this.$store.dispatch('saveArticle', playload)
        },
        sendComent: function () {
            const date = new Date()
            this.coment.date = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear()
            const playload = {coment: this.coment, articleKey: this.$route.params.articleKey} 
            this.$store.dispatch('addComent', playload)
            this.coment.visitor = ""
            this.coment.mail = ""
            this.coment.response = ""
            toastr.success('The comment has been successfully uploaded')
        },
        reverse: function (array) {
            console.log(_.sortBy(array, "key").reverse())
            return _.sortBy(array, "key").reverse()
        }
    },

    data () {
        return {
            imageName: '',
            viewImage: require('./../assets/Logo_Green.png'),
            updated: false,
            coment: {
                visitor: "",
                mail: "",
                response: "",
                date: ""
            }
        }
    },

    created () {
        this.$store.dispatch('setArticle', {articleKey: this.$route.params.articleKey})
    },

    filters: {
        reverse: function (array) {
            console.log(array)
            return array.slice().reverse()
        }
    },

    components: {
        markdownEditor,
        'vue-markdown': VueMarkdown
    }
}

</script>

<style scoped>
h1 {
    text-align: left;
    padding: 0;
}

img {
    margin: 0 1.2em 0.5em 0;
}

overflow {
    float: left;
}

.markdown-editor{
    position: relative;
}

button{
    margin-left: 5%;
    margin-top: 10px;
    font-size: 1.5em;
}

</style>