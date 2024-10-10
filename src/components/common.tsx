import {ReactNode} from "react";
import {Typography} from "antd";

const {Text} = Typography;
export function Pill({active, children,onClick}: { active: boolean, children: ReactNode, onClick?: () => void }) {
    return <span onClick={onClick}
        className={`flex h-max rounded-full text-center py-1 px-4  cursor-pointer ${active ? 'bg-primary bg-opacity-20 text-primary' : 'bg-light text-gray'}`} >
        <Text className={active ? 'text-primary' : 'text-gray'}>{children}</Text>
    </span>
}
