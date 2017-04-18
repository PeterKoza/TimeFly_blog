<template>
  <div class="home">
    <img id="titleImg" src="./../assets/Website_Preview.png" alt="title foto">
    <section>
      <h1>Building your story</h1>
      <h4>How we bring your photos back to life!</h4>

      <div class="row">
          <div class="col-lg-3 col-sm-3 center">
            <img src="./../assets/3d.jpg" alt="3D model">
            <h4>SMART ALBUMS</h4>
            <p>Albums updating in real-time to provide you with the content you want to see! No more browsing through thousands of pictures. Instead your content is delivered to you on a silver platter.
            </p>
          </div>
          <div class="col-lg-3 col-sm-3 center">
            <img src="./../assets/album.png" alt="album">
            <h4>3D BROWSING</h4>
            <p>We are disrupting the way users browse albums. Not even the digital age managed to change the way we browse our images. From booklet photo albums to folders on a screen, nothing changed.
            </p>
          </div>
          <div class="col-lg-3 col-sm-3 center">
            <img src="./../assets/matrix.jpg" alt="matrix">
            <h4>USER INPUT</h4>
            <p>As users interact with the application, their input will directly affect the content they access. The user is in charge of their journey through TimeFly, making it more relevant the more they interact with the application.
            </p>
          </div>
          <div class="col-lg-3 col-sm-3 center">
            <img src="./../assets/user_input.jpg" alt="user input">
            <h4>ALGORITHM</h4>
            <p>Essentially the algorithm is the manual labor a user would have been doing when they browsed through thousands of pictures. Instead the process is automated, serving pictures up in real-time without the frustration.</p>
          </div>
        </div>
    </section>
  </div>
</template>

<script>

export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

#titleImg {
	width: 100%;
	height: 80%;
}

</style>
