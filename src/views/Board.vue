<template>
  <main>

    <div class="top">
        <Drop v-for="(deck, index) in playDecks" 
            :key="index"
            @drop="findDeck(deck.name)">
            <div>
                    <Deck
                    :name="deck.name"
                    :cards="deck.cards"
                    @trash="trashCard"
                    @moveCard="moveCard"
                    :animationDelay="index == 0 ? .5 : index == 1 ? 1 : index == 2 ? 1.5 : 2"
                    :changedPile="changePile"
                    />
            </div>
        </Drop>
    </div>

    <div class="bottom">

            <span @click="takeFour">
            <Deck
            :cards="mainDeck"
            :name="'main'"
            />
            <p>Cards left: {{cardsLeft}}</p>
            </span>

            <Deck
            :cards="trashDeck"
            :name="'trash'"
            />

    </div>

    <transition name="zoom">
        <div 
        class="overlay" 
        v-if="cardsLeft == 0 && trashables.length == 0">
            <Overlay 
            @playAgain="playAgain" 
            :isWinner="checkForWin()"
            />
        </div>
    </transition>
  </main>
</template>

<script>

import Deck from '@/components/Deck'
import * as Game from '@/game.js'
import {Drop} from 'vue-drag-drop'
import Overlay from '@/components/Overlay'

export default {
    data(){ return {

        deckToDropTo: "",
        changePile : false,

        retry: 1,

        // Deck to get cards from
        mainDeck : [],

        // Deck to throw cards in
        trashDeck: [],

        // Top 4 decks
        playDecks: [
        {"name":"Pile1", "cards":[]}, 
        {"name":"Pile2", "cards":[]}, 
        {"name":"Pile3", "cards":[]}, 
        {"name":"Pile4", "cards":[]}],

        // Trashable cards
        trashables : [],
        shouldBeTrashed : false,

        cardsLeft: 52,
    }},
    components: {Deck, Drop, Overlay},
    computed: {
        topCards() {
            return Game.getTopCards(this.playDecks)
        }
    },

    created() {
        this.mainDeck = Game.shuffle(Game.fillDeck())
    },
    beforeUpdate() {
        this.trashables = Game.checkForTrashables(this.playDecks)
    },

    methods: {
        takeFour(){
            Game.takeFour(this.mainDeck, this.playDecks)
            this.trashables = Game.checkForTrashables(this.playDecks)
            this.cardsLeft -= 4
            this.changePile = false
        },
        trashCard(card, name) {

            for(let i = 0; i < this.trashables.length; i++) {
                if(this.trashables[i] == card) {

                    // Get the correct card array
                    let cardArr = this.playDecks.find(x => x.name == name).cards
                    
                    // Add the card to the trash array
                    this.trashDeck.push(card)

                    // Remove the card from the pile
                    cardArr.splice(cardArr.indexOf(
                        cardArr.find(x => x == name)
                    ), 1)
                }
            }
        },

        playAgain() {
            this.$emit('playAgain', this.retry)
            this.retry++
        },

        moveCard(card, name) {
            this.changePile = true;

            let deckToAddTo = this.playDecks.find(x => x.name == this.deckToDropTo)
            let deckToRemoveFrom = this.playDecks.find(x => x.name == name)

            if(deckToAddTo.cards.length == 0) {
                deckToRemoveFrom.cards.pop()
                deckToAddTo.cards.push(card)
            }
        },

        findDeck(name) {
            this.deckToDropTo = name
        },

        checkForWin(){
            let sum = 0
            let numberOfCardsLeft = 0

            // Check number of cards left
            for(let i = 0; i < this.playDecks.length; i++) {
                numberOfCardsLeft += this.playDecks[i].cards.length
            }

            console.log(numberOfCardsLeft)

            if(numberOfCardsLeft == 4) {

                // Check value of top cards
                for(let i = 0; i < this.topCards.length; i++) {
                    sum += this.topCards[i].value
                }
            }
            else {
                return false;
            }

            // Check that it's only aces left in the piles
            return (sum == (14 * 4))
        }
    },
}
</script>

<style lang="scss" scoped>
@import url('https://cdn.jsdelivr.net/npm/animate.css@3.5.1');

main {
    height: 100%;
    display: flex;
    flex-direction: column;

    .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .bottom {
        display: flex;
        justify-content: space-between;
    }

}

p { 
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-weight: 700;
    font-size: 2rem;
    padding-left: 4rem;
}

.footer {
    text-align: center;
    p {
        font-size: 14rem;
    }
}
.slow {
    animation-duration: 2s;    
}

.overlay {
  position: fixed; /* Sit on top of the page content */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.9); /* Black background with opacity */
  z-index: 999; /* Specify a stack order in case you're using a different order for other elements */
}

@media screen and (min-width: 1250px) {
    main {
        justify-content: center;
    }

    .top {
        width: 50%;
        align-self: center;
    }

    .bottom {
        width: 50%;
        align-self: center;
    }
}

</style>
