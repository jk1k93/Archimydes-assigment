import React, { useCallback } from 'react';
import { Card, Input, Form, Button, Select } from 'antd';
import { create } from '../../actions';
import { STORY_CREATED } from '../../actions/types';
import { useDispatch, useSelector } from 'react-redux';

function Create({ history }) {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const handleSubmit = useCallback(async (values) => {
        try {
            const response = await create(values, user.details.token);
            dispatch({ type: STORY_CREATED, payload: response.data });
            history.push('/story/list');
        } catch (err) {
            console.log(err);
        }
    }, [dispatch, history, user.details])

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="site-card-border-less-wrapper w-1/3" style={{ minWidth: "350px" }}>
                <Card title="Create Story" bordered={false}>
                    <Form
                        onFinish={handleSubmit}
                    >
                        <Form.Item
                            name="summary"
                            rules={[{
                                required: true,
                                message: 'Please enter summary!'
                            }]}
                        >
                            <Input
                                placeholder="Summary"
                            />
                        </Form.Item>

                        <Form.Item
                            name="description"
                            rules={[{
                                required: true,
                                message: 'Please enter description!'
                            }]}
                        >
                            <Input.TextArea
                                placeholder="Description"
                            />
                        </Form.Item>

                        <Form.Item
                            name="type"
                            rules={[{
                                required: true,
                                message: 'Please select story type'
                            }]}
                        >
                            <Select placeholder="Type">
                                <Select.Option value="enhancement">Enhancement</Select.Option>
                                <Select.Option value="bugfix">Bug Fix</Select.Option>
                                <Select.Option value="development">Development</Select.Option>
                                <Select.Option value="QA">QA</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="complexity"
                            rules={[{
                                required: true,
                                message: 'Please select story complexity'
                            }]}
                        >
                            <Select placeholder="Complexity">
                                <Select.Option value="low">Low</Select.Option>
                                <Select.Option value="mid">Mid</Select.Option>
                                <Select.Option value="high">High</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="estimatedHrs"
                            rules={[{
                                required: true,
                                message: 'Please input estimated time (in hrs)'
                            }]}
                        >
                            <Input placeholder="Estimated time" type="number" />
                        </Form.Item>

                        <Form.Item
                            name="cost"
                            rules={[{
                                required: true,
                                message: 'Please input cost'
                            }]}
                        >
                            <Input placeholder="Cost" type="number" prefix="$" />
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
    )
}

export default Create;