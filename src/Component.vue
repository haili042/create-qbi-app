<template>
  <div class="test-component">
    I {{ customProps?.viewConfig?.fruit?.apple ? 'like' : "don't like" }} apple, I want to eat
    {{ customProps?.viewConfig?.fruit?.banana }} banana
  </div>
</template>

<script lang="ts">
export default {
  props: ['container', 'customProps'],
};
</script>

<style lang="sass">
.test-component {
  width: 100%;
  height: 100%;
}
</style>