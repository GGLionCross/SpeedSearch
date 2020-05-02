<template>
  <Page>
    <GridLayout rows="auto, auto, *">
      <TitleBar title="SpeedSearch">
        <StackLayout v-if="!popupOpen" orientation="horizontal">
          <Button
            text="+"
            @tap="addNote('***PLACEHOLDER***', 'New Note')"
            class="btn-action text-accent" />
          <Button
            text="i"
            @tap="openPopup('import')"
            class="btn-action text-accent" />
          <Button
            text="e"
            @tap="openPopup('export')"
            class="btn-action text-accent" />
        </StackLayout>
      </TitleBar>
      <SearchBar
        v-if="!popupOpen"
        ref="searchBar"
        row="1"
        v-model="search"
        hint="Search"
        textFieldHintColor="white"
        class="bg-gray text-white"
      ></SearchBar>
      <ListView row="2" class="bg-gray-dark" for="note in filteredNotes">
        <v-template>
          <Note @openDelete="openPopup" @openEdit="openPopup" :note="note" />
        </v-template>
      </ListView>
      <DeletePopup
        v-if="del.open"
        row="2"
        :note="del.note"
        @deleteNote="deleteNote"
        @close="closePopup" />
      <EditPopup
        v-if="edit.open"
        row="2"
        :note="edit.note"
        @saveNote="saveNote"
        @close="closePopup" />
      <ExportPopup
        v-if="exp.open"
        row="2"
        :notes="notes"
        @close="closePopup" />
      <ImportPopup
        v-if="imp.open"
        row="2"
        :notes="notes"
        @importNotes="importNotes"
        @close="closePopup" />
    </GridLayout>
  </Page>
</template>

<script>
import TitleBar from "./TitleBar";
import DeletePopup from "./DeletePopup";
import EditPopup from "./EditPopup";
import ExportPopup from "./ExportPopup";
import ImportPopup from "./ImportPopup";
import Note from "./Note";
import * as utils from "utils/utils"
export default {
  components: {
    TitleBar,
    DeletePopup,
    EditPopup,
    ExportPopup,
    ImportPopup,
    Note
  },
  data() {
    return {
      search: "",
      notes: [],
      del: {
        open: false,
        note: {
          title: "",
          content: ""
        }
      },
      edit: {
        open: false,
        note: {
          title: "",
          content: ""
        }
      },
      exp: {
        open: false
      },
      imp: {
        open: false
      }
    }
  },
  computed: {
    filteredNotes() {
      let regex = new RegExp(this.search, "i"); // Regex for case insensitivity
      return this.notes.filter(note => note.title.match(regex));
    },
    popupOpen() {
      return this.del.open || this.edit.open || this.exp.open || this.imp.open;
    }
  },
  methods: {
    addNote(title, content) {
      this.notes.push({
        title: title,
        content: content
      });
      this.sortNotes();
    },
    deleteNote(note) {
      for (let i = 0; i < this.notes.length; i++) {
        if (this.notes[i] === note) {
          this.notes.splice(i, 1);
          if (this.notes.length === 0) {
            this.addNote('***PLACEHOLDER***', 'New Note');
          }
          break;
        }
      }
    },
    importNotes(notes) {
      for (let i = 0; i < notes.length; i++) {
        this.addNote(notes[i].title, notes[i].content);
      }
    },
    openPopup(type, note = null) {
      switch(type) {
        case "delete":
          this.del.note = note;
          this.del.open = true;
          break;
        case "edit":
          this.edit.note = note;
          this.edit.open = true;
          break;
        case "export":
          this.$refs.searchBar.nativeView.dismissSoftInput();
          this.exp.open = true;
          break;
        case "import":
          this.imp.open = true;
          break;
      }
    },
    closePopup() {
      this.del.open = false;
      this.edit.open = false;
      this.exp.open = false;
      this.imp.open = false;
    },
    saveNote(oldNote, newNote) {
      for (let i = 0; i < this.notes.length; i++) {
        if (this.notes[i] === oldNote) {
          this.notes[i] = newNote;
          break;
        }
      }
      this.sortNotes();
    },
    sortNotes() {
      this.notes = this.notes.sort((a, b) => (a.title > b.title) ? 1 : -1);
    }
  },
  created() {
    if (this.notes.length === 0) {
      this.addNote('***PLACEHOLDER***', 'New Note');
    }
    this.sortNotes();
  }
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 20sp;
  font-weight: 900;
  margin-left: 16dp;
}
.btn-action {
  width: 50dp;
  margin: 0;
  margin-right: 8dp;
  font-size: 16sp;
  font-weight: 900;
}
</style>
