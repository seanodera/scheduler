import {ReactNode} from "react";
import {Typography} from "antd";

const {Text} = Typography;
export function Pill({active, children}: { active: boolean, children: ReactNode }) {
    return <span
        className={`flex h-max rounded-full text-center py-1 px-4  ${active ? 'bg-primary bg-opacity-20 text-primary' : 'bg-light text-gray'}`}>
        <Text className={active ? 'text-primary' : 'text-gray'}>{children}</Text>
    </span>
}
