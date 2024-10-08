import {formatDate} from "date-fns";
import {Button, Card, Dropdown, Typography} from "antd";
import {
    CalendarOutlined,
    DownOutlined,
    EyeInvisibleOutlined,
    FilterOutlined, MoreOutlined,
    PlusOutlined,
    UpOutlined
} from "@ant-design/icons";
import PerformancePanel from "../components/home/PerformancePanel.tsx";
import * as console from "node:console";

const { Title} = Typography;
export default function Home() {
    const today = new Date();
    return <div className={'px-4'}>
        <div className={'flex justify-between items-end py-8'}>
            <div>
                <Title level={5} className={'leading-none m-0 text-gray'}>{formatDate(today, 'EEEE, dd MMMM yyyy')}</Title>
                <h1 className={'font-medium text-5xl'}>Welcome Back, Sean </h1>
            </div>
            <Button icon={<PlusOutlined/>} type={'primary'} size={'large'}>New Project</Button>
        </div>
        <div className={'grid grid-cols-3 gap-8'}>
            <PerformancePanel/>
            <div className={'col-span-2 grid grid-cols-2 gap-4'}>
                <Card>
                    <div className={'flex justify-between'}>
                        <Title level={3}>Project Timeline</Title>
                        <Dropdown menu={{
                            items: [
                                {
                                    key: 0,
                                    icon: <CalendarOutlined/>,
                                    label: 'Today',
                                    onClick: () => console.log('Today clicked')
                                }
                            ]
                        }}>
                            <Button className={'bg-light text-gray'} type={'default'} iconPosition={'end'} icon={<CalendarOutlined/>}>Day View</Button>
                        </Dropdown>
                    </div>
                </Card>
                <Card>
                    <div className={'flex justify-between'}>
                        <Title level={3}>LeaderBoard</Title>
                        <Button className={'bg-light text-gray'} type={'default'} iconPosition={'end'} icon={<DownOutlined/>}>See All</Button>

                    </div>
                </Card>
                <Card className={'col-span-2'}>
                    <div className={'flex justify-between items-center'}>
                        <Title level={3}>Recommended Tasks</Title>
                        <div className={'flex gap-2'}>
                            <Button className={'bg-light text-gray'} icon={<EyeInvisibleOutlined/>}>Hide</Button>
                            <Button className={'bg-light text-gray'} icon={<UpOutlined/>}>Sort</Button>
                            <Button className={'bg-light text-gray'} icon={<FilterOutlined/>}>Filter</Button>
                            <Button className={'bg-light text-gray'} icon={<MoreOutlined/>}/>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    </div>
}

