<template>
  <header id="header">
    <!-- Start  Navigation --> 
    
    <div id="navbar-fixed">
      <nav class="uk-navbar-container" uk-navbar>
          
        <div class="nav-overlay uk-navbar-left uk-hidden-small">
          <a class="uk-navbar-item uk-logo" href="index.html">
            <img src="assets/image/logo.png" alt="image of logo" class="logo-brand"> Todo Fancy</a>
        </div>
  
        <div class="nav-overlay uk-navbar-right uk-hidden-small">
          <ul class="uk-navbar-nav">
            <li><a href="index.html">Home</a></li>
            <li v-show="logoutMenu">
              <a href="#"><i class="material-icons">person_outline</i></a>
              <div class="uk-navbar-dropdown">
                <ul class="uk-nav uk-navbar-dropdown-nav">
                  <li>
                    <div class="uk-width-auto">
                      <p>Welcome, </p>
                      <p id="welcome">{{username}} </p>
                    </div>
                  </li>
                  <li class="uk-nav-divider"></li>
                  <li>
                      <div class="uk-width-auto" id="logout">
                        <a href="#" @click="logout"><span class="uk-margin-small-right"><i class="material-icons">lock_open</i></span>Logout</a>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          
        </div>
  
        <!-- Mobile Display -->
        <div class="uk-navbar-left uk-visible-small">
          <a href="index.html" class="uk-navbar-item uk-logo">
            <img src="assets/image/logo.png" alt="image of logo mobile" class="logo-brand"> Todo Fancy
          </a>
        </div>

        <div class="uk-navbar-right uk-visible-small">
            <a class="uk-navbar-toggle" uk-toggle uk-navbar-toggle-icon href="#offcanvas-id"></a>
        </div>
      </nav>

      <!-- Offcanvas Bar -->
      <div class="uk-offcanvas-content">
        <div id="offcanvas-id" uk-offcanvas>
          <div class="uk-offcanvas-bar uk-flex uk-flex-column">
            <button class="uk-offcanvas-close" type="button" uk-close></button>

            <ul class="uk-nav uk-nav-default">
              <li class="uk-text-center"><a href="index.html" class="uk-navbar-item uk-logo">
                  <img src="assets/image/logo.png" alt="image of logo canvas" class="logo-brand">Todo Fancy
                </a>
              </li>
              <li class="uk-nav-divider"></li>
              <li><a href="index.html"><span class="uk-margin-small-right" uk-icon="icon: home"></span> Home</a></li>
              <li><a href="#todos" uk-scroll><span class="uk-margin-small-right" uk-icon="icon: user"></span> Todos</a></li>
              <li><a href="#" uk-icon="icon: user"></a></li>
              <li><a href="#" uk-icon="icon: cart"></a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- End Navigation -->
  </header>
</template>

<script>
export default {
  data () {
    return {
      logoutMenu: false,
      username: ''
    }
  },
  created () {
    if (localStorage.getItem('userId')) {
      this.logoutMenu = true
      this.username = localStorage.getItem('username')
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      location.reload()
    }
  }
}
</script>


<style>
  .uk-logo{
    font-family: 'Pacifico', cursive;
  }
</style>
