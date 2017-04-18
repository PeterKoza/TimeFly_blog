<template>
    <div id="article">
    <section>
        <div v-if="!isAdmin">
            <h1>{{ currentArticle.title }}</h1>
            <h2>Posted on <em>{{ currentArticle.date }}</em>, by <em>{{ currentArticle.author }}</em></h2>
            <img :id="currentArticle.img" :src="getImage(currentArticle.img)" alt="article image">
            <p>{{ currentArticle.text }}</p>
        </div>
        <div v-else>
            <form v-on:submit.prevent="saveArticle">
                <label for="bookTitle">Tilte:</label>
                <input type="text" id="bookTitle" class="form control" v-model="currentArticle.title" required>
                <img :id="currentArticle.img" :src="getImage(currentArticle.img)" alt="article image">
                <input type="file" id="file" @change="onFileChange">
                <textarea rows="30" cols="80" v-model="currentArticle.text" required> {{ currentArticle.text }} </textarea >
                <input type="submit" class="btn btn-success" value="save article">
            </form>
        </div>
    </section>
    </div>
</template>

<script>
import { db, storage } from './../FirebaseDB'
import Firebase from 'firebase'

import { mapGetters, mapActions } from 'vuex'

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
            console.log(this.imageName)
            console.log(this.currentArticle.img)
            if (this.imageName === '' && this.currentArticle.img.length > 4) {
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
        if (!files.length)
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
            this.currentArticle.img = this.imageName
            const playload = {article: this.currentArticle, image: this.image}
            this.$store.dispatch('saveArticle', playload)

        }
    },

    data () {
        return {
            imageName: '',
            article: this.$store.dispatch('setArticle', {articleKey: this.$route.params.articleKey}),
            viewImage: require('./../assets/Logo_Green.png'),
        }
    }
}

</script>

<style scoped>
h1 {
    text-align: left;
    padding: 0;
}

img {
    float: left;
    margin: 0 1.2em 0.5em 0;
}

p {
    white-space: pre-line;
}
</style>