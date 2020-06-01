<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Most Used Words</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <v-form>
          <v-file-input
            label="Selecione as Legendas"
            prepend-icon="mdi-message-text"
            append-outer-icon="mdi-send"
            outlined
            multiple
            chips
            v-model="files"
            @click:append-outer="processSubtitles"
          ></v-file-input>
        </v-form>
        <div class="pills">
          <Pill
            v-for="word in groupeWords"
            :key="word.name"
            :name="word.name"
            :amount="word.amount"
          />
        </div>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Pill from "@/components/Pill";
import { ipcRenderer } from "electron";

export default {
  name: "App",
  components: {
    Pill
  },
  data: () => ({
    files: [],
    groupeWords: []
  }),
  methods: {
    processSubtitles() {
      const paths = this.files.map(file => file.path);

      ipcRenderer.send("process-subtitles", paths);
      ipcRenderer.on("process-subtitles", (event, words) => {
        this.groupeWords = words;
      });
    }
  }
};
</script>

<style lang="css">
.pills {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
