import React from 'react';
import {Layout, Row, Menu} from "antd";
import { useNavigate} from "react-router-dom";
import {Routes} from '../routes';
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../store";
import {authActionCreators} from "../store/reducer/auth/action-creators";
import {useAction} from "../hooks/useAction";



const Navbar = () => {
    const navigate = useNavigate();
    //const dispatch = useDispatch<AppDispatch>()
    const {isAuth, user} = useTypedSelector(state => state.authReducer);

    //action-creqator logout с уже привязанным dispatch через польз хук useAction
    const {logout} = useAction();

    return (
        <Layout.Header>
            <Row justify="end">
                {isAuth
                ?  <> <div style={{color: 'white'}}>{user.username}</div>
                        <Menu theme='dark' mode='horizontal' selectable={false} disabledOverflow>

                            <Menu.Item
                                key={1}
                                onClick={() => logout()}
                            >
                                Выйти
                            </Menu.Item>
                        </Menu>
                    </>

                : <Menu theme='dark' mode='horizontal' selectable={false} disabledOverflow>

                        <Menu.Item
                            key={1}
                            onClick={() => navigate(Routes.LOGIN)}
                        >
                            Логин
                        </Menu.Item>
                    </Menu>
                    }
            </Row>
        </Layout.Header>

    );
};

export default Navbar;