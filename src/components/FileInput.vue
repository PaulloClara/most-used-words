<template lang="html">
  <v-form class="c-file-input">
    <v-file-input
      label="Select Subtitles"
      prepend-icon="mdi-message-text"
      append-outer-icon="mdi-send"
      outlined
      multiple
      chips
      @change="$emit('input', $event)"
      @click:append-outer="$emit('send', $event)"
    ></v-file-input>
  </v-form>
</template>

<script>
export default {
  name: "FileInput"
};
</script>

<style lang="css"></style>
