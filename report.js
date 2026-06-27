const supabaseUrl = 'YOUR_URL_HERE';
const supabaseKey = 'YOUR_ANON_KEY_HERE';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function fetchLogs() {
    const { data, error } = await supabase
        .from('event_logs')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching logs:", error);
        return;
    }

    const tbody = document.getElementById('report-body');
    data.forEach(log => {
        const row = `<tr>
            <td>${log.student_name}</td>
            <td>${log.action}</td>
            <td>${new Date(log.created_at).toLocaleString()}</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

fetchLogs();
