form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission for demo purposes

    // Get selected tasks and task counts
    const selectedTasks = Array.from(document.querySelectorAll('input[name="tasks"]:checked')).map(checkbox => checkbox.value);
    const taskCounts = selectedTasks.map(task => document.getElementById(`count-${task}`).value);

    // Get the email and employee ID
    const email = document.getElementById('email').value;
    const employeeId = document.getElementById('employeeId').value;

    // Log the data before sending it
    console.log({
        email: email,
        employeeId: employeeId,
        tasks: selectedTasks,
        taskCounts: taskCounts
    });

    // Prepare the data to send to the Google Apps Script
    const formData = new FormData();
    formData.append('email', email);
    formData.append('employeeId', employeeId);
    formData.append('tasks', selectedTasks);
    formData.append('taskCounts', taskCounts);

    // Send the form data to the Google Apps Script
    fetch('<YOUR_GOOGLE_APPS_SCRIPT_URL>', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(result => {
        alert('Form submitted successfully');
    })
    .catch(error => {
        alert('Error submitting the form');
        console.error(error);
    });
});

