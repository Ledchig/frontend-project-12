import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup, Col, Dropdown } from "react-bootstrap";
import { setCurrentChannel } from "../slices/channelsSlice";
import { openModal } from "../slices/modalSliice";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";

const Channels = () => {
    const { channels, currentChannelId } = useSelector((state) => state.channelsInfo);
    const dispatch = useDispatch();

    const handleChangeChannel = (id) => () => {
        dispatch(setCurrentChannel({ id }));
    };

    const handleNewChannel = () => {
        dispatch(openModal({ type: "addChannel" }));
    };

    const handleRemoveChannnel = (id) => () => {
        console.log('remove');
        dispatch(openModal({ type: "removeChannel", id }));

    };

    const handleRenameChannel = (id) => () => {
        console.log('rename')
        dispatch(openModal({ type: 'renameChannel', id }));
    };

    return (
        <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                <b>Каналы</b>
                <Button
                    type="button"
                    variant="vertical"
                    className="p-0 text-primary"
                    onClick={handleNewChannel}
                >
                    <span>+</span>
                </Button>
            </div>
            <ul id="channels-list" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
                {channels.map(({ id, name, removable }) => removable
                ? (
                    <li className="nav-item w-100" key={id}>
                        <Dropdown as={ButtonGroup} className="d-flex">
                            <Button 
                                className="w-100 rounded-0 text-start text-truncate"
                                variant={currentChannelId === id ? 'secondary' : null}
                                key={id}
                                onClick={handleChangeChannel(id)}
                            >
                                <span className="me-1">#</span>
                                {name}
                            </Button>
                            <DropdownToggle split className="flex-grow-0" variant="group-veritical">
                                <span className="visually-hidden">
                                    Управление каналом
                                </span>
                            </DropdownToggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={handleRemoveChannnel(id)}>
                                    Удалить
                                </Dropdown.Item>
                                <Dropdown.Item onClick={handleRenameChannel(id)}>
                                    Переименовать
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                )
                : (
                    <li className="nav-item w-100" key={id}>
                        <Button 
                            className="w-100 rounded-0 text-start text-truncate"
                            variant={currentChannelId === id ? 'secondary' : null}
                            key={id}
                            onClick={handleChangeChannel(id)}
                        >
                            <span className="me-1">#</span>
                            {name}
                        </Button>
                    </li>
                ))}
            </ul>
        </Col>
    );
};

export default Channels;