// app.js

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('DOMContentLoaded', () => {
    console.log("Script is running..."); // ADD THIS LINE
    
    // ... rest of your code ...
});

    // 1. Mock Data 
    const students = [
        { id: 1, name: "Alice", col: 1, row: 1 },
        { id: 2, name: "Bob", col: 2, row: 1 },
        { id: 3, name: "Charlie", col: 3, row: 1 },
        { id: 4, name: "David", col: 1, row: 2 }
    ];

    // 2. Grab DOM elements
    const gridContainer = document.getElementById('classroom-grid');
    const modal = document.getElementById('action-modal');
    const modalStudentName = document.getElementById('modal-student-name');
    const closeModalBtn = document.getElementById('close-modal');
    const actionButtons = document.querySelectorAll('.btn-action');
    const modeSelector = document.getElementById('mode-selector'); 

    let currentSelectedStudent = null;
    let currentSelectedTile = null; 

    // 3. Generate Grid
    students.forEach(student => {
        const tile = document.createElement('div');
        tile.classList.add('student-tile');
        tile.innerText = student.name;
        
        tile.style.gridColumn = student.col;
        tile.style.gridRow = student.row;

        // 4. The "Brain" (Click Logic)
        tile.addEventListener('click', () => {
            const mode = modeSelector.value;

            if (mode === 'seating') {
                currentSelectedStudent = student;
                currentSelectedTile = tile;
                modalStudentName.innerText = student.name;
                modal.classList.remove('hidden');
            } else if (mode === 'knowshow') {
                if (!tile.classList.contains('know')) {
                    tile.classList.add('know');
                } else if (!tile.classList.contains('show')) {
                    tile.classList.remove('know');
                    tile.classList.add('show');
                } else {
                    tile.classList.remove('show');
                }
            }
        });

        gridContainer.appendChild(tile);
    });

    // 5. Close Modal Logic
    closeModalBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // 6. Action Button Logic
    actionButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (!currentSelectedStudent) return;
            
            const actionType = e.target.getAttribute('data-action');
            
            // Database Logging
            supabase
                .from('event_logs')
                .insert([{ 
                    student_name: currentSelectedStudent.name, 
                    action: actionType 
                }])
                .then(() => console.log("Logged!"));

            if (actionType === 'toilet_out') currentSelectedTile.classList.add('toilet');

            const originalText = button.innerText;
            button.innerText = "✅ Logged!";
            button.style.backgroundColor = "#d4edda"; 
            
            setTimeout(() => {
                button.innerText = originalText;
                button.style.backgroundColor = ""; 
            }, 500); 
        });
    });
});
