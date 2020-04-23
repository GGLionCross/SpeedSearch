import Vue from "nativescript-vue";
import Main from "./components/Main";

new Vue({
  template: `
        <Frame>
            <Main />
        </Frame>`,

  components: {
    Main
  }
}).$start();
