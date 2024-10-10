import {createContext, ReactNode, useContext, useState} from "react";
import CreateProjectDialog from "./components/createProjectDialog.tsx";
import {Task} from "./data/types.tsx";
import TaskDrawer from "./components/Tasks/taskDrawer.tsx";

export interface ModalContextType {
    isModalVisible: boolean;
    showCreate: boolean;
    showCreateModal: () => void;
    showModal: () => void;
    hideModal: () => void;
    showTaskDrawer: (task:Task) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        return {
            isModalVisible: false,
            showCreate: false,
            showCreateModal: () => {},
            showModal: () => {},
            hideModal: () => {},
            showTaskDrawer: () => {}
        }
    }
    return context;
};


export default function ModalProvider({children}: { children: ReactNode }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [currentTask, setCurrentTask] = useState<Task>();
    const [openTaskDrawer, setOpenTaskDrawer] = useState<boolean>(false);
    const showModal = () => setIsModalVisible(true);
    const showCreateModal = () => setShowCreate(true);
    const showTaskDrawer = (task:Task) => {
        setCurrentTask(task);
        setOpenTaskDrawer(true);
    };
    const hideModal = () => {
        setShowCreate(false);
        setIsModalVisible(false);
    };

    return <ModalContext.Provider value={{isModalVisible, showModal, hideModal, showCreate, showCreateModal, showTaskDrawer}}>
        {children}
        {currentTask && <TaskDrawer task={currentTask} open={openTaskDrawer} setOpen={(value) => setOpenTaskDrawer(value)}/>}
        <CreateProjectDialog/>
    </ModalContext.Provider>;
}