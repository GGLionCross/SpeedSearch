<template>
  <StackLayout class="bg-gray-dark space-pa-none">
    <TitleBar title="Delete" class="bg-gray" />
    <Label
      text="Are you sure you would like to delete?"
      class="text-white font-size-14sp font-weight-solid space-ma-md space-mb-none" />
    <StackLayout class="space-mx-md">
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
    <FlexboxLayout justifyContent="center">
      <Button @tap="deleteNote" class="bg-negative text-white" text="Delete" />
      <Button @tap="cancel" text="Cancel" class="bg-gray text-white" />
    </FlexboxLayout>
  </StackLayout>
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
