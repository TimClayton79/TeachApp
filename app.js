// app.js
document.addEventListener('DOMContentLoaded', () => {

    // 1. Data - 20 Students
    const students = [
        { id: 1, name: "Alice", col: 1, row: 1 },
        { id: 2, name: "Bob", col: 2, row: 1 },
        { id: 3, name: "Charlie", col: 3, row: 1 },
        { id: 4, name: "David", col: 1, row: 2 },
        { id: 5, name: "Eve", col: 2, row: 2 },
        { id: 6, name: "Frank", col: 3, row: 2 },
        { id: 7, name: "Grace", col: 1, row: 3 },
        { id: 8, name: "Hank", col: 2, row: 3 },
        { id: 9, name: "Ivy", col: 3, row: 3 },
        { id: 10, name: "Jack", col: 1, row: 4 },
        { id: 11, name: "Kara", col: 2, row: 4 },
        { id: 12, name: "Liam", col: 3, row: 4 },
        { id: 13, name: "Mia", col: 1, row: 5 },
        { id: 14, name: "Noah", col: 2, row: 5 },
        { id: 15, name: "Olivia", col: 3, row: 5 },
        { id: 16, name: "Paul", col: 1, row: 6 },
        { id: 17, name: "Quinn", col: 2, row: 6 },
        { id: 18, name: "Riley", col: 3, row: 6 },
        { id: 19, name: "Sam", col: 1, row: 7 },
        { id: 20, name: "Tina", col: 2, row: 7 }
    ];

    // 2. Grab DOM elements
    const gridContainer = document.getElementById('classroom-grid');
    const modal = document.getElementById('action-modal');
    const modalStudentName = document.getElementById('modal-student-name');
    const modeSelector = document.getElementById('mode-selector');

    let currentSelectedStudent = null;
    let currentSelectedTile = null;

    // 3. Generate Grid
    if (gridContainer) {
        students.forEach(student => {
            const tile = document.createElement('div');
            tile.classList.add('student-tile');
            tile.innerText = student.name;
            
            // Set Grid Position
            tile.style.gridColumn = student.col;
            tile.style.gridRow = student.row;
            
            tile.addEventListener('click', () => {
                const mode = modeSelector ? modeSelector.value : 'seating';

                if (mode === 'seating' && modal) {
                    currentSelectedStudent = student;
                    currentSelectedTile = tile;
                    modalStudentName.innerText = student.name;
                    modal.classList.remove('hidden');
                } else if (mode === 'knowshow') {
                    tile.classList.toggle('know');
                    if (!tile.classList.contains('know')) tile.classList.toggle('show');
                }
            });
            gridContainer.appendChild(tile);
        });
    }

    // 4. Modal Action Buttons (Supabase Logging)
    document.querySelectorAll('.btn-action').forEach(button => {
        button.addEventListener('click', async (e) => {
            if (!currentSelectedStudent) return;
            
            const action = e.target.getAttribute('data-action');
            
            // Database Logging
            const { error } = await supabase.from('event_logs').insert([{ 
                student_name: currentSelectedStudent.name, 
                action: action 
            }]);

            if (!error) {
                if (action === 'toilet_out') currentSelectedTile.classList.add('toilet');
                modal.classList.add('hidden');
            } else {
                console.error("Database Error:", error);
            }
        });
    });

    // 5. Modal Close
    document.getElementById('close-modal')?.addEventListener('click', () => {
        modal.classList.add('hidden');
    });
});
