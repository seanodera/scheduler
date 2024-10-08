import {Task} from "../../data/types.tsx";
import {Avatar, Button, Drawer, Segmented, Tag, Typography} from "antd";
import {
    CalendarOutlined,
    ClockCircleOutlined,
    ExpandOutlined, FileImageOutlined, FlagOutlined,
    HourglassOutlined,
    UserOutlined,
    ZoomOutOutlined
} from "@ant-design/icons";
import {formatDate} from "date-fns";

const {Title, Text} = Typography;
export default function TaskDrawer({task, open, setOpen}: {
    task: Task,
    open: boolean,
    setOpen: (value: boolean) => void
}) {

    return <Drawer
        open={open}
        onClose={() => setOpen(false)}
        size={'large'}
        className={'bg-gradient-spots'}
        // rootClassName={'bg-gradient-spots'}
        classNames={{
            header: 'backdrop-blur bg-light bg-opacity-35',
            body: 'bg-gradient-spots backdrop-blur bg-light bg-opacity-35 p-0'

        }}
        title={<div className={'flex gap-2'}><Button icon={<ExpandOutlined className={'text-primary'}/>}>Expand</Button>
            <Button
                icon={<ZoomOutOutlined className={'text-primary'}/>}>Open Full</Button></div>}
    >
        <div className={'backdrop-blur bg-white bg-opacity-90 p-8 h-full'}>
            <Title level={2} className={'capitalize'}>{task.name}</Title>
            <div className={'grid grid-cols-3 gap-x-2 gap-y-6 items-center'}>
                <Title level={5} className={'text-gray font-normal leading-none m-0'}><CalendarOutlined/> Start
                    Date</Title>
                <Text
                    className={'col-span-2  leading-none m-0'}>{formatDate(task.startDate, 'EEEE dd MMMM yyyy')}</Text>
                <Title level={5}
                       className={'text-gray font-normal leading-none m-0'}><ClockCircleOutlined/> Status</Title>
                <Tag className={'col-span-2 w-max'}
                     color={task.status === 'Pending' ? 'orange' : task.status === 'Completed' ? 'green' : task.status === 'Review' ? 'blue' : 'purple'}>{task.status}</Tag>
                <Title level={5} className={'text-gray font-normal leading-none m-0'}><UserOutlined/> Assignee</Title>
                <Text
                    className={'col-span-2  leading-none m-0'}>{formatDate(task.startDate, 'EEEE dd MMMM yyyy')}</Text>
                <Title level={5}
                       className={'text-gray font-normal leading-none m-0'}><HourglassOutlined/> Priority</Title>
                <Button danger={task.priority === 'Urgent'}
                        type={`${task.priority === 'Medium' ? 'primary' : 'default'}`}
                        ghost={task.priority === 'Medium'}

                        className={`${task.priority === 'Low' ? 'text-gray border-gray' : ''} col-span-2 w-max rounded-full`}
                        icon={<FlagOutlined/>}>{task.priority}</Button>

            </div>
            <div className={'my-4'}>
                <Title level={5}>Description</Title>
                <Text>{task.description}</Text>
            </div>
            <div className={'my-4'}>
                <Title level={5}>Attachments</Title>
                <div className={'flex gap-2 mb-4'}>
                    {task.attachment.map((doc) => <div
                        className={'flex gap-1 max-w-60 border-light bg-light border rounded-lg p-2'}>
                        <Avatar icon={<FileImageOutlined className={''}/>} className={'aspect-square h-full'}
                                shape={'square'}/>
                        <div>
                            <Title level={5} className={'overflow-ellipsis leading-none m-0 mb-2'}>{doc.name}</Title>
                            <h5>2.4m | Download</h5>
                        </div>
                    </div>)}
                </div>
            </div>
            <Segmented block size={'large'} className={'bg-light'}
                       options={['Sub-Tasks', 'Activities', 'Files', 'Comments']}/>

        </div>
    </Drawer>
}