<template>
  <FlexboxLayout justifyContent="space-between" alignItems="center" class="bg-accent text-white">
    <Label col="0" :text="title" class="font-size-20sp font-weight-solid space-ma-md" />
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
