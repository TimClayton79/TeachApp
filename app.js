// app.js
console.log("HELLO FROM APP.JS");

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM IS READY");

    // 1. Grab elements safely (using || null so they don't crash the script)
    const gridContainer = document.getElementById('classroom-grid');
    const modal = document.getElementById('action-modal') || null;
    const closeModalBtn = document.getElementById('close-modal') || null;
    const modeSelector = document.getElementById('mode-selector') || null;

    // 2. Simple Student Data
    const students = [
        { id: 1, name: "Alice", col: 1, row: 1 },
        { id: 2, name: "Bob", col: 2, row: 1 }
    ];

    // 3. Generate Grid (Only if container exists)
    if (gridContainer) {
        students.forEach(student => {
            const tile = document.createElement('div');
            tile.style.border = "1px solid black";
            tile.style.padding = "20px";
            tile.innerText = student.name;
            
            tile.addEventListener('click', () => {
                const mode = modeSelector ? modeSelector.value : 'seating';
                console.log("Clicked student. Mode is:", mode);
            });

            gridContainer.appendChild(tile);
        });
    }

    // 4. Modal Logic (Only if buttons exist)
    if (closeModalBtn && modal) {
        closeModalBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    }
});
