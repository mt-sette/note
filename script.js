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
import { vim } from 'https://esm.sh/@replit/codemirror-vim';

// Load saved content from localStorage
const savedContent = localStorage.getItem('noteContent') || '';

// Initialize CodeMirror in the #editor div without line numbers
const cmDiv = document.getElementById('editor');
const editor = new EditorView({
    state: EditorState.create({
        doc: savedContent,
        extensions: [
            EditorView.lineWrapping,
            placeholder(
                "The perfect opening line doesn't exist. Start imperfectly..."
            ),
            vim(),
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
            // Auto-save to localStorage on content change
            EditorView.updateListener.of((update) => {
                if (update.docChanged) {
                    const content = update.state.doc.toString();
                    localStorage.setItem('noteContent', content);
                }
            }),
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
