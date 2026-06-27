const supabaseUrl = 'YOUR_URL_HERE';
const supabaseKey = 'YOUR_ANON_KEY_HERE';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function fetchSummary() {
    // 1. Fetch all logs
    const { data, error } = await supabase.from('event_logs').select('*');
    if (error) { console.error(error); return; }

    // 2. Tally the data
    const summary = {};
    data.forEach(log => {
        if (!summary[log.student_name]) {
            summary[log.student_name] = {};
        }
        summary[log.student_name][log.action] = (summary[log.student_name][log.action] || 0) + 1;
    });

    // 3. Render the summary
    const tbody = document.getElementById('report-body');
    tbody.innerHTML = ''; // Clear existing

    Object.keys(summary).forEach(student => {
        const actions = summary[student];
        const row = `<tr>
            <td><strong>${student}</strong></td>
            <td>${actions.reward || 0}</td>
            <td>${actions.toilet_out || 0}</td>
            <td>${actions.sanction || 0}</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

fetchSummary();
