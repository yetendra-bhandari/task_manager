<template>
  <button class="new-note" title="Create New Note" @click="createNewNote">+</button>
</template>

<script>
import store from '@/store';

export default {
  methods: {
    createNewNote() {
      store.dispatch('createNewNote');
    }
  }
};
</script>

<style scoped>
.new-note {
  border: none;
  border-radius: 0.75rem;
  padding: 0.75rem;
  background-color: #0d422180;
  font-size: 3.5rem;
  color: #0d4221;
  outline: none;
}
.new-note:hover {
  cursor: pointer;
}
</style>