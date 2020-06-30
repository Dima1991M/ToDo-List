<template>
  <div class="container-fluid footer" v-sticky sticky-side="bottom">
    <div class="content">
        <p class="lead">Created by 
            <a href="https://dmitryniaborski.firebaseapp.com" title="Dmitry Niaborski"> Dmitry Niaborski.</a>
        </p>
    </div>
  </div>
</template>

<script>
import Sticky from 'vue-sticky-directive';
export default {
    name: 'Footer',
    directives: { Sticky }
}
</script>

<style scoped>
a, a:hover {
    text-decoration: none;
}
.footer {
    background: #eeeeee;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    padding: 5px 0;
    font-family: 'Lato', sans-serif;
    -webkit-box-shadow: 0px -2px 5px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px -2px 5px 0px rgba(0,0,0,0.75);
    box-shadow: 0px -2px 5px 0px rgba(0,0,0,0.75);
}
.content p {
    margin: 0;
}
.content a {
    font-weight: 700;
}
</style>