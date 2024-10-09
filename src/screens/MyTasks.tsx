//TODO: Kanban
import {Avatar, Button, Card, Table, Tag, Typography} from "antd";
import {useState} from "react";
import {FlagOutlined, MoreOutlined, PlusOutlined} from "@ant-design/icons";
import {faker} from "@faker-js/faker";
import {formatDate} from "date-fns";
import {Task} from "../data/types.tsx";
import {Pill} from "../components/common.tsx";
import TaskDrawer from "../components/Tasks/taskDrawer.tsx";
import {useModal} from "../contextProvider.tsx";

const {Title, Text} = Typography;
export default function MyTasksScreen() {
    const [currentTask, setCurrentTask] = useState<Task>();
    const [open, setOpen] = useState<boolean>(false);
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
                <Pill active={true}>Table</Pill>
                <Pill active={false}>Kanban</Pill>
                <Pill active={false}>Calendar</Pill>
            </div>
            <Button icon={<PlusOutlined/>} type={'primary'} size={'large'} onClick={() => context.showCreateModal()}>New Project</Button>
        </div>
        <Card className={'mt-2'}>
            <Table bordered dataSource={tasks} columns={[
                {
                    title: 'Project Name',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: 'Assignee',
                    dataIndex: 'assignee',
                    key: 'assignee',
                    render: (item: string[]) => (
                        <div>{item.map((value: string, index: number) => <Avatar key={index} src={value}/>)}</div>)
                },
                {
                    title: 'Priority',
                    dataIndex: 'priority',
                    key: 'priority',
                    render: (text) => (
                        <Button danger={text === 'Urgent'} type={`${text === 'Medium' ? 'primary' : 'default'}`}
                                ghost={text === 'Medium'}

                                className={`${text === 'Low' ? 'text-gray border-gray' : ''} rounded-full`}
                                icon={<FlagOutlined/>}>{text}</Button>)
                },
                {
                    title: 'Start Date',
                    dataIndex: 'startDate',
                    key: 'startDate',
                    render: (text) => formatDate(text, 'dd MMMM yyyy')
                },
                {
                    title: 'Due Date',
                    dataIndex: 'dueDate',
                    key: 'dueDate',
                    render: (text) => formatDate(text, 'dd MMMM yyyy')
                },
                {
                    title: 'Status',
                    dataIndex: 'status',
                    key: 'status',
                    render: (text) => (<Tag
                        color={text === 'Pending' ? 'orange' : text === 'Completed' ? 'green' : text === 'Review' ? 'blue' : 'purple'}>{text}</Tag>)
                },
                {
                   key: 'action',
                    render: () => <Button type={'text'} icon={<MoreOutlined/>}/>
                }
            ]} onRow={(row) => {
                return {
                    onClick: () => {

                        setCurrentTask(row as Task)
                        setOpen(true)
                    }
                }
            }}/>
                </Card>
            {currentTask && <TaskDrawer task={currentTask} open={open} setOpen={(value) => setOpen(value)}/>}
    </div>
}


