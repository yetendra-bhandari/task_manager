<template>
  <div class="task">
    <img
      class="task-isActive"
      :src="activeImage"
      alt="Active/Inactive"
      :title="activeTitle"
      @click="toggleActive"
    />
    <input
      type="text"
      class="task-title"
      placeholder="Task Description"
      v-model="task.title"
      @change="updateTask"
      v-on:keyup.enter="updateTask"
    />
    <img
      class="task-moveUp"
      :src="require('@/assets/move-up.svg')"
      alt="Move Task Up"
      v-if="taskIndex"
      title="Move Task Up"
      @click="moveTaskUp"
    />
  </div>
</template>

<script>
import store from '@/store';

export default {
  props: ['noteIndex', 'task', 'taskIndex'],
  computed: {
    activeImage() {
      return this.task.checked
        ? require('@/assets/checkbox-active.svg')
        : require('@/assets/checkbox-inactive.svg');
    },
    activeTitle() {
      return this.task.checked ? 'Active' : 'Inactive';
    }
  },
  methods: {
    toggleActive() {
      this.task.checked = !this.task.checked;
      this.updateTask();
    },
    updateTask() {
      store.dispatch('updateTask', {
        noteIndex: this.noteIndex,
        taskIndex: this.taskIndex
      });
    },
    moveTaskUp() {
      store.dispatch('moveTaskUp', {
        noteIndex: this.noteIndex,
        taskIndex: this.taskIndex
      });
    }
  }
};
</script>

<style scoped>
.task {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: auto 1fr auto;
  gap: 0.5rem;
  align-items: center;
}
.task-title {
  width: 100%;
  border: none;
  background-color: transparent;
  color: #7fdca2;
  outline: none;
  font: 0.8rem Imprima;
}
.task-moveUp,
.task-isActive {
  height: 1rem;
  user-select: none;
}
.task-moveUp:hover,
.task-isActive:hover {
  cursor: pointer;
}
</style>