import {Button, Input, Modal} from "antd";
import {useModal} from "../contextProvider.tsx";

export default function CreateProjectDialog() {
    const context = useModal();
    const { hideModal, showCreate} = context;
    return (
        <Modal
            title="New Project"
            centered={true}
            open={showCreate}
            onOk={hideModal}
            onCancel={hideModal}
            onClose={hideModal}
            footer={null}
        >
            <div className={'space-y-4'}>
                <Input type="text" size={'large'} placeholder="Project Name"/>
                <Button type="primary" size={'large'}>Create Project</Button>
            </div>
        </Modal>
    );
}