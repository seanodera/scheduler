import { faker } from '@faker-js/faker';

export interface Attachment {
    type: 'PDF' | 'XLS' | 'DOCX' | 'IMG'|string;
    name: string;
    url: string;
}

export interface SubTask {
    name: string;
    description: string;
    createdAt: string | Date;
    completed: boolean;
}

export interface Task {
    id: string;
    projectId: string;
    name: string;
    creator: string;
    startDate: string | Date;
    dueDate: string | Date;
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
    id: faker.string.alphanumeric(8),
    name: faker.word.noun(),
    projectId: faker.string.alphanumeric(8),
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

export interface Project {
    id: string;
    poster: string;
    name: string;
    description: string;
    assignee: string[];
    startDate: string;
    endDate: string;
    tasks: Task[];
    status: 'Running' | 'Completed' | 'Review' | 'In Progress';
    links: {
        name: string;
        url: string;
    };
}
export {task};