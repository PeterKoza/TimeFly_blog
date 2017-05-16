<template>
    <div id="bog">
    <section>
        <h1>Blog</h1>
        <router-link v-if="isAdmin" to="/new_article"><button type="button" class="btn btn-success">+ Add new article</button></router-link>
        <div class="row">
            <div v-for="article in articles" class="col-lg-3 col-sm-4 center">
                <router-link :to="{ name: 'article', params: { articleKey: article['.key'] }}">
                <img :id="article.img" v-bind:src="getImage(article.img)" class="defaultArticleImg" alt="article image">
                </router-link>
                <h4>{{ article.title }}</h4>
                <div><vue-markdown class="chunk">{{ article.text.slice(0, 250) }}</vue-markdown>
                    <router-link :to="{ name: 'article', params: { articleKey: article['.key'] }}">
                    <b v-if="isAdmin">
                        <button type="button">Edit</button>
                    </b>
                    <b v-else>
                        [...]
                    </b>
                    </router-link>
                </div>
                <span v-if="isAdmin" class="glyphicon glyphicon-trash" v-on:click="removeArticle(article)"></span>
            </div>
        </div>

    </section>
    </div>
</template>

<script>
import { db, storage } from './../FirebaseDB'
import toastr from 'toastr'
import { mapGetters } from 'vuex'

import VueMarkdown from 'vue-markdown'

const articlesRef = db.ref('articles')
const storageRef = storage.ref('articles');

export default {
    name: 'blog',
    computed: mapGetters(['isAdmin']),

    firebase: {
        articles: articlesRef
    },

    methods: {
        getImage: function (img) {
            if (img.length > 4){
                const starsRef = storageRef.child(img);
                starsRef.getDownloadURL().then(function(url) {
                    document.getElementById(img).src = url;
                }).catch(function(error) {
                    console.log(error.code);
                });
            } else {
                return this.img
            }
        },
        removeArticle: function (article) {
            articlesRef.child(article['.key']).remove()
            toastr.success('Article removed')
        }
    },

    data () {
        return {
            img: require('../assets/Logo_Green.png')
        }
    },

    components: {
        'vue-markdown': VueMarkdown
    }
}

</script>



<style scoped>

span {
    cursor: pointer;
}

.btn-success {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
}

.center{
    margin-bottom: 35px;
}

.chunk{
    max-height: 8em;
    overflow: hidden;
}
</style>