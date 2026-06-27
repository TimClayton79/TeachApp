// app.js

document.addEventListener('DOMContentLoaded', () => {

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

    let currentSelectedStudent = null;
    let currentSelectedTile = null; 

    // ... under "Grab DOM elements"
    const gridContainer = document.getElementById('classroom-grid');
    // ... other elements ...

    // Add this line here:
    let currentMode = 'seating'; 

    // Add the toggle function right after your variable:
    document.getElementById('toggle-mode').addEventListener('click', () => {
        currentMode = (currentMode === 'seating') ? 'knowshow' : 'seating';
        alert("Mode switched to: " + currentMode); // Optional: quick confirmation
    });
    
    // 3. Generate Grid
    students.forEach(student => {
        const tile = document.createElement('div');
        tile.classList.add('student-tile');
        tile.innerText = student.name;
        
        tile.style.gridColumn = student.col;
        tile.style.gridRow = student.row;

       tile.addEventListener('click', () => {
    if (currentMode === 'seating') {
        // ... (Keep your original modal logic here) ...
    } else {
        // NEW: Know/Show logic
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

    // 4. Close Modal Logic
    closeModalBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // 5. Action Button Logic
    actionButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            
            // The Guard Clause
            if (!currentSelectedStudent) return;
            
            const actionType = e.target.getAttribute('data-action');
            console.log(`LOGGED: ${currentSelectedStudent.name} - ${actionType}`);

            if (actionType === 'toilet_out') {
                currentSelectedTile.classList.add('toilet');
            } 

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
