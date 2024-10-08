import { Link, useLocation } from "react-router-dom";
import { Avatar, Button, Input } from "antd";
import { NotificationOutlined, SearchOutlined } from "@ant-design/icons";
import { faker } from "@faker-js/faker";

export default function Navbar() {
    return (
        <div className="flex justify-between items-center px-4 py-2">
            <div className="flex items-center gap-4">
                <Avatar src="/vite.svg" shape="circle" size="large" />
                <NavLink to="/">Dashboard</NavLink>
                <NavLink to="/my-tasks">My Tasks</NavLink>
                <NavLink to="/report">Report</NavLink>
            </div>
            <div className="flex items-center gap-4">
                <Input
                    className="rounded-xl py-2 px-2"
                    prefix={<SearchOutlined />}
                    placeholder="Search here"
                />
                <Button
                    size="large"
                    shape="circle"
                    icon={<NotificationOutlined />}
                />
                <Avatar src={faker.image.avatar()} className={'aspect-square bg-cover object-cover w-16 h-max'} size="large" shape="circle" />
            </div>
        </div>
    );
}

export function NavLink({ to, children }: { to: string, children: React.ReactNode }) {
    const path = useLocation().pathname;

    return (
        <Link
            to={to}
            className={`font-medium group ${path === to ? 'text-dark active' : 'text-gray'}`}
        >
            {children}
            <div className={`hidden md:block h-0.5 bg-dark ${path === to ? 'scale-100': 'scale-x-0'} group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out `} />
        </Link>
    );
}