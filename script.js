import { EditorView } from 'https://esm.sh/@codemirror/view';
import { EditorState } from 'https://esm.sh/@codemirror/state';
import { basicSetup } from 'https://esm.sh/codemirror';
import { markdown } from 'https://esm.sh/@codemirror/lang-markdown';

// Initialize CodeMirror in the #editor div
const cmDiv = document.getElementById('editor');
const editor = new EditorView({
    state: EditorState.create({
        doc: '',
        extensions: [basicSetup, markdown()],
    }),
    parent: cmDiv,
});
