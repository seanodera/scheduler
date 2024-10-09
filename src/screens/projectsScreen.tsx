import {Button, Card, Tag, Typography} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useModal} from "../contextProvider.tsx";
import {generateFakeProjects} from "../data/projectData.ts";
import {formatDate} from "date-fns";
import {Project} from "../data/types.tsx";
import {Link} from "react-router-dom";


const {Title, Text, Paragraph} = Typography;
export default function ProjectsScreen() {
    const context = useModal();
    const projects = generateFakeProjects(5)
    return <div className={'px-4'}>
        <div className={'flex justify-between items-end py-4'}>
            <div>
                <Title level={1} className={'leading-none mb-2'}>Projects</Title>
                <Text type={'secondary'}>See All projects you have access to</Text>
            </div>
            <Button icon={<PlusOutlined/>} type={'primary'} size={'large'} onClick={() => context.showCreateModal()}>New
                Project</Button>
        </div>
        <div className={'grid grid-cols-4 pb-8 gap-6'}>
            {projects.map((project,index) => (<ProjectComponent key={index} project={project} />))}
        </div>
    </div>
}

export function ProjectComponent({project}:{project:Project}) {
    return <Link to={`/projects/${project.id}`}><Card className={'rounded-xl bg-gradient-spots w-full aspect-[2/3]'} cover={<img src={project.poster}
                                                                                                                                                            className={'aspect-square w-full object-cover rounded-t-xl'}
                                                                                                                                                            alt={''}/>}
                                                                                 key={project.id} classNames={{
        body: 'backdrop-blur bg-white bg-opacity-85 w-full aspect-[2]'
    }}>

        <Title level={4} className={'leading-none mb-2'}>{project.name}</Title>
        <Text className={'font-medium block'}>{formatDate(project.startDate,'dd MMM yyyy')}</Text>
        <Tag className={''} color={project.status === 'Completed'? 'success': project.status === 'Review'? 'processing': project.status === 'Running'? 'purple' : 'default'}>{project.status}</Tag>
        <Paragraph ellipsis={{
            rows: 3,
        }}>{project.description}</Paragraph>
    </Card></Link>
}