import {useParams} from "react-router-dom";
import {Avatar, Button, Card, Dropdown, Table, Tag, Typography} from "antd";
import {generateFakeProjects} from "../data/projectData.ts";
import {EyeOutlined, FlagOutlined, PlusOutlined} from "@ant-design/icons";
import {useModal} from "../contextProvider.tsx";
import {formatDate} from "date-fns";
import {useState} from "react";
import KanbanBoard from "../components/KanbanBoard.tsx";

const {Title, Text} = Typography;
export default function ManageProject() {
    const id = useParams()[ 'id' ];
    const [currentView, setCurrentView] = useState<string>('table');
    const context = useModal();
    const project = generateFakeProjects(2)[ 0 ]
    console.log(id);
    return <div className={'p-4'}>
        <div className={'flex justify-between items-end mb-4'}>
            <div>
                <Title level={5} className={'leading-none m-0 text-gray'}>Manage Project</Title>
                <Title level={1} className={'leading-none m-0'}>{project.name}</Title>
            </div>
            <Button icon={<PlusOutlined/>} type={'primary'} size={'large'} onClick={() => context.showCreateModal()}>New
                Project</Button>
        </div>
        <div className={'grid grid-cols-5 gap-8'}>
            <Card className={'rounded-xl '}>
                <div className={'space-y-4'}>
                    <div>
                        <img src={project.poster} alt={''} className={'aspect-square w-full object-cover rounded-xl'}/>
                    </div>
                    <div>
                        <Title level={5}>Project Name</Title>
                        <Text>{project.name}</Text>
                    </div>
                    <div>
                        <Title level={5}>Status</Title>
                        <Text>{<Tag className={''}
                                    color={project.status === 'Completed' ? 'success' : project.status === 'Review' ? 'processing' : project.status === 'Running' ? 'purple' : 'default'}>{project.status}</Tag>
                        }</Text>
                    </div>
                    <div>
                        <Title level={5}>Description</Title>
                        <Text>{project.description}</Text>
                    </div>
                    <div>
                        <Title level={5}>Start Date</Title>
                        <Text>{formatDate(project.startDate, 'EEEE dd MMMM yyyy')}</Text>
                    </div>

                    <div>
                        <Title level={5}>End Date</Title>
                        <Text>{formatDate(project.endDate, 'EEEE dd MMMM yyyy')}</Text>
                    </div>

                </div>
            </Card>
            <Card className={'col-span-4'}>
                <div className={'flex justify-between items-end mb-4'}>
                    <Title level={3}>Tasks</Title>
                    <Dropdown menu={{
                        items: [
                            {
                                key: 'Timeline',
                                label: 'Timeline View',
                                onClick: () => setCurrentView('Timeline')
                            },
                            {
                                key: 'Table',
                                label: 'Table View',
                                onClick: () => setCurrentView('Table')
                            },
                            {
                                key: 'Kanban',
                                label: 'Kanban View',
                                onClick: () => setCurrentView('Kanban')
                            }
                        ]
                    }} >
                        <Button icon={<EyeOutlined/>}>Change View</Button>
                    </Dropdown>
                </div>
                <div>
                    {currentView === 'Kanban' && <KanbanBoard tasks={project.tasks}/>}
                    {currentView === 'Table' && <Table dataSource={project.tasks} columns={[
                        {
                            title: 'Task',
                            dataIndex: 'name',
                            key: 'name',
                        },
                        {
                            title: 'Assignee',
                            dataIndex: 'assignee',
                            key: 'assignee',
                            render: (item: string[]) => (
                                <div>{item.map((value: string, index: number) => <Avatar key={index}
                                                                                         src={value}/>)}</div>)
                        },
                        {
                            title: 'Priority',
                            dataIndex: 'priority',
                            key: 'priority',
                            render: (text) => (
                                <Button danger={text === 'Urgent'} type={`${text === 'Medium' ? 'primary' : 'default'}`}
                                        ghost={text === 'Medium'}
                                        size={'small'}
                                        className={`${text === 'Low' ? 'text-gray border-gray' : ''} rounded-full`}
                                        icon={<FlagOutlined/>}>{text}</Button>)
                        },
                        {
                            title: 'Start Date',
                            dataIndex: 'startDate',
                            key: 'startDate',
                            render: (text) => formatDate(text, 'dd MMM yyyy')
                        },
                        {
                            title: 'Due Date',
                            dataIndex: 'dueDate',
                            key: 'dueDate',
                            render: (text) => formatDate(text, 'dd MMM yyyy')
                        },
                        {
                            title: 'Status',
                            dataIndex: 'status',
                            key: 'status',
                            render: (text) => (<Tag
                                color={text === 'Pending' ? 'orange' : text === 'Completed' ? 'green' : text === 'Review' ? 'blue' : 'purple'}>{text}</Tag>)
                        },
                    ]} onRow={(row) => {
                        return {
                            onClick: () => {
                                context.showTaskDrawer(row)
                            }
                        }
                    }}/>}
                </div>

            </Card>
        </div>

    </div>
}