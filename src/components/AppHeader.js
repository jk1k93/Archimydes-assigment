import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import {
    LogoutOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LOGOUT } from '../actions/types';

function AppHeader(props) {

    const { Header } = Layout;

    const [activeTab, setActiveTab] = useState('1');

    const dispatch = useDispatch();

    const user = useSelector(state => state.user);

    const logoutUser = () => {
        dispatch({ type: LOGOUT });
    }

    useEffect(() => {
        const pathName = window.location.pathname;
        if (pathName === '/story/create') {
            setActiveTab('2');
        }
    }, []);

    return (
        <Header className="flex justify-between">
            <Menu theme="dark" mode="horizontal" selectedKeys={[activeTab]}>
                <Menu.Item onClick={setActiveTab.bind(this, '1')} key="1">
                    <Link to="/story/list">List</Link>
                </Menu.Item>
                {user.details.role === 'user' ? (
                    <Menu.Item onClick={setActiveTab.bind(this, '2')} key="2">
                        <Link to="/story/create">Create Story</Link>
                    </Menu.Item>
                ) : null}
            </Menu>
            <div className="logout-btn">
                <Link onClick={logoutUser} to="/"><LogoutOutlined /> Logout</Link>
            </div>
        </Header>
    )
}

export default AppHeader;