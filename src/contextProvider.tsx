import {createContext, ReactNode, useContext, useState} from "react";
import CreateProjectDialog from "./components/createProjectDialog.tsx";

export interface ModalContextType {
    isModalVisible: boolean;
    showCreate: boolean;
    showCreateModal: () => void;
    showModal: () => void;
    hideModal: () => void;

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
            hideModal: () => {}
        }
    }
    return context;
};


export default function ModalProvider({children}: { children: ReactNode }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const showModal = () => setIsModalVisible(true);
    const showCreateModal = () => setShowCreate(true);

    const hideModal = () => {
        setShowCreate(false);
        setIsModalVisible(false);
    };

    return <ModalContext.Provider value={{isModalVisible, showModal, hideModal, showCreate, showCreateModal}}>
        {children}
        <CreateProjectDialog/>
    </ModalContext.Provider>;
}