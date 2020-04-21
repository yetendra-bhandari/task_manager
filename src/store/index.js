import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notes: []
  },
  getters: {
    getNotes: state => {
      return state.notes;
    },
    getTask: state => (note_id, task_id) => {
      return state.notes[note_id].tasks[task_id]
    }
  },
  mutations: {
    LOAD_NOTES(state) {
      let temp = localStorage.getItem('notes')
      if (temp !== null) {
        state.notes = JSON.parse(temp)
      }
    },
    DELETE_TASK(state, {
      note_id,
      task_id
    }) {
      for (let i = task_id; i < state.notes[note_id].tasks.length - 1; i++) {
        state.notes[note_id].tasks[i] = state.notes[note_id].tasks[i + 1];
        state.notes[note_id].tasks[i].id--;
      }
      state.notes[note_id].tasks.pop();
    },
    CREATE_NEW_TASK(state, {
      note_id,
      title
    }) {
      if (title.length) {
        state.notes[note_id].tasks.push({
          id: state.notes[note_id].tasks.length,
          title: title,
          checked: false
        })
      }
    },
    MOVE_TASK_UP(state, {
      note_id,
      task_id
    }) {
      if (task_id) {
        let temp = {};
        temp.title = state.notes[note_id].tasks[task_id].title;
        temp.checked = state.notes[note_id].tasks[task_id].checked;
        state.notes[note_id].tasks[task_id].title = state.notes[note_id].tasks[task_id - 1].title
        state.notes[note_id].tasks[task_id].checked = state.notes[note_id].tasks[task_id - 1].checked
        state.notes[note_id].tasks[task_id - 1].title = temp.title;
        state.notes[note_id].tasks[task_id - 1].checked = temp.checked;
      }
    },
    CREATE_NEW_NOTE(state) {
      let newID = state.notes.length;
      state.notes.push({
        id: newID,
        heading: '',
        tasks: []
      });
    },
    DELETE_NOTE(state, note_id) {
      for (let i = note_id; i < state.notes.length - 1; i++) {
        state.notes[i] = state.notes[i + 1];
        state.notes[i].id--;
      }
      state.notes.pop();
    },
    UPDATE_STORAGE(state) {
      localStorage.setItem('notes', JSON.stringify(state.notes));
    }
  },
  actions: {
    loadNotes({
      commit
    }) {
      commit('LOAD_NOTES')
    },
    updateTask({
      getters,
      commit
    }, {
      note_id,
      task_id
    }) {
      if (!getters.getTask(note_id, task_id).title.length) {
        commit('DELETE_TASK', {
          note_id,
          task_id
        })
      }
      commit('UPDATE_STORAGE')
    },
    createNewTask({
      commit
    }, {
      note_id,
      title
    }) {
      commit('CREATE_NEW_TASK', {
        note_id,
        title
      })
      commit('UPDATE_STORAGE')
    },
    moveTaskUp({
      commit
    }, {
      note_id,
      task_id
    }) {
      commit('MOVE_TASK_UP', {
        note_id,
        task_id
      })
      commit('UPDATE_STORAGE')
    },
    createNewNote({
      commit
    }) {
      commit('CREATE_NEW_NOTE')
      commit('UPDATE_STORAGE')
    },
    updateNote({
      commit
    }) {
      commit('UPDATE_STORAGE')
    },
    deleteNote({
      commit
    }, {
      note_id
    }) {
      commit('DELETE_NOTE', note_id)
      commit('UPDATE_STORAGE')
    }
  },
  modules: {}
})