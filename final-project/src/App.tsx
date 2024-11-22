import React from 'react';
import './App.css';
import IndexPage from "./pages/IndexPage";
import {ConfigProvider} from "antd";

function App() {
    return (
        // 在 ConfigProvider 中设置
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#f97316',
                },
            }}>
            <div className="App">
                <IndexPage/>
            </div>
        </ConfigProvider>
    );
}

export default App;
