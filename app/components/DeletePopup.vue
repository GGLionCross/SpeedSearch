<template>
  <GridLayout rows="auto, auto, auto, *, auto" height="100%" class="bg-gray-dark space-pa-none">
    <TitleBar row="0" title="Delete" class="bg-gray" />
    <Label row="1" text="Are you would like to delete?" class="text-white" />
    <TextField row="2" :text="note.title" :editable="false" class="text-white" />
    <TextView row="3" :text="note.content" :editable="false" class="text-white" />
    <FlexboxLayout row="4" justifyContent="center">
      <Button @tap="deleteNote" class="bg-negative text-white" text="Delete" />
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
  methods: {
    deleteNote() {
      this.$emit("deleteNote", this.note);
      this.$emit("close");
    },
    cancel() {
      this.$emit("close");
    }
  }
}
</script>
