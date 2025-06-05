import {
    EditorView,
    keymap,
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
    foldKeymap,
} from 'https://esm.sh/@codemirror/language';
import { markdown } from 'https://esm.sh/@codemirror/lang-markdown';

const cmDiv = document.getElementById('editor');
const editor = new EditorView({
    state: EditorState.create({
        doc: '',
        extensions: [
            EditorView.lineWrapping,
            placeholder('Start writing your notes here...'),
            history(),
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

// Save button functionality to download as markdown
document.getElementById('save-btn').addEventListener('click', () => {
    const content = editor.state.doc.toString();
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);

    // Create a temporary download link
    const a = document.createElement('a');
    a.href = url;

    // Generate filename with current date/time
    const now = new Date();
    const filename = `note-${now.getFullYear()}-${String(
        now.getMonth() + 1
    ).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}.md`;

    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

editor.focus();
