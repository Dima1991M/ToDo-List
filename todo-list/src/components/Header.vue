<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <ul class="navbar-nav">
            <li class="nav-item" 
                v-for="link in navLinks"
                :key="link.id"
                :class="{ active: link == setColor }"
            >
                <a class="nav-link" href="#" @click.prevent="goTo()">{{ link | capitalize }}</a>
            </li>
        </ul>
    </nav>
  </div>
</template>

<script>
export default {
    name: 'Header',
    data() {
        return {
            navLinks: ['home', 'create']
        }
    },
    methods: {
        goTo() {
            const linkPath = '/' + event.target.textContent.toLowerCase();
            if(this.$route.path !== linkPath) this.$router.push(linkPath);
        }
    },
    computed: {
        setColor() {
            return this.$route.name || 'home';
        }
    }
}
</script>

<style scoped>
.bg-light {
    background-color: rgba(255, 255, 255, 0.185) !important;
}
.navbar-nav {
    width: 100%;
    align-items: center;
    justify-content: center;
}
.nav-link {
    font-size: 1.5em;
    font-weight: 700;
    margin: 0 2rem;
}
.navbar-nav .nav-link {
    color: #fff !important;
    transition: color .3s ease-in-out;
}
.navbar-nav .nav-link:hover {
    color: #abdbab !important;
}

.active {
    border-bottom: 2px solid #abdbab;
} 
</style>
