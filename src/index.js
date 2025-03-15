document.addEventListener('DOMContentLoaded', function () {
  // Select DOM elements
  const taskForm = document.getElementById('create-task-form');
  const taskInput = document.getElementById('new-task-description');
  const taskList = document.getElementById('tasks'); // Assuming there's a <ul id="tasks"></ul> in the HTML

  // Dynamically add priority dropdown and additional input field
  const priorityDropdown = document.createElement('select');
  priorityDropdown.innerHTML = `
      <option value="high">High</option>
      <option value="medium">Medium</option>
      <option value="low">Low</option>
  `;
  priorityDropdown.id = 'priority-dropdown';

  const additionalInput = document.createElement('input');
  additionalInput.type = 'text';
  additionalInput.id = 'additional-input';
  additionalInput.placeholder = 'Additional info (e.g., user, due date)';

  taskForm.insertBefore(priorityDropdown, taskInput.nextSibling);
  taskForm.insertBefore(additionalInput, taskForm.querySelector('input[type="submit"]'));

  // Add task event listener
  taskForm.addEventListener('submit', function (e) {
      e.preventDefault(); // Prevent form submission
      const taskText = taskInput.value;
      const priority = priorityDropdown.value;
      const additionalInfo = additionalInput.value;

      if (taskText.trim() === '') {
          alert('Please enter a task!'); // Validate input
          return;
      }

      addTask(taskText, priority, additionalInfo); // Add task
      taskInput.value = ''; // Clear input fields
      additionalInput.value = '';
  });

  // Function to add a task
  function addTask(taskText, priority, additionalInfo) {
      // Create a new list item
      const li = document.createElement('li');
      li.textContent = `${taskText} (${additionalInfo})`;
      li.style.color = getPriorityColor(priority); // Set text color based on priority

      // Add a delete button to the task
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', function () {
          taskList.removeChild(li); // Remove task
      });

      // Add an edit button to the task
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', function () {
          editTask(li, taskText, priority, additionalInfo); // Edit task
      });

      li.appendChild(deleteButton);
      li.appendChild(editButton);
      taskList.appendChild(li); // Append task to list
  }

  // Function to get priority color
  function getPriorityColor(priority) {
      switch (priority) {
          case 'high':
              return 'red';
          case 'medium':
              return 'yellow';
          case 'low':
              return 'green';
          default:
              return 'black';
      }
  }

  // Function to edit a task
  function editTask(li, taskText, priority, additionalInfo) {
      const newTaskText = prompt('Edit task description:', taskText);
      const newPriority = prompt('Edit priority (high, medium, low):', priority);
      const newAdditionalInfo = prompt('Edit additional info:', additionalInfo);

      if (newTaskText !== null && newPriority !== null && newAdditionalInfo !== null) {
          li.textContent = `${newTaskText} (${newAdditionalInfo})`;
          li.style.color = getPriorityColor(newPriority); // Update text color
      }
  }

  // Function to sort tasks by priority
  function sortTasks(order = 'asc') {
      const tasks = Array.from(taskList.querySelectorAll('li'));
      tasks.sort((a, b) => {
          const priorityA = getPriorityValue(a.style.color);
          const priorityB = getPriorityValue(b.style.color);
          return order === 'asc' ? priorityA - priorityB : priorityB - priorityA;
      });

      // Clear the task list and re-add sorted tasks
      taskList.innerHTML = '';
      tasks.forEach(task => taskList.appendChild(task));
  }

  // Function to get priority value
  function getPriorityValue(color) {
      switch (color) {
          case 'red':
              return 3; // High priority
          case 'yellow':
              return 2; // Medium priority
          case 'green':
              return 1; // Low priority
          default:
              return 0;
      }
  }

  // Add sorting buttons dynamically
  const sortAscButton = document.createElement('button');
  sortAscButton.textContent = 'Sort by Priority (Asc)';
  sortAscButton.addEventListener('click', () => sortTasks('asc'));

  const sortDescButton = document.createElement('button');
  sortDescButton.textContent = 'Sort by Priority (Desc)';
  sortDescButton.addEventListener('click', () => sortTasks('desc'));

  taskForm.insertBefore(sortAscButton, taskForm.querySelector('input[type="submit"]'));
  taskForm.insertBefore(sortDescButton, taskForm.querySelector('input[type="submit"]'));
});