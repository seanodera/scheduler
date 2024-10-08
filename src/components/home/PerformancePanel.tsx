import {Avatar, Button, Card, Dropdown, Typography} from "antd";
import {CalendarOutlined, ClockCircleOutlined, DesktopOutlined, DownOutlined, FlagOutlined} from "@ant-design/icons";
import {formatDate} from "date-fns";
const { Title, Text } = Typography;
export default function PerformancePanel(){
    const today = new Date();
    return <Card classNames={
        {
            body: 'px-3'
        }
    }>
        <div className={'grid grid-cols-2 gap-4'}>
            <div className={'rounded-xl space-y-8 p-4 bg-green-500 bg-opacity-5'}>
                <div className={'flex gap-3'}>
                    <Avatar icon={<FlagOutlined/>} size={'large'} shape={'square'}
                            className={'bg-white text-green-500  border-solid border-gray'}/>
                    <div>
                        <Text type={'secondary'} className={''}>Priority Tasks</Text>
                        <Title level={4} className={'leading-none m-0 mt-1 font-semibold'}>19/25</Title>
                    </div>
                </div>
                <h3 className={'text-gray text-lg'}>75% Done!</h3>
            </div>
            <div className={'rounded-xl space-y-8 p-4  bg-blue-500 bg-opacity-5'}>
                <div className={'flex gap-3'}>
                    <Avatar icon={<DesktopOutlined/>} size={'large'} shape={'square'}
                            className={'bg-white text-blue-500 border-solid border-gray'}/>
                    <div>
                        <Text type={'secondary'} className={''}>Upcoming Tasks</Text>
                        <Title level={4} className={'leading-none m-0 mt-1 font-semibold'}>12/20</Title>
                    </div>
                </div>
                <h3 className={'text-gray text-lg'}>50% Done!</h3>
            </div>
            <div className={'rounded-xl space-y-8 p-4  bg-gray bg-opacity-5'}>
                <div className={'flex items-center gap-3'}>
                    <Avatar icon={<ClockCircleOutlined/>} size={'large'} shape={'square'}
                            className={'bg-white text-primary border-solid border-gray'}/>
                    <div>
                        <Text type={'secondary'} className={''}>Overdue Tasks</Text>
                        <Title level={4} className={'leading-none m-0 mt-1 font-semibold'}>02/30</Title>
                    </div>
                </div>
                <h3 className={'text-gray text-lg'}>90% Done!</h3>
            </div>
            <div className={'rounded-xl space-y-8 p-4 bg-amber-500 bg-opacity-5'}>
                <div className={'flex items-center gap-3'}>
                    <Avatar icon={<CalendarOutlined/>} size={'large'} shape={'square'}
                            className={'bg-white text-amber-500 border-solid border-gray'}/>
                    <div>
                        <Text type={'secondary'} className={''}>Upcoming Tasks</Text>
                        <Title level={4} className={'leading-none m-0 mt-1 font-semibold'}>26/30</Title>
                    </div>
                </div>
                <h3 className={'text-gray text-lg'}>60% Done!</h3>
            </div>
        </div>

        <div className={'my-4'}>
            <div className={'flex justify-between py-4'}>
                <Title level={3}>Performance</Title>
                <Dropdown  className={'bg-light text-gray'}  menu={{
                    items: [
                        {
                            label: 'Daily',
                            key: 'Daily',
                        },
                {
                    label: 'Monthly',
                    key: 'Monthly',
                },
                {
                    label: 'Weekly',
                    key: 'Weekly',
                },
                {
                    label: 'Yearly',
                    key: 'Yearly',
                }
                    ]}}>
                    <Button className={'bg-light text-gray'} iconPosition={'end'} icon={<DownOutlined/>}>Weekly</Button>
                </Dropdown>
            </div>
            <div className={'flex justify-between items-end'}>
                <div>
                    <Title level={5} className={'text-gray font-medium leading-none m-0 mb-2'}>Time Worked</Title>
                    <Title level={2} className={'font-semibold leading-none m-0'}>16Hr 30min</Title>
                </div>
                <Title level={4} className={' leading-none m-0'}>54.34%</Title>
            </div>
            <div className={'aspect-video w-full bg-gray my-4'}></div>
            <div className={'flex justify-between'}>
                <Text className={' font-medium'}>
                    {formatDate(today, 'dd MMM, yyyy')}
                </Text>
                <Text type={'secondary'} className={' text-gray font-medium'}>
                    630 hr 52 min - Total time
                </Text>
            </div>
        </div>
    </Card>
}