<template>
  <div class="header">
    {{ title }}
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    title: String
  }
};
</script>

<style lang="scss">
@import "cards";

.header {
  @extend .slot;
  font-weight: bold;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
</style>
