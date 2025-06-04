const noteTextarea = document.getElementById('note');

// Character and word count
function updateCounts() {
    const text = noteTextarea.value;
    const charCount = text.length;
    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

    document.getElementById(
        'char-count'
    ).textContent = `${charCount} characters`;
    document.getElementById('word-count').textContent = `${wordCount} words`;
}

// Initialize counts
updateCounts();
