<template>
  <FlexboxLayout justifyContent="space-between" alignItems="center" class="bg-accent text-white">
    <Label col="0" :text="title" class="title" />
    <slot></slot>
  </FlexboxLayout>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>
<style scoped>
.title {
  font-size: 20sp;
  font-weight: 900;
  margin: 16dp;
}
</style>