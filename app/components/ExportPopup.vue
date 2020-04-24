<template>
  <GridLayout rows="auto, *, auto" height="100%" class="bg-gray-dark space-pa-none">
    <TitleBar row="0" title="Export" class="bg-gray" />
    <TextView row="1" v-model="expCode" :editable="false" class="text-white" />
    <FlexboxLayout row="2" justifyContent="center">
      <Button @tap="copy" class="bg-accent text-white" text="Copy" />
      <Button @tap="close" text="Close" class="bg-gray text-white" />
    </FlexboxLayout>
  </GridLayout>
</template>

<script>
import TitleBar from "./TitleBar";
export default {
  components: { TitleBar },
  props: {
    notes: {
      type: Array,
      required: true
    }
  },
  computed: {
    expCode() {
      let code = "";
      for (let i = 0; i < this.notes.length; i++) {
        code += "===TITLE===\n";
        code += this.notes[i].title;
        code += "\n===CONTENT===\n";
        code += this.notes[i].content;
        code += "\n";
      }
      return code;
    }
  },
  methods: {
    copy() {
      var clipboard = require("nativescript-clipboard");
      clipboard.setText(this.expCode);
    },
    close() {
      this.$emit("close");
    }
  }
}
</script>
