//TODO: Kanban
import {Avatar, Button, Card, Drawer, Table, Tag, Typography} from "antd";
import {ReactNode} from "react";
import {FlagOutlined, PlusOutlined} from "@ant-design/icons";
import {faker} from "@faker-js/faker";
import {formatDate} from "date-fns";

const {Title, Text} = Typography;
export default function MyTasksScreen() {
    const tasks = Array.from({length: 20}, (_, index) => ({
        id: index,
        name: faker.word.noun(),
        creator: faker.string.alphanumeric(10),
        startDate: faker.date.recent().toISOString(),
        dueDate: faker.date.future().toISOString(),
        assignee: [faker.string.alphanumeric(10)],
        priority: ['Urgent', 'Medium', 'Low'].at(faker.number.int({min: 0, max: 2})),
        status: ['Pending', 'Completed', 'Review', 'In Progress'].at(faker.number.int({min: 0, max: 3})),
        completed: false,
        description: faker.lorem.paragraph(),
        attachment: [
            {
                type: ['PDF', 'XLS', 'DOCX', 'IMG'].at(faker.number.int({min: 0, max: 3})),
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
            <Button icon={<PlusOutlined/>} type={'primary'} size={'large'}>New Project</Button>
        </div>
        <Card className={'mt-2'}>
            <Table  dataSource={tasks} columns={[
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
                }
            ]}/>
        </Card>
    </div>
}


export function Pill({active, children}: { active: boolean, children: ReactNode }) {
    return <span
        className={`flex h-max rounded-full text-center py-1 px-4  ${active ? 'bg-primary bg-opacity-20 text-primary' : 'bg-light text-gray'}`}>
        <Text className={active ? 'text-primary' : 'text-gray'}>{children}</Text>
    </span>
}

export function TaskDrawer(){

    return <Drawer>

    </Drawer>
}