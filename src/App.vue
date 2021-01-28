<template>
  <div id="app">

    <Board />

  </div>
</template>

<script>
import Board from '@/views/Board'

export default {
  components: {
    Board
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
