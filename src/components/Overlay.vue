<template>
    <div class="overlay-container">
        <h1 v-if="!isWinner">You lose, idiot!</h1>
        <h1 v-else>You won, genius!</h1>
        <button 
        class="btn"
        @click="playAgain"
        >Play again
        </button>
    </div>
</template>

<script>
export default {
    props: {
        isWinner : Boolean
    },

    methods: {
        playAgain(){
            this.$emit('playAgain', 1)
        }
    }

}
</script>

<style lang="scss" scoped>

.overlay-container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h1 {
        color: white;
        font-size: 10rem;
    }

    .btn {
        padding: 2rem 4rem;
        margin: 5rem;
        outline: none;
        font-size: 2rem;
    }
}


</style>