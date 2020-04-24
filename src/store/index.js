import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    newID: 0,
    notes: []
  },
  getters: {
    getNotes: state => {
      return state.notes
    },
    getTask: state => (noteIndex, taskIndex) => {
      return state.notes[noteIndex].tasks[taskIndex]
    }
  },
  mutations: {
    LOAD_NOTES(state) {
      let newID = localStorage.getItem('newID')
      if (newID !== null) {
        state.newID = parseInt(newID)
        state.notes = JSON.parse(localStorage.getItem('notes'))
      }
    },
    DELETE_TASK(state, {
      noteIndex,
      taskIndex
    }) {
      state.notes[noteIndex].tasks.splice(taskIndex, 1);
      if (state.notes[noteIndex].tasks.length == 0) {
        state.notes[noteIndex].newID = 0;
      }
    },
    CREATE_NEW_TASK(state, {
      noteIndex,
      title
    }) {
      if (title.length) {
        state.notes[noteIndex].tasks.push({
          id: state.notes[noteIndex].newID,
          title: title,
          checked: false
        })
        state.notes[noteIndex].newID++;
      }
    },
    MOVE_TASK_UP(state, {
      noteIndex,
      taskIndex
    }) {
      if (taskIndex > 0) {
        let temp1 = state.notes[noteIndex].tasks[taskIndex];
        let temp2 = state.notes[noteIndex].tasks[taskIndex - 1];
        state.notes[noteIndex].tasks.splice(taskIndex - 1, 2, temp1, temp2)
      }
    },
    CREATE_NEW_NOTE(state) {
      state.notes.push({
        id: state.newID,
        newID: 0,
        heading: '',
        tasks: []
      });
      state.newID++;
    },
    DELETE_NOTE(state, noteIndex) {
      state.notes.splice(noteIndex, 1);
    },
    UPDATE_STORAGE(state) {
      if (state.notes.length == 0) {
        state.newID = 0;
      }
      localStorage.setItem('notes', JSON.stringify(state.notes));
      localStorage.setItem('newID', state.newID);
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
      noteIndex,
      taskIndex
    }) {
      if (getters.getTask(noteIndex, taskIndex).title.length == 0) {
        commit('DELETE_TASK', {
          noteIndex,
          taskIndex
        })
      }
      commit('UPDATE_STORAGE')
    },
    createNewTask({
      commit
    }, {
      noteIndex,
      title
    }) {
      commit('CREATE_NEW_TASK', {
        noteIndex,
        title
      })
      commit('UPDATE_STORAGE')
    },
    moveTaskUp({
      commit
    }, {
      noteIndex,
      taskIndex
    }) {
      commit('MOVE_TASK_UP', {
        noteIndex,
        taskIndex
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
      noteIndex
    }) {
      commit('DELETE_NOTE', noteIndex)
      commit('UPDATE_STORAGE')
    }
  }
})