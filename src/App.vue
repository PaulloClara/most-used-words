<template>
  <v-app>
    <c-app-bar></c-app-bar>

    <v-content>
      <v-container fluid>
        <c-file-input v-model="files" @send="processSubtitles"></c-file-input>

        <div class="pills">
          <c-pill
            v-for="word in groupeWords"
            :key="word.name"
            :name="word.name"
            :amount="word.amount"
          ></c-pill>
        </div>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Pill from "@/components/Pill";
import AppBar from "@/components/AppBar";
import FileInput from "@/components/FileInput";

import { ipcRenderer } from "electron";

export default {
  name: "App",
  components: {
    "c-pill": Pill,
    "c-app-bar": AppBar,
    "c-file-input": FileInput
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
:root {
  --primary: #dc143c;
  --secondary: #fff;
}

.pills {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
