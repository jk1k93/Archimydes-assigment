import React, { useCallback } from 'react';
import { Card, Input, Form, Button, Switch } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions';
import { AUTHENTICATED } from '../../actions/types';

function Login({ history }) {

    const dispatch = useDispatch();

    const user = useSelector(state => state.user);

    const handleSubmit = useCallback(async (values) => {
        try {
            const response = await login(values);
            dispatch({ type: AUTHENTICATED, payload: response.data });
            history.push('/story/list');
        } catch (err) {
            console.log(err);
        }
    }, [dispatch, history]);

    if (user.is_authenticated) {
        history.push('/story/list');
        return null;
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="site-card-border-less-wrapper w-1/3" style={{ minWidth: "350px" }}>
                <Card title="Login" bordered={false}>
                    <Form
                        onFinish={handleSubmit}
                    >
                        <Form.Item
                            name="email"
                            rules={[{
                                required: true,
                                message: 'Please enter your email!'
                            }, {
                                type: 'email',
                                message: 'Please enter a valid email'
                            }]}
                        >
                            <Input
                                placeholder="Email"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{
                                required: true,
                                message: 'Please enter password!'
                            }]}
                        >
                            <Input
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item
                            name="isAdmin"
                            labelAlign="left"
                            label="Login as admin"
                        >
                            <Switch />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                            >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    );
}

export default Login;