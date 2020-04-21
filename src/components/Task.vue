<template>
  <div class="task">
    <img
      class="task-isActive"
      :src="activeImage"
      alt="Active/Inactive"
      :title="task.checked?'Active':'Inactive'"
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
      alt="Move Up"
      v-if="task.id"
      title="Move Up"
      @click="moveUp"
    />
  </div>
</template>

<script>
import store from '@/store';

export default {
  props: ['note_id', 'task'],
  computed: {
    activeImage() {
      return this.task.checked
        ? require('@/assets/checkbox-active.svg')
        : require('@/assets/checkbox-inactive.svg');
    }
  },
  methods: {
    toggleActive() {
      this.task.checked = !this.task.checked;
      this.updateTask();
    },
    updateTask() {
      store.dispatch('updateTask', {
        note_id: this.note_id,
        task_id: this.task.id
      });
    },
    moveUp() {
      store.dispatch('moveTaskUp', {
        note_id: this.note_id,
        task_id: this.task.id
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
}
.task-moveUp:hover,
.task-isActive:hover {
  cursor: pointer;
}
</style>