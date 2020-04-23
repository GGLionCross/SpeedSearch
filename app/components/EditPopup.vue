<template>
  <GridLayout rows="auto, auto, *, auto" height="100%" class="bg-gray-dark space-pa-none">
    <TitleBar row="0" title="Edit" class="bg-gray" />
    <TextField row="1" v-model="title" :text="note.title" class="text-white" />
    <TextView row="2" v-model="content" :text="note.content" class="text-white" />
    <FlexboxLayout row="3" justifyContent="center">
      <Button @tap="saveNote" :isEnabled="saveEnabled" class="bg-accent text-white" text="Save" />
      <Button @tap="cancel" text="Cancel" class="bg-gray text-white" />
    </FlexboxLayout>
  </GridLayout>
</template>

<script>
import TitleBar from "./TitleBar";
export default {
  components: { TitleBar },
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      title: this.note.title,
      content: this.note.content
    }
  },
  computed: {
    saveEnabled() {
      return (
        this.title !== "" &&
        this.title !== this.note.title ||
        this.content !== this.note.content
      );
    }
  },
  methods: {
    saveNote() {
      this.$emit("saveNote", this.note, {
        title: this.title,
        content: this.content
      });
      this.$emit("close");
    },
    cancel() {
      this.$emit("close");
    }
  }
}
</script>
