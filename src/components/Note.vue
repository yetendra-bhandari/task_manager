<template>
  <div class="note">
    <div class="heading">
      <input
        type="text"
        class="note-heading"
        placeholder="Note Heading"
        v-model="note.heading"
        @change="updateNote"
        v-on:keyup.enter="updateNote"
      />
      <img
        class="delete-note"
        src="@/assets/delete.svg"
        alt="Delete Note"
        title="Delete Note"
        @click="deleteNote"
      />
    </div>
    <transition-group class="tasks" name="grow">
      <Task
        v-for="(task, index) in note.tasks"
        :key="task.id"
        :noteIndex="noteIndex"
        :task="task"
        :taskIndex="index"
      />
      <NewTask :noteIndex="noteIndex" :key="'newTask'" />
    </transition-group>
  </div>
</template>

<script>
import Task from '@/components/Task.vue';
import NewTask from '@/components/NewTask.vue';
import store from '@/store';

export default {
  props: ['note', 'noteIndex'],
  components: {
    Task,
    NewTask
  },
  computed: {},
  methods: {
    updateNote() {
      store.dispatch('updateNote');
    },
    deleteNote() {
      store.dispatch('deleteNote', { noteIndex: this.noteIndex });
    }
  }
};
</script>

<style scoped>
.note {
  height: max-content;
  border-radius: 0.75rem;
  background-color: #0d4221;
  padding: 0.75rem;
  display: grid;
  gap: 0.75rem;
}
.heading {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 1rem;
}
.note-heading {
  border: none;
  background-color: transparent;
  color: #7fdca2;
  font: 1rem Imprima;
  outline: none;
}
.delete-note {
  height: 1rem;
  user-select: none;
}
.delete-note:hover {
  cursor: pointer;
}
.tasks {
  height: max-content;
  display: grid;
  gap: 0.75rem;
}
</style>