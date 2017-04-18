<template>
    <div id="bog">
    <section>
        <h1>TimeFly team</h1>

        <div v-if="isAdmin" class="panel panel-default">
            <div class="panel-heading">
            <h3>Add member</h3>
            </div>
            <div class="panel-body">
            <form id="form" class="form-line" v-on:submit.prevent="addAuthor">
                <div class="form-group">
                <label for="bookTitle">Name:</label>
                <input type="text" id="bookTitle" class="form control" v-model="newAuthor.name" required>
                </div>

                <div class="form-group">
                <label for="bookTitle">Department:</label>
                <input type="text" id="bookTitle" class="form control" v-model="newAuthor.department" required>
                </div>

                <div>
                <label for="bookTitle">Password:</label>
                <input type="text" id="bookTitle" class="form control" v-model="newAuthor.password" required>
                </div>
                <input type="submit" class="btn btn-primary" value="Add author">
            </form>
            </div>
        </div>

        <div class="row">
            <div v-for="author in authors" class="col-lg-4 col-sm-6 center">
                <img :id="author.img" :src="getImage(author.img)" alt="profile image"> 
                <h2>{{author.name}}</h2>
                <h3>{{author.department}}</h3>
                    
                <a v-if="author.facebook.length > 5" :href="author.facebook" target="_blank">
                  <i class="fa fa-facebook-square fa-2x" aria-hidden="true"></i>
                </a>

                <a v-if="author.twitter.length > 5" :href="author.twitter" target="_blank">
                  <i class="fa fa-twitter-square fa-2x" aria-hidden="true"></i>
                </a>

                <a v-if="author.linkedin.length > 5" :href="author.linkedin" target="_blank">
                  <i class="fa fa-linkedin-square fa-2x" aria-hidden="true"></i>
                </a>
            </div>
        </div>

    </section>
    </div>
</template>



<script>
import { db, storage } from './../FirebaseDB'
import { mapGetters, mapActions } from 'vuex'


const authorsRef = db.ref('authors')
const storageRef = storage.ref('authors')

export default {
  name: 'blog',
  computed: mapGetters(['isAdmin']),

  firebase: {
    authors: authorsRef
  },

  data () {
    return {
      newAuthor: {
        name: '',
        department: '',
        password: '',
        facebook: '',
        twitter: '',
        linkedin: '',
        img: ''
      }
    }
  },

  methods: {
    ...mapActions(['loginAsAdmin', 'loginAsWriter','logout']),  
    addAuthor: function () {
      authorsRef.push(this.newAuthor)
      this.newAuthor.name = ''
      this.newAuthor.department = ''
      this.newAuthor.password = ''
    },
    removeAuthor: function (author) {
      authorsRef.child(author['.key']).remove()
      toastr.success('Author removed')
    },
    getImage: function (img) {
        if (img.length > 4) {
          const starsRef = storageRef.child(img);
          starsRef.getDownloadURL().then(function(url) {
              document.getElementById(img).src = url;
          }).catch(function(error) {
              console.log(error.code);
          });
        } else {
          return require('./../assets/arton3.jpg')
        }
    }
  }
}
</script>



<style scoped>

a{
  color: gray;
}

.fa-facebook-square:hover {
	color: #054af6;
}

.fa-twitter-square:hover {
	color: #00aced;
}

.fa-linkedin-square:hover {
	color: #0077b5;
}

.center {
  margin-bottom: 30px;
}

h2 {
  margin: 0;
  font-size: 1.5em;
}

h3 {
  margin: 0;
  font-size: 1.1em;
}

</style>


