import { EditorView, basicSetup } from 'https://esm.sh/@codemirror/basic-setup';
import { EditorState } from 'https://esm.sh/@codemirror/state';
import { markdown } from 'https://esm.sh/@codemirror/lang-markdown';

// Initialize CodeMirror in the #editor div
const cmDiv = document.getElementById('editor');
let editor = new EditorView({
    state: EditorState.create({
        doc: '',
        extensions: [basicSetup, markdown()],
    }),
    parent: cmDiv,
});

editor.dispatch = function (tr) {
    EditorView.prototype.dispatch.call(this, tr);
    updateCounts();
}.bind(editor);
