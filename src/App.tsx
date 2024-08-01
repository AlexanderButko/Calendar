import { Layout } from 'antd';
import React, {useEffect} from 'react';
import './App.css';
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar";
import {useAction} from "./hooks/useAction";
import {IUser} from "./models/user";

function App() {
  const {setUser, setIsAuth} = useAction()
    useEffect(() => {
        //Эмуляция сохранения залогированного состояния (чтобы не разлогиниваться при перезагрузке)
            if (localStorage.getItem("isAuth")){
                setUser({username: localStorage.getItem("username")} as IUser );
                setIsAuth(true)
            }
        }, [])
  return (
    <div className="App">
        <Layout>
            <Navbar/>
            <Layout.Content>
                <AppRouter/>
            </Layout.Content>
        </Layout>
    </div>
  );
}

export default App;
