import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Home from "./Home";
import Contact from "./Contact";
import Sidebar from "../components/Sidebar";
import {SidebarProvider} from "../contexts/SidebarContext";
import VolunteerActivities from "./Activities";

const IndexPage = () => {
    // 前台网站路由
    return (
        <div className="min-h-screen flex flex-col">
            <BrowserRouter>
                <SidebarProvider>
                    <Header/>
                    <main className="flex-grow">
                        <Sidebar/>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/activities" element={<VolunteerActivities/>}/>
                            <Route path="/contact" element={<Contact/>}/>

                            <Route
                                path="*"
                                element={<Navigate to={'/'} replace/>}
                            />
                        </Routes>
                    </main>
                    <Footer/>
                </SidebarProvider>
            </BrowserRouter>
        </div>
    );
}

export default IndexPage;
