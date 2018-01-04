<template>
  <div class="content">
    <div class="uk-container">
      <div id="login-content" v-if="loginView">
        <h1>
          {{ msg }}
          <img src="assets/image/logo.png" alt="image of logo">-
          <span class="content-todo">Todo Fancy</span>
        </h1>
        <div class="uk-divider-small"></div>
        <div class="uk-grid-small uk-child-width-1-2@s uk-flex-center uk-text-center" uk-grid>
          <div>
            <div class="uk-card uk-card-default uk-card-body"> 
              <div class="uk-card-header">
                <h4 class="uk-card-title">Please Login First :</h4>
              </div>
              <div class="uk-card-body">
                <a type="button" @click="login">
                  <img src="assets/image/facebook-login.png" alt="facebook-login">
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="task-content" v-else>
        <ul class="uk-subnav uk-subnav-pill uk-child-width-expand" uk-switcher="animation: uk-animation-slide-left-medium, uk-animation-slide-right-medium">
            <li><a href="#">Todo List</a></li>
            <li><a href="#">Add Todo</a></li>
        </ul>

        <ul class="uk-switcher uk-margin">
            <li>
              <div class="uk-child-width-auto" uk-grid uk-scrollspy="cls: uk-animation-fade; target: > div > .uk-card; delay: 500; repeat: true" >
                <div v-for="(task, index) in dataTask">
                  <ul uk-accordion class="uk-margin-small">
                    <li class="uk-open uk-card uk-card-hover uk-card-default">
                      <h3 v-if="task.status === false" class="uk-accordion-title uk-card-header">{{task.title}}</h3>
                      <h3 v-else class="uk-accordion-title uk-card-header uk-section-primary">{{task.title}}</h3>
                      
                      <div class="uk-accordion-content uk-card-body">
                        <p class="uk-text-meta uk-margin-remove-top"><time :datetime="task.startDate">{{task.startDate}}</time> to <time :datetime="task.endDate">{{task.endDate}}</time></p>
                        <span v-if="task.status === false" style="padding-left:5px;" class="uk-label uk-label-warning">On Process</span>
                        <span v-else style="padding-left:5px;" class="uk-label uk-label">Finish</span>
                        <hr>
                        <p id="task-description">{{task.description}}</p>
                        <hr>
                        <GmapMap id="modal-map" style="height:300px;" :zoom="14" :center="{lat: task.latitude, lng: task.longtitude}">
                          <GmapMarker
                            label="★"
                            :position="{
                              lat: task.latitude,
                              lng: task.longtitude,
                            }"
                            />
                        </GmapMap>
                        <hr>
                        <a class="uk-button uk-button-primary uk-button-small" href="#modal-sections" style="color:white;" uk-toggle>Edit</a>
                        <button class="uk-button uk-button-danger uk-button-small" @click.prevent="deleteTask(task.id)">Delete</button>
                      </div>
                      <div id="modal-sections" uk-modal>
                        <div class="uk-modal-dialog">
                            <button class="uk-modal-close-default" type="button" uk-close></button>
                            <div class="uk-modal-header">
                                <h2 class="uk-modal-title">Edit Task</h2>
                            </div>
                            <div class="uk-modal-body">
                              <form class="uk-form-horizontal uk-margin-large uk-flex-left" @submit="editTask">
                                <input id="taskId" class="uk-input" type="hidden" :value="task.id">
                                <label class="uk-form-label" for="form-horizontal-select">Status</label>
                                <div class="uk-form-controls">
                                    <select class="uk-select" id="form-horizontal-select" v-model="status" >
                                      <option value="1" selected>Finish</option>
                                    </select>
                                </div>
                              </form>
                            </div>
                            <div class="uk-modal-footer uk-text-right">
                                <button class="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
                                <button class="uk-button uk-button-primary" type="button" @click="editTask(task.id)">Save</button>
                            </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li>
              <div class="uk-card uk-card-default uk-card-body uk-width-1-1@m">
                  <form class="uk-form-horizontal uk-margin-large uk-flex-left" @submit="addTask" @reset="resetTask">

                    <div class="uk-margin">
                        <label class="uk-form-label" for="form-horizontal-text">Title</label>
                        <div class="uk-form-controls">
                            <input name="title" id="title" v-model="title" class="uk-input" type="text" placeholder="Title...">
                        </div>
                    </div>

                    <div class="uk-margin">
                        <label class="uk-form-label" for="form-horizontal-select">Start Date</label>
                        <div class="uk-form-controls">
                            <input name="start-date" id="start-date" v-model="startDate" class="uk-input" type="date" placeholder="Start Date...">
                        </div>
                    </div>

                    <div class="uk-margin">
                        <label class="uk-form-label" for="form-horizontal-select">End Date</label>
                        <div class="uk-form-controls">
                            <input name="end-date" id="end-date" v-model="endDate" class="uk-input" type="date" placeholder="End Date...">
                        </div>
                    </div>

                    <div class="uk-margin">
                        <label class="uk-form-label" for="form-horizontal-text">Description</label>
                        <div class="uk-form-controls">
                            <textarea name="description" v-model="description" id="description" class="uk-textarea" rows="5" placeholder="Description..."></textarea>
                        </div>
                    </div>

                    <div class="uk-margin">
                        <label class="uk-form-label" for="form-horizontal-text">Location</label>
                        <div class="uk-form-controls">
                            <div>
                              <GmapAutocomplete name="location" id="location" class="uk-input" @place_changed="setPlace"></GmapAutocomplete>

                              <GmapMap id="map" :zoom="8" :center="center">
                                <GmapMarker v-for="(marker, index) in markers"
                                  :key="index"
                                  :position="marker.position"
                                  />
                                <GmapMarker
                                  v-if="this.place"
                                  label="★"
                                  :position="{
                                    lat: this.place.geometry.location.lat(),
                                    lng: this.place.geometry.location.lng(),
                                  }"
                                  />
                              </GmapMap>
                            </div>  
                        </div>
                    </div>

                    <div class="uk-margin">
                        <label class="uk-form-label" for="form-horizontal-select">Status</label>
                        <div class="uk-form-controls">
                            <select class="uk-select" id="form-horizontal-select" v-model="status" >
                                <option value="0" selected>On Process</option>
                            </select>
                        </div>
                    </div>
                    <button class="uk-button uk-button-primary uk-width-1-1 uk-margin-small-bottom">Submit</button>
                  </form>
              </div>
            </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps'
import Vue from 'vue'
import axios from 'axios'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAFZ44PGwSAWU9RAu7xpuToJHJjIPhl8Is',
    libraries: 'places'
  }
})

export default {
  name: 'Main-content',
  data () {
    return {
      msg: 'Welcome to ',
      loginView: true,
      center: {lat: -6.121435, lng: 106.774124},
      markers: [],
      taskId: null,
      place: null,
      title: '',
      startDate: '',
      endDate: '',
      description: '',
      status: '',
      dataTask: []
    }
  },
  created () {
    if (localStorage.getItem('userId')) {
      this.loginView = false
      this.logoutMenu = true

      let userID = localStorage.getItem('userId')
      axios.get(`http://35.197.159.250:3002/api/tasks?userId=${userID}`)
      .then(result => {
        result.data.data.forEach(task => {
          let dStartDate = new Date(task.startDate)
          let dEndDate = new Date(task.endDate)
          let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
          let months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '11']
          let setStartDate = `${days[dStartDate.getDay()]}, ${months[dStartDate.getMonth()]}/${dStartDate.getDate()}/${dStartDate.getFullYear()}`
          let setEndDate = `${days[dEndDate.getDay()]}, ${months[dEndDate.getMonth()]}/${dEndDate.getDate()}/${dEndDate.getFullYear()}`
          let items = {
            id: task._id,
            title: task.title,
            description: task.description,
            location: task.location,
            latitude: task.latitude,
            longtitude: task.longtitude,
            startDate: setStartDate,
            endDate: setEndDate,
            status: task.status
          }
          this.dataTask.push(items)
          console.log(items)
        })
      })
      .catch(err => {
        console.log(err)
      })
    }

    window.fbAsyncInit = function() {
      FB.init({
        appId            : '138076800208430',
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v2.11'
      });

      FB.getLoginStatus(function(response) {
        statusChangeCallback (response)
      });
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) { return }
      js = d.createElement(s); js.id = id
      js.src = 'https://connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))

    function statusChangeCallback (response) {
      if (response.status === 'connected') {
        localStorage.setItem('fbaccesstoken', response.authResponse.accessToken)
        // $('#btn-login').hide()
        // $('#logout').show()
      }
    }
  },
  methods: {
    setPlace (place) {
      this.place = place
    },
    usePlace (place) {
      if (this.place) {
        this.markers.push({
          position: {
            lat: this.place.geometry.location.lat(),
            lng: this.place.geometry.location.lng()
          }
        })
        this.center = {lat: this.place.geometry.location.lat(), lng: this.place.geometry.location.lng()}
        this.place = null
      }
    },
    login () {
      FB.login(function (response) {
        // console.log(response.authResponse.accessToken)
        if (response.authResponse) {
          axios.post('http://35.197.159.250:3002/api/users/', {
            token: response.authResponse.accessToken
          })
          .then(result => {
            // console.log(result)
            localStorage.setItem('userId', result.data.data._id)
            localStorage.setItem('username', result.data.data.name)
            location.reload()

          })
          .catch(err => {
            console.log(err)
          })
        } else {
          console.log('The person is not logged into this app or we are unable to tell.')
        }
      }, { scope: 'public_profile,email,publish_actions,user_posts, user_photos' })
    },
    addTask (event) {
      event.preventDefault()
      axios.post('http://35.197.159.250:3002/api/tasks/', {
        userId: localStorage.getItem('userId'),
        title: this.title,
        description: this.description,
        status: this.status,
        location: this.place.name,
        latitude: this.place.geometry.location.lat(),
        longtitude: this.place.geometry.location.lng(),
        startDate: this.startDate,
        endDate: this.endDate
      })
      .then(result => {
        console.log(result)
        location.reload()
      })
      .catch(err => {
        console.log(err)
      })
    },
    resetTask (event) {
      event.preventDefault()
      this.title = ''
      this.description = ''
      this.status = ''
      this.startDate = ''
      this.endDate = ''
    },
    editTask (id) {
      console.log(id)
      axios.put(`http://35.197.159.250:3002/api/tasks/${id}`, {
        status: this.status
      })
      .then(result => {
        console.log(result)
        location.reload()
      })
      .catch(err => {
        console.log(err)
      })
    },
    deleteTask (id) {
      console.log(id)
      axios.delete(`http://35.197.159.250:3002/api/tasks/${id}`)
      .then(result => {
        console.log(result)
        location.reload()
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content{
  padding: 20vh 0 20vh 0;
  text-align: center;
}
.login-content{
  display: none;
}
.content-todo{
  font-family: 'Pacifico', cursive;
}
#map{
  width: 500px; 
  height: 300px
}
#task-description{
  width: 300px;
  word-wrap: break-word;
  font-size: 14px;
}
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
@media (max-width: 767px) {
  #map{
    width: 250px; 
    height: 150px
  }
  #task-description{
    width: 200px;
  }
}
</style>
