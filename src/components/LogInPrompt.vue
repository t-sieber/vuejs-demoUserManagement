<template>
    <div>
        <form @submit="loginAttempt">
            <input v-model="name" name="Name"  /> <br />
            <input v-model="mail" name="Mail" /> <br />
            <input type="submit" value="submit">
        </form>
    </div>
</template>

<script>
export default {
    name: "LogInPrompt",
    data() {
        return {
            name: "",
            mail: "",
            password: ""
        }
    },
   
    methods: {
      
        loginAttempt(e) {
            e.preventDefault();
            let credentials = {'name': this.name, 'mail': this.mail, 'password': this.password};
            this.$emit('loginAttempt', credentials);
        }
        
    }
}
</script>
<style scoped>

</style>