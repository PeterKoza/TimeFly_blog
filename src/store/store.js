import Vue from 'vue'
import Vuex from 'vuex'

import _ from 'lodash'

import { db, storage } from './../FirebaseDB.js'

Vue.use(Vuex)


const state = {
    user: null,
    userKey: 0,
    currentArticle: {},
    articleKey: 0
}


const getters = {
    isAdmin: state => state.user !== null,

    currentArticle: state => state.currentArticle,
    user: state => state.user
}


const mutations = {
    loginAsAdmin (state, playload) {
        const name = playload.name
        const password = playload.password
        db.ref('authors').on('value', function(usersRef) {
            const users = usersRef.val()
            const user = _.find(users, { 'name': name, 'password': password })
            state.userKey = _.findKey(users, (item) => (item === user));
            if (user) {
                state.user = user
            } else{
                state.user = null
            }
        })
    },
    logout (state) {
        state.user = null
        state.userKey = 0
    },

    setArticle (state, playload) {
        const articleKey = playload.articleKey
        db.ref('articles').on('value', function(articlesRef) {
            state.articleKey = articleKey
            state.currentArticle = articlesRef.val()[articleKey]
        })
    },

    uploadArticle (state, playload) {
        const article = playload.article
        const image = playload.image
        db.ref('articles').push(article)
        if (article.img.length > 4){
            storage.ref('articles').child(article.img).put(image, { contentType: 'image/jpeg' })
        }
    },
    //-------------------------------------------------------------
    saveProfile (state, playload) {
        const profile = playload.profile
        const image = playload.image
        db.ref('authors/' + state.userKey).set({
            name: profile.name,
            password: profile.password,
            department: profile.department,
            facebook: profile.facebook,
            twitter: profile.twitter,
            linkedin: profile.linkedin,
            img: profile.img
        });
        if (profile.img.length > 4) {
            storage.ref('authors').child(profile.img).put(image, { contentType: 'image/jpeg' })
        }
    },

    saveArticle (state, playload) {
        console.log(playload)
        const article = playload.article
        const image = playload.image
        db.ref('articles/' + state.articleKey).set({
            author: article.author,
            date: article.date,
            img: article.img,
            text: article.text,
            title: article.title,
        });
        if (article.img.length > 4) {
            storage.ref('articles').child(article.img).put(image, { contentType: 'image/jpeg' })
        }
    },

    addComent (state, playload) {
        const coment = playload.coment
        const articleKey = playload.articleKey
        const articleComentsRef = db.ref('articles/' + articleKey + '/coments')
        articleComentsRef.push(coment)
    }

}


const actions = {
    loginAsAdmin: (context, playload) => context.commit('loginAsAdmin', playload),
    logout: (context, playload) => context.commit('logout'),

    uploadArticle: (context, playload) => context.commit('uploadArticle', playload),
    setArticle: (context, playload) => context.commit('setArticle', playload),
    saveArticle: (context, playload) => context.commit('saveArticle', playload),
    addComent: (context, playload) => context.commit('addComent', playload),

    saveProfile: (context, palyload) => context.commit('saveProfile', palyload)
}


export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})