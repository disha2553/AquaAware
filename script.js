const questions = [
    {
        title: "How many people live in your household?",
        type: "Number",
        data: {
            min: 1,
            default: 1,
        },
    },
    {
        title: "How often does your household cook meals per day?",
        type: "MultipleChoice",
        data: {
            choices: {
                "Once a day": 1,
                "Twice a day": 2,
                "Three times a day": 3,
            },
        },
    },
    {
        title: "How often does your household bathe per day?",
        type: "MultipleChoice",
        data: {
            choices: {
                "Once a day": 1,
                "Twice a day": 2,
            },
        },
    },
    {
        title: "How often does your household wash clothes per week?",
        type: "MultipleChoice",
        data: {
            choices: {
                "Once a week": 1/7,
                "Twice a week": 2/7,
                "Everyday": 1,
            },
        },
    },
    {
        title: "How often does your household wash utensils per day?",
        type: "MultipleChoice",
        data: {
            choices: {
                "Once a day": 1,
                "Twice a day": 2,
                "Thrice a day": 3,
            },
        },
    },
    {
        title: "How often does your household clean the house per week?",
        type: "MultipleChoice",
        data: {
            choices: {
                "Once a week": 1/7,
                "Twice a week": 2/7,
                "Everyday": 1,
            },
        },
    },
    {
        title: "How often does your household flush the toilet per person per day?",
        type: "MultipleChoice",
        data: {
            choices: {
                "1-2 times": 1.5,
                "3-5 times": 4,
                "6+ times": 8,
            },
        },
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('waterUsageForm');

    questions.forEach((question, index) => {
        const formGroup = document.createElement('div');
        formGroup.classList.add('form-group');

        const label = document.createElement('label');
        label.textContent = question.title;
        formGroup.appendChild(label);

        if (question.type === 'MultipleChoice') {
            const select = document.createElement('select');
            select.classList.add('form-control');
            select.name = `question${index}`;
            
            Object.entries(question.data.choices).forEach(([key, value]) => {
                const option = document.createElement('option');
                option.value = value;
                option.textContent = key;
                select.appendChild(option);
            });

            formGroup.appendChild(select);
        } else if (question.type === 'Number') {
            const input = document.createElement('input');
            input.type = 'number';
            input.classList.add('form-control');
            input.name = `question${index}`;
            input.min = question.data.min;
            input.value = question.data.default;

            formGroup.appendChild(input);
        }

        form.appendChild(formGroup);
    });
});

function calculateUsage() {
    const form = document.getElementById('waterUsageForm');
    const formData = new FormData(form);
    let values = [];

    questions.forEach((question, index) => {
        let value = formData.get(`question${index}`);
        if (question.type === 'Number') {
            value = parseInt(value);
        } else if (question.type === 'MultipleChoice') {
            value = parseFloat(value);
        }
        values.push(value);
    });

    const people = values[0];
    let totalUsage = calculateTotalUsage(values, people);

    const result = document.getElementById('result');
    result.innerHTML = `Estimated water usage: ${totalUsage.toFixed(2)} litres per day.`;
}

function calculateTotalUsage(values, people) {
    let totalUsage = 0;

    totalUsage += people * 5 * values[1]; // Cooking
    totalUsage += people * 55 * values[2]; // Bathing
    totalUsage += people * 20 * values[3]; // Cloth washing
    totalUsage += people * 10 * values[4]; // Utensils washing
    totalUsage += people * 10 * values[5]; // House cleaning
    totalUsage += people * 30 * values[6]; // Flushing

    return totalUsage;
}
