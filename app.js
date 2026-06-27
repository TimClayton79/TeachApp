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
    tile.addEventListener('click', () => {
        tile.classList.toggle('absent');
        
        // In the future, this is where you'd trigger your pop-up menu 
        // for Rewards/Sanctions instead of just toggling absence.
        console.log(`${student.name} clicked. Current classes: ${tile.className}`);
    });

    gridContainer.appendChild(tile);
});
