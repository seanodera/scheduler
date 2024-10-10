//TODO: Kanban
import {Button, Card, Typography} from "antd";
import {useState} from "react";
import {PlusOutlined} from "@ant-design/icons";
import {faker} from "@faker-js/faker";
import {Task} from "../data/types.tsx";
import {Pill} from "../components/common.tsx";
import {useModal} from "../contextProvider.tsx";
import KanbanBoard from "../components/Tasks/KanbanBoard.tsx";
import TaskTable from "../components/Tasks/TabledTasks.tsx";

const {Title, Text} = Typography;
export default function MyTasksScreen() {
    const [currentView, setCurrentView] = useState<string>('Table');

    const context = useModal();
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

    return <div className={'px-4'}>
        <div className={'flex justify-between py-4 items-end'}>
            <div className={'flex gap-2 items-end'}>
                <div className={'me-4'}>
                    <Title level={1} className={'leading-none m-0'}>My Tasks</Title>
                    <Text type={'secondary'} className={'text-lg font-light'}>Monitor all your tasks here</Text>
                </div>
                <Pill active={true} onClick={() => setCurrentView('Table')}>Table</Pill>
                <Pill active={false} onClick={() =>  setCurrentView('Kanban')}>Kanban</Pill>
                <Pill active={false} onClick={() => setCurrentView('Timeline')}>Calendar</Pill>
            </div>
            <Button icon={<PlusOutlined/>} type={'primary'} size={'large'} onClick={() => context.showCreateModal()}>New Project</Button>
        </div>
        <Card className={'mt-2'}>
            {currentView === 'Kanban' && <KanbanBoard tasks={tasks}/>}
            {currentView === 'Table' && <TaskTable tasks={tasks}/>}
                </Card>

    </div>
}


