import {Avatar, Button, Table, Tag} from "antd";
import {FlagOutlined} from "@ant-design/icons";
import {formatDate} from "date-fns";
import {useModal} from "../../contextProvider.tsx";
import {Task} from "../../data/types.tsx";


export default function TaskTable({tasks}: {tasks: Task[]}) {
    const context = useModal();
    return <Table dataSource={tasks} columns={[
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
    }}/>
}