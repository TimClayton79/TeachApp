// app.js

// 1. Mock Data (This would eventually come from your database)
const students = [
    { id: 1, name: "Alice", col: 1, row: 1 },
    { id: 2, name: "Bob", col: 2, row: 1 },
    { id: 3, name: "Charlie", col: 3, row: 1 },
    { id: 4, name: "David", col: 1, row: 2 },
    // ... add more to fill the grid
];

const gridContainer = document.getElementById('classroom-grid');

// 2. Generate the Grid
students.forEach(student => {
    // Create the tile
    const tile = document.createElement('div');
    tile.classList.add('student-tile');
    tile.innerText = student.name;
    
    // Place it exactly in the CSS Grid coordinates
    tile.style.gridColumn = student.col;
    tile.style.gridRow = student.row;

    // 3. Add Interaction (Single Tap to toggle absence for the register)
    // Grab modal elements
const modal = document.getElementById('action-modal');
const modalStudentName = document.getElementById('modal-student-name');
const closeModalBtn = document.getElementById('close-modal');
const actionButtons = document.querySelectorAll('.btn-action');

// Variable to keep track of who we just clicked
let currentSelectedStudent = null;
let currentSelectedTile = null; // To change the tile color visually

// ... (Your existing student array and grid generation code) ...

students.forEach(student => {
    const tile = document.createElement('div');
    tile.classList.add('student-tile');
    tile.innerText = student.name;
    tile.style.gridColumn = student.col;
    tile.style.gridRow = student.row;

    // UPDATE: Open the modal instead of just toggling absent
    tile.addEventListener('click', () => {
        currentSelectedStudent = student;
        currentSelectedTile = tile;
        
        // Update modal title
        modalStudentName.innerText = student.name;
        
        // Show modal
        modal.classList.remove('hidden');
    });

    gridContainer.appendChild(tile);
});

// Close Modal Logic
closeModalBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
});

// Action Button Logic
actionButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const actionType = e.target.getAttribute('data-action');
        
        // 1. Log the action (For now, just to the console)
        console.log(`LOGGED: ${currentSelectedStudent.name} - ${actionType}`);

        // 2. Visual feedback on the tile
        if (actionType === 'toilet_out') {
            currentSelectedTile.classList.add('toilet');
        } else if (actionType === 'sanction') {
             // You might add a little red dot or border class here
        }

        // 3. Hide the modal instantly so you can get back to teaching
        modal.classList.add('hidden');
    });
});

    gridContainer.appendChild(tile);
});
