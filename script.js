document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('taskForm');
    const taskSelection = document.getElementById('taskSelection');
    const taskCounts = document.getElementById('taskCounts');
    const taskCountInputs = document.getElementById('taskCountInputs');
    const emailInput = document.getElementById('email');
    const employeeIdInput = document.getElementById('employeeId');

    // Simulate employee ID generation based on email
    emailInput.addEventListener('input', function() {
        const email = emailInput.value;
        if (email.includes('@')) {
            employeeIdInput.value = email.split('@')[0]; // Basic logic to use part of email as Employee ID
        } else {
            employeeIdInput.value = ''; // Clear if invalid email
        }
    });

    // Show count input fields when tasks are selected
    taskSelection.addEventListener('change', function() {
        const selectedTasks = Array.from(document.querySelectorAll('input[name="tasks"]:checked')).map(checkbox => checkbox.value);
        
        if (selectedTasks.length > 0) {
            taskCounts.style.display = 'block';
            taskCountInputs.innerHTML = ''; // Clear previous inputs
            selectedTasks.forEach(task => {
                const div = document.createElement('div');
                div.innerHTML = `
                    <label for="count-${task}">How many ${task} cases did you work on?</label>
                    <input type="number" id="count-${task}" name="count-${task}" min="1" required>
                `;
                taskCountInputs.appendChild(div);
            });
        } else {
            taskCounts.style.display = 'none'; // Hide task count inputs if no tasks are selected
        }
    });

    // Form validation and submission
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission for demo purposes

        const selectedTasks = Array.from(document.querySelectorAll('input[name="tasks"]:checked')).map(checkbox => checkbox.value);
        let isValid = true;

        selectedTasks.forEach(task => {
            const countInput = document.getElementById(`count-${task}`);
            if (!countInput.value || isNaN(countInput.value) || countInput.value < 1) {
                isValid = false;
                alert(`Please enter a valid number for ${task}`);
            }
        });

        if (isValid) {
            alert('Form Submitted Successfully!');
            // You can handle form submission here, e.g., send data to a server
        }
    });
});
