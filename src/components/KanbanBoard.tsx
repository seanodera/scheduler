import {Avatar, Card, Typography} from "antd";
import {Task} from "../data/types.tsx";
import {useEffect, useState} from "react";
import {faker} from "@faker-js/faker";

const {Paragraph} = Typography;
export default function KanbanBoard({tasks}: { tasks: Task[] }) {
    const [sortedTasks, setSortedTasks] = useState<
        { [ key: string ]: Task[], 'Pending': Task[], 'Completed': Task[], 'Review': Task[], 'In Progress': Task[] }
    >({
        'Pending': [],
        'Completed': [],
        'Review': [],
        'In Progress': [],
    });
    useEffect(() => {
        const sortedTasks: {
            [ key: string ]: Task[],
            'Pending': Task[],
            'Completed': Task[],
            'Review': Task[],
            'In Progress': Task[]
        } = {
            'Pending': tasks.filter(task => task.status === 'Pending'),
            'Completed': tasks.filter(task => task.status === 'Completed'),
            'Review': tasks.filter(task => task.status === 'Review'),
            'In Progress': tasks.filter(task => task.status === 'In Progress'),
        };
        setSortedTasks(sortedTasks);
    },[tasks])

    return <div className={'grid grid-cols-4 gap-4'}>
        <Card title={'In Progress'} classNames={{header: 'bg-blue-500', body: 'space-y-4'}}>
            {sortedTasks[ "In Progress" ].map((task: Task, index) => (<KanbanItem key={index} task={task}/>))}
        </Card>
        <Card className={''} title={'Pending'} classNames={{header: 'bg-amber-500', body: 'space-y-4'}}>
            {sortedTasks.Pending.map((task: Task, index) => (<KanbanItem key={index} task={task}/>))}
        </Card>
        <Card title={'Review'} classNames={{header: 'bg-primary', body: 'space-y-4'}}>
            {sortedTasks.Review.map((task: Task, index) => (<KanbanItem key={index} task={task}/>))}
        </Card>
        <Card title={'Completed'} classNames={{header: 'bg-green-500', body: 'space-y-4'}}>
            {sortedTasks.Completed.map((task: Task, index) => (<KanbanItem key={index} task={task}/>))}
        </Card>

    </div>
}

export function KanbanItem({task}: { task: Task }) {
    return <Card
        className={`p-0 ${task.status === 'Pending' ? 'border-amber-500' : task.status === 'Completed' ? 'border-green-500' : task.status === 'Review' ? 'border-primary' : 'border-blue-500'}`}
        title={task.name} classNames={{header: 'border-0 pb-0', body: 'pt-0'}}>
        <Paragraph ellipsis={{rows: 2}}>{task.description}</Paragraph>
        <div className={'flex gap-2'}>{task.assignee.map((assignee) => <Avatar alt={assignee} shape={'circle'}
                                                                               src={faker.image.urlPicsumPhotos()}/>)}</div>

    </Card>
}