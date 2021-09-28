<template>
    <div class="">
        <div class="row">
            <h1>Hi {{user.firstName}}!</h1>
        </div>

        <div class="row">
            <p>You're logged in my demo app.</p>
            </div>
            <div class="row">
                <router-link to="/login">Logout</router-link>
                
            </div>
    </div>
</template>

<script>
export default {
    computed: {
        user() {
            return this.$store.state.authentication.user;
        }
    }
};
</script>