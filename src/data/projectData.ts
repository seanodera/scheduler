import { faker } from '@faker-js/faker';
import {Project, Task} from "./types.tsx";



export function generateFakeProjects(count: number): Project[] {
    const projects: Project[] = [];

    for (let i = 0; i < count; i++) {
        const tasks:Task[] = Array.from({length: 20}, () => ({
            id: faker.string.alphanumeric(8),
            name: faker.word.noun(),
            projectId: faker.string.alphanumeric(8),
            creator: faker.string.alphanumeric(10),
            startDate: faker.date.recent().toISOString(),
            dueDate: faker.date.future().toISOString(),
            assignee: [faker.string.alphanumeric(10)],
            priority: ['Urgent', 'Medium', 'Low'].at(faker.number.int({min: 0, max: 2})) || 'Low',
            status: ['Pending', 'Completed', 'Review', 'In Progress'].at(faker.number.int({min: 0, max: 3})) || 'Pending',
            completed: false,
            description: faker.lorem.paragraph(),
            attachment: [
                {
                    type: ['PDF', 'XLS', 'DOCX', 'IMG'].at(faker.number.int({min: 0, max: 3})) || 'IMG',
                    name: faker.word.noun(),
                    url: faker.internet.url(),
                }
            ],
            subTasks: [
                {
                    name: faker.word.noun(),
                    description: faker.lorem.paragraph(),
                    createdAt: faker.date.recent(),
                    completed: false,
                }
            ]
        }));
        const project: Project = {
            id: faker.string.alphanumeric(8),
            poster: faker.image.urlPicsumPhotos({blur:0, grayscale: false}),
            name: faker.commerce.productName(),
            description: faker.lorem.sentences(),
            assignee: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => faker.person.fullName()),
            startDate: faker.date.recent().toISOString(),
            endDate: faker.date.future().toISOString(),
            tasks: tasks,
            status: 'Completed',
            links: {
                name: faker.internet.domainName(),
                url: faker.internet.url(),
            }
        };

        projects.push(project);
    }

    return projects;
}

// Generate and log 10 fake projects
const fakeProjects = generateFakeProjects(10);
console.log(fakeProjects);