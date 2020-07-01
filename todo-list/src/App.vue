<template>
  <div id="app">
    <nav-header></nav-header>
    <transition name="component-fade" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <bottom-footer></bottom-footer>
  </div>
</template>
<script>
import Header from './components/Header';
import Footer from './components/Footer';
export default {
  components: {
    'nav-header': Header,
    'bottom-footer': Footer
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter, .component-fade-leave-to {
  opacity: 0;
}

#app {
  width: 100vw;
  height: 100%;
  min-height: 100vh;
  overflow: hidden;
  background: linear-gradient(to bottom,rgba(120, 107, 175, 1), rgba(40, 140, 255,1));
  background-color: transparent;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
}
</style>
