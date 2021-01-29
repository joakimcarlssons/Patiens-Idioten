<template>
  <div id="app">

    <Board @test="retry" :key="playAgain"/>

  </div>
</template>

<script>
import Board from '@/views/Board'

export default {
  data() {return {
    playAgain: 0
  }},
  components: {
    Board
  },
  methods: {
    retry(payload) {
      console.log(payload)
      this.playAgain = payload
    }
  }

}
</script>

<style lang="scss">

*, *::before, *::after {
  padding: 0;
  margin: 0;
}

:root {
  --green: #1E955A;

}

html, body {
  height: 100%;
}

html {
  font-size: 10px;
}

body {
  background: var(--green);
}

</style>
