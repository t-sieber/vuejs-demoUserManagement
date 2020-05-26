<template>
    <div id="history">
        <table style="border: 1px solid black; border-collapse: collapse;">
            <tr>
                <th style="border: 1px solid black;">State</th>
                <th style="border: 1px solid black;">Navigator</th>
                <th style="border: 1px solid black;">Date</th>
            </tr>
            <tr v-for="attempt in $attrs.attempts" :key="attempt">
                <td style="border: 1px solid black;">{{attempt.state}}</td>
                <td style="border: 1px solid black;">{{attempt.userInfo}}</td>
                <td style="border: 1px solid black;">{{attempt.dateTime}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    name: "LogInHistory",
    
}
</script>

<style scoped>

</style>