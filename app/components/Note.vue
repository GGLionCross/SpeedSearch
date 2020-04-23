<template>
  <StackLayout>
    <Button class="bg-gray hl-accent text-white" :text="note.title" @tap="toggleShow"/>
    <StackLayout v-if="show" class="space-pa-none">
      <TextField :editable="false" :text="note.title" class="text-white" />
      <TextView :editable="false" :text="note.content" class="text-white" />
      <FlexboxLayout justifyContent="center">
        <Button @tap="openEdit" class="bg-gray text-white" text="Edit" />
        <Button @tap="openDelete" class="bg-negative text-white" text="Delete" />
      </FlexboxLayout>
    </StackLayout>
  </StackLayout>
</template>

<script>
export default {
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      show: false,
    }
  },
  methods: {
    openDelete() {
      this.$emit("openDelete", "delete", this.note);
    },
    openEdit() {
      this.$emit("openEdit", "edit", this.note);
    },
    toggleShow() {
      this.show = !this.show;
    }
  }
}
</script>
