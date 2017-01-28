(() => {
    const formElement = document.getElementById('form');
    const inputElement = document.getElementById('input');
    const tasksElement = document.getElementById('tasks');
    const tasks = [];

    let lastCheckedTaskIndex = -1;
    let isShiftPressed = false;

    class Task {

        constructor(task, index) {
            const listItem = document.createElement('li');
            const label = document.createElement('label');
            const text = document.createElement('span');

            this.checkbox = document.createElement('input');
            this.checkbox.type = 'checkbox';

            text.textContent = task;

            label.appendChild(this.checkbox);
            label.appendChild(text);

            listItem.appendChild(label);
            tasksElement.appendChild(listItem);

            this.checkbox.onchange = () => {
                if (isShiftPressed && lastCheckedTaskIndex >= 0) {
                    const min = Math.min(lastCheckedTaskIndex, index);
                    const max = Math.max(lastCheckedTaskIndex, index);

                    for (let i = min; i <= max; i += 1) {
                        if (i !== index) {
                            tasks[i].check(this.checkbox.checked);
                        }
                    }
                }

                lastCheckedTaskIndex = index;
            };
        }

        check(state) {
            this.checkbox.checked = state;
        }
    }

    inputElement.focus();

    formElement.onsubmit = (e) => {
        e.preventDefault();
        tasks.push(new Task(inputElement.value, tasks.length));
        inputElement.value = '';
    };

    function setIsShiftPressed(e) {
        isShiftPressed = e.shiftKey;
    }

    document.onkeydown = setIsShiftPressed;
    document.onkeyup = setIsShiftPressed;
})();
