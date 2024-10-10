import {useParams} from "react-router-dom";
import {Button, Card, Dropdown, Tag, Typography} from "antd";
import {generateFakeProjects} from "../data/projectData.ts";
import {EyeOutlined, PlusOutlined} from "@ant-design/icons";
import {useModal} from "../contextProvider.tsx";
import {formatDate} from "date-fns";
import {useState} from "react";
import KanbanBoard from "../components/Tasks/KanbanBoard.tsx";
import TaskTable from "../components/Tasks/TabledTasks.tsx";

const {Title, Text} = Typography;
export default function ManageProject() {
    const id = useParams()[ 'id' ];
    const [currentView, setCurrentView] = useState<string>('Table');
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
                    {currentView === 'Table' && <TaskTable tasks={project.tasks}/>}
                </div>

            </Card>
        </div>

    </div>
}