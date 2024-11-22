import {useEffect} from "react";
import {useSidebar} from "../contexts/SidebarContext";

const Contact = () => {
    const {openSidebar, closeSidebar} = useSidebar();

    useEffect(() => {
        openSidebar();

        return () => {
            closeSidebar();
        };
    }, []);

    return <div>Contact</div>
}


export default Contact;
