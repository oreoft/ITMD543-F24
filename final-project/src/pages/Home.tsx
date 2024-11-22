import React from "react";
import {FaHandshake, FaProjectDiagram, FaRulerCombined} from "react-icons/fa";
import WhyChooseUs from "../components/WhyChooseUs";
import {FaStar} from "react-icons/fa6";
import ChooseUs from "../components/ChooseUs";

interface ContentType {
    title: string;
    description: string;
    stats: {
        volunteers: string;
        projects: string;
        satisfaction: string;
        hours: string;
    }
}

const content: ContentType = {
    title: "IIT Community Volunteer Hub",
    description: "Based at Illinois Institute of Technology in Chicago, our volunteer platform connects IIT students with meaningful volunteer opportunities across the Chicago metropolitan area. We bridge the gap between passionate students and community needs, fostering positive change through dedicated service and cultural exchange. From local neighborhood initiatives to city-wide projects, we provide comprehensive support including project matching, volunteer coordination, and multilingual assistance.",
    stats: {
        volunteers: "Active Volunteers",
        projects: "Community Projects",
        satisfaction: "Community Satisfaction",
        hours: "Volunteer Hours"
    }
};

const Home: React.FC = () => {
    return (
        <div className="container mx-auto px-4 pt-28">
            {/* 标题和描述部分保持不变，内容已在上面更新 */}
            <div className="text-center mb-10 md:mb-20">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">{content.title}</h1>
                <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
                    {content.description}
                </p>
            </div>

            {/* 统计数据部分 */}
            <div className="bg-orange-400 rounded-lg p-4 md:p-8">
                <div
                    className="grid grid-cols-2 md:flex md:justify-between items-center gap-6 md:gap-0 max-w-6xl mx-auto">
                    {/* 志愿者数量 */}
                    <div className="text-center">
                        <div className="text-white mb-2 md:mb-4 flex justify-center">
                            <FaHandshake className="w-6 h-6 md:w-10 md:h-10"/>
                        </div>
                        <div className="text-2xl md:text-4xl font-bold text-white mb-1 md:mb-2">500+</div>
                        <div className="text-white text-sm md:text-base">{content.stats.volunteers}</div>
                    </div>

                    {/* 项目数量 */}
                    <div className="text-center">
                        <div className="text-white mb-2 md:mb-4 flex justify-center">
                            <FaProjectDiagram className="w-6 h-6 md:w-10 md:h-10"/>
                        </div>
                        <div className="text-2xl md:text-4xl font-bold text-white mb-1 md:mb-2">100+</div>
                        <div className="text-white text-sm md:text-base">{content.stats.projects}</div>
                    </div>

                    {/* 社区满意度 */}
                    <div className="text-center">
                        <div className="text-white mb-2 md:mb-4 flex justify-center">
                            <FaStar className="w-6 h-6 md:w-10 md:h-10"/>
                        </div>
                        <div className="text-2xl md:text-4xl font-bold text-white mb-1 md:mb-2">98%</div>
                        <div className="text-white text-sm md:text-base">{content.stats.satisfaction}</div>
                    </div>

                    {/* 志愿服务时长 */}
                    <div className="text-center">
                        <div className="text-white mb-2 md:mb-4 flex justify-center">
                            <FaRulerCombined className="w-6 h-6 md:w-10 md:h-10"/>
                        </div>
                        <div className="text-2xl md:text-4xl font-bold text-white mb-1 md:mb-2">10000+</div>
                        <div className="text-white text-sm md:text-base">{content.stats.hours}</div>
                    </div>
                </div>
            </div>

            {/* 其他部分保持不变 */}
            <div className="relative w-screen left-[50%] right-[50%] mx-[-50vw] bg-[#f5fbff] mt-10 md:mt-20">
                <WhyChooseUs></WhyChooseUs>
            </div>
            <div>
                <ChooseUs></ChooseUs>
            </div>
        </div>
    );
}

export default Home;
