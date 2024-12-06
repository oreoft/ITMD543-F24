import React from "react";
import WhyChooseUs from "../components/WhyChooseUs";
import Impact from "../components/Impact";
import BannerStats from "../components/BannerStats";

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
            {/* title */}
            <div className="text-center mb-10 md:mb-20">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">{content.title}</h1>
                <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
                    {content.description}
                </p>
            </div>

            {/* Statistical data section */}
            <div className="bg-orange-400 rounded-lg p-4 md:p-8">
                <BannerStats content={content}/>
            </div>

            {/* WhyChooseUs */}
            <div className="relative w-screen left-[50%] right-[50%] mx-[-50vw] bg-[#f5fbff] mt-10 md:mt-20">
                <WhyChooseUs></WhyChooseUs>
            </div>

            {/* Impact */}
            <div>
                <Impact></Impact>
            </div>
        </div>
    );
}

export default Home;
