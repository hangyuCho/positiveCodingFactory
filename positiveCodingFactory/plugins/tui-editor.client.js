import 'codemirror/lib/codemirror.css'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/toastui-editor-viewer.css'


import Vue from 'vue'
import { Editor, Viewer } from '@toast-ui/vue-editor'

//import 'tui-editor/dist/tui-editor.css'
//import 'tui-editor/dist/tui-editor-contents.css'
//import 'codemirror/lib/codemirror.css'

Vue.component('editor', Editor);  // <TuiEditor />
Vue.component('viewer', Viewer); // <TuiViewer />