import {
    EditorView,
    keymap,
    highlightActiveLine,
    placeholder,
} from 'https://esm.sh/@codemirror/view';
import { EditorState } from 'https://esm.sh/@codemirror/state';
import {
    indentWithTab,
    history,
    defaultKeymap,
    historyKeymap,
} from 'https://esm.sh/@codemirror/commands';
import {
    indentOnInput,
    bracketMatching,
    foldGutter,
    foldKeymap,
} from 'https://esm.sh/@codemirror/language';
import { markdown } from 'https://esm.sh/@codemirror/lang-markdown';
import { vim } from 'https://esm.sh/@replit/codemirror-vim';

// Initialize CodeMirror in the #editor div without line numbers
const cmDiv = document.getElementById('editor');
const editor = new EditorView({
    state: EditorState.create({
        doc: '',
        extensions: [
            EditorView.lineWrapping,
            placeholder(
                "The perfect opening line doesn't exist. Start imperfectly..."
            ),
            vim(),
            history(),
            foldGutter(),
            indentOnInput(),
            bracketMatching(),
            keymap.of([
                ...defaultKeymap,
                ...historyKeymap,
                ...foldKeymap,
                indentWithTab,
            ]),
            markdown(),
        ],
    }),
    parent: cmDiv,
});

editor.focus();
