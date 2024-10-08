import { faker } from '@faker-js/faker';

interface Attachment {
    type: 'PDF' | 'XLS' | 'DOCX' | 'IMG'|string;
    name: string;
    url: string;
}

interface SubTask {
    name: string;
    description: string;
    createdAt: string;
    completed: boolean;
}

interface Task {
    id: number;
    name: string;
    creator: string;
    startDate: string;
    dueDate: string;
    assignee: string[];
    priority: 'Urgent' | 'Medium' | 'Low'|string;
    status: 'Pending' | 'Completed' | 'Review' | 'In Progress'|string;
    completed: boolean;
    description: string;
    attachment: Attachment[];
    subTasks: SubTask[];
}

// Example usage:
const task: Task = {
    id: faker.number.int(),
    name: faker.word.noun(),
    creator: faker.string.alphanumeric(10),
    startDate: faker.date.recent().toISOString(),
    dueDate: faker.date.future().toISOString(),
    assignee: [faker.string.alphanumeric(10)],
    priority: ['Urgent','Medium','Low'].at(faker.number.int({min: 0, max: 2}))!,
    status: ['Pending', 'Completed', 'Review', 'In Progress'].at(faker.number.int({min: 0, max: 3}))!,
    completed: false,
    description: faker.lorem.paragraph(),
    attachment: [
        {
            type: ['PDF', 'XLS', 'DOCX', 'IMG'].at(faker.number.int({min: 0, max: 3}))!,
            name: faker.word.noun(),
            url: faker.internet.url(),
        }
    ],
    subTasks: [
        {
            name: faker.word.noun(),
            description: faker.lorem.paragraph(),
            createdAt: faker.date.recent().toISOString(),
            completed: false,
        }
    ],
};

export {task};