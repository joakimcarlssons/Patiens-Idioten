<template>
  <article>
    <div v-if="!faceDown && !isEmpty">
        <Drag @dragend="selectedCard" @dragenter="selectedCard">
            <div class="card">
                <span class="top">
                    <img :src="icon" class="icon">
                    <p>{{displayValue}}</p>
                </span>

                <img :src="icon"  class="icon large">

                <span class="bottom">
                    <img :src="icon" class="icon">
                    <p>{{displayValue}}</p>
                </span>
            </div>
        </Drag>
    </div>
    <div v-else class="card" :class="{dotted : isEmpty, faceDown : faceDown}"></div>
  </article>
</template>

<script>
import {Drag} from 'vue-drag-drop'

export default {
    components: {
        Drag,
    },
    props: {
        card: Object,
        faceDown: Boolean,
        isEmpty: Boolean
    },
    computed: {
        icon() {
            return require(`@/assets/${this.card.suite.toLowerCase()}.svg`)
        },
        displayValue() {
            switch(this.card.value) {
                case 13: return 'K';
                case 12: return 'Q';
                case 11: return 'Kn';
                case 14: return 'A';
                default: return this.card.value
            }
        }
    },
    methods: {
        selectedCard() {
            this.$emit('cardDropped', this.card)
        }
    }
}
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/animate.css@3.5.1');

.card {
    width: 18rem;
    height: 26rem;
    background-color: rgb(226, 209, 176);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border:10px solid white;
    padding: 1rem;
    margin: 1rem;
    box-sizing: border-box;
}

.dotted {
    border: 2px dotted white;
    background: transparent;
}

.card p {
    margin: 0;
    padding: 0;
    font-weight: 900;
    font-size: 2.5rem;
}

.icon {
     height: 1.4rem;
     width: 1.4rem;
}

.large {
     height: 2.8rem;
     width: 2.8rem;
}

.top {
    align-self: flex-start;
}

.bottom {
    align-self: flex-end;
    transform: rotate(180deg);
}

.faceDown {
    background-image: url('~@/assets/Dots.svg');
    background-color: rgb(70, 70, 255);
}

</style>