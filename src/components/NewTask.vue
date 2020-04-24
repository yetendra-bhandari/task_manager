<template>
  <div class="task">
    <input
      type="text"
      class="task-title"
      placeholder="New Task"
      v-model="title"
      @change="createNewTask"
      v-on:keyup.enter="createNewTask"
    />
  </div>
</template>

<script>
import store from '@/store';

export default {
  props: ['noteIndex'],
  data() {
    return {
      title: ''
    };
  },
  methods: {
    createNewTask() {
      store.dispatch('createNewTask', {
        noteIndex: this.noteIndex,
        title: this.title
      });
      this.title = '';
    }
  }
};
</script>

<style scoped>
.task-title {
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  background-color: rgba(127, 220, 163, 0.1);
  color: #7fdca2;
  outline: none;
  font: 0.8rem Imprima;
}
</style>