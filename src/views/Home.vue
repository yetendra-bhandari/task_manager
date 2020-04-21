<template>
  <div class="notes">
    <Note v-for="note in notes" :key="note.id" :note="note" />
    <NewNote />
  </div>
</template>

<script>
// @ is an alias to /src
import Note from '@/components/Note.vue';
import NewNote from '@/components/NewNote.vue';
import store from '@/store';

export default {
  name: 'Home',
  components: {
    Note,
    NewNote
  },
  computed: {
    notes() {
      return store.getters.getNotes;
    }
  },
  created() {
    store.dispatch('loadNotes');
  }
};
</script>

<style scoped>
.notes {
  height: max-content;
  display: grid;
  grid-template-columns: repeat(auto-fit, 20rem);
  justify-content: center;
  gap: 1rem;
}
@media only screen and (max-width: 768px) {
  .notes {
    grid-template-columns: 1fr;
  }
}
</style>