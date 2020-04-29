<template>
  <Page>
    <GridLayout rows="auto, auto, *">
      <TitleBar title="SpeedSearch">
        <StackLayout v-if="!popupOpen" orientation="horizontal">
          <Button text="+" @tap="addNote" class="btn-action text-accent" />
          <Button text="i" class="btn-action text-accent" />
          <Button text="e" @tap="openPopup('export')" class="btn-action text-accent" />
        </StackLayout>
      </TitleBar>
      <SearchBar
        v-if="!popupOpen"
        row="1"
        v-model="search"
        hint="Search"
        textFieldHintColor="white"
        class="bg-gray"
      ></SearchBar>
      <ListView row="2" class="bg-gray-dark" for="note in filteredNotes" height="100%">
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
    </GridLayout>
  </Page>
</template>

<script>
import TitleBar from "./TitleBar";
import DeletePopup from "./DeletePopup";
import EditPopup from "./EditPopup";
import ExportPopup from "./ExportPopup";
import Note from "./Note";
export default {
  components: {
    TitleBar,
    DeletePopup,
    EditPopup,
    ExportPopup,
    Note
  },
  data() {
    return {
      search: "",
      notes: [
        {
          title: "YouTube",
          content: "yt69"
        },
        {
          title: "***New Note***",
          content: "New Note"
        },
        {
          title: "Github",
          content: "git69"
        },
        {
          title: "Battle.net",
          content: "bnet69"
        },
        {
          title: "Facebook",
          content: "fb69"
        },
        {
          title: "Noom",
          content: "noom69"
        },
        {
          title: "Myspace",
          content: "my 69"
        },
        {
          title: "Crunchyroll",
          content: "croll69"
        },
        {
          title: "Primerica",
          content: "pri69"
        },
        {
          title: "Gmail",
          content: "gma69"
        },
        {
          title: "League of Legends",
          content: "lol69"
        },
        {
          title: "Steam",
          content: "steam69"
        },
        {
          title: "Netflix",
          content: "flix69"
        },
        {
          title: "Plex",
          content: "plex69"
        }
      ],
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
      }
    }
  },
  computed: {
    filteredNotes() {
      let regex = new RegExp(this.search, "i"); // Regex for case insensitivity
      return this.notes.filter(note => note.title.match(regex));
    },
    popupOpen() {
      return this.del.open || this.edit.open || this.exp.open;
    }
  },
  methods: {
    addNote() {
      this.notes.push({
        title: "***New Note***",
        content: "***New Note Content***"
      });
      this.sortNotes();
    },
    deleteNote(note) {
      for (let i = 0; i < this.notes.length; i++) {
        if (this.notes[i] === note) {
          this.notes.splice(i, 1);
          break;
        }
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
          this.exp.open = true;
          break;
      }
    },
    closePopup() {
      this.del.open = false;
      this.edit.open = false;
      this.exp.open = false;
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
  font-size: 20sp;
  font-weight: 900;
}
</style>
