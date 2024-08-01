import React, {useState} from 'react';
import {Button, Form, Input} from "antd";
import { rules } from '../utils/rules';
import {useDispatch} from "react-redux";
import {authActionCreators} from "../store/reducer/auth/action-creators";
import {AppDispatch} from "../store";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useAction} from "../hooks/useAction";

const LoginForm = () => {

    //const dispatch = useDispatch<AppDispatch>();
    const {isAuth, error, isLoading} = useTypedSelector(state => state.authReducer);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const {login} = useAction();

    const submit = () => {

        //dispatch(authActionCreators.login(username, password));
        //action-creqator login с уже привязанным dispatch через польз хук useAction
        login(username, password);
        setUsername('');
        setPassword('');
    }
    return (
        <Form
            onFinish={submit}
        >

            <Form.Item
                label="Username"
                name="username"
                rules={[rules.required('Please input your name!')]}
            >
                <Input
                    value = {username}
                    onChange={e => setUsername(e.target.value)}
                />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[rules.required('Please input your password!')]}
            >
                <Input.Password
                    value = {password}
                    onChange = {e => setPassword(e.target.value)}
                />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                {
                    error && <div style={{color: 'red'}}>{error}</div>
                }
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;