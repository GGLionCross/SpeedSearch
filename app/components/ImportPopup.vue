<template>
  <GridLayout rows="auto, *, auto" height="100%" class="bg-gray-dark space-pa-none">
    <TitleBar row="0" title="Import" class="bg-gray">
      <StackLayout v-if="!confirm.open" orientation="horizontal">
        <Button text="+" @tap="addCode" class="btn-action bg-gray-dark text-white" />
        <Button text="r" @tap="resetCode" class="btn-action bg-gray-dark text-white" />
      </StackLayout>
    </TitleBar>
    <TextView v-if="!confirm.open" row="1" v-model="impCode" class="text-white" />
    <ListView v-else row="1" for="note in notesToImport" class="text-white">
      <v-template>
        <StackLayout>
          <Label text="Title" class="text-accent font-weight-solid space-pb-none" />
          <TextView
            :editable="false"
            :text="note.title"
            class="text-white space-mx-md space-pa-none size-min-h-none" />
          <Label text="Content" class="text-accent font-weight-solid space-pb-none" />
          <TextView
            :editable="false"
            :text="note.content"
            class="text-white space-mx-md space-pa-none size-min-h-none" />
        </StackLayout>
      </v-template>
    </ListView>
    <FlexboxLayout v-if="!confirm.open" row="2" justifyContent="center">
      <Button
        @tap="openConfirm"
        :isEnabled="importEnabled"
        class="bg-accent text-white"
        text="Import" />
      <Button @tap="paste" class="bg-gray text-white" text="Paste" />
      <Button @tap="close" text="Close" class="bg-gray text-white" />
    </FlexboxLayout>
    <FlexboxLayout v-else row="2" justifyContent="center">
      <Button @tap="importNotes" class="bg-accent text-white" text="Import" />
      <Button @tap="setConfirm(false)" text="Cancel" class="bg-gray text-white" />
    </FlexboxLayout>
  </GridLayout>
</template>

<script>
import TitleBar from "./TitleBar";
export default {
  components: { TitleBar },
  data() {
    return {
      confirm: {
        open: false
      },
      defaultCode: "===TITLE===\nTitle Goes Here\n===CONTENT===\nContent Goes Here",
      impCode: "===TITLE===\nTitle Goes Here\n===CONTENT===\nContent Goes Here",
      notesToImport: [
        {
          title: "Howdy",
          content: "Howy!\nHeybb!"
        },
        {
          title: "How1dy11",
          content: "Hosy1!"
        },
        {
          title: "Howdy11",
          content: "Howdy1!"
        }
      ]
    }
  },
  computed: {
    importEnabled() {
      return this.impCode !== "";
    }
  },
  methods: {
    setConfirm(confirmState) {
      this.confirm.open = confirmState;
    },
    openConfirm() {
      this.notesToImport = [];
      let impCode = "\n" + this.impCode;
      let notes = impCode.split("\n===TITLE===\n");
      /*
          Skip the first one because splitting by "===TITLE===" will
          return ["", "Title\n===CONTENT==="]
       */
      for (let i = 1; i < notes.length; i++) {
        let note = notes[i].split("\n===CONTENT===\n");
        this.notesToImport.push({ title: note[0], content: note[1] })
      }
      this.setConfirm(true);
    },
    importNotes() {
      this.$emit("importNotes", this.notesToImport);
      this.close();
    },
    async paste() {
      var clipboard = require("nativescript-clipboard");
      this.impCode = await clipboard.getText();
    },
    close() {
      this.$emit("close");
    },
    addCode() {
      if (this.impCode === "") this.resetCode()
      else {
        this.impCode += "\n";
        this.impCode += this.defaultCode;
      }
    },
    resetCode() {
      this.impCode = this.defaultCode;
    }
  }
}
</script>
<style scoped>
.btn-action {
  width: 50dp;
  margin: 0;
  margin-right: 8dp;
  font-size: 16sp;
  font-weight: 900;
}
</style>
