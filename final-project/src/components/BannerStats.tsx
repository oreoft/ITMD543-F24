import {FaHandshake, FaProjectDiagram, FaRulerCombined, FaStar} from 'react-icons/fa';
import {IconType} from 'react-icons';

interface StatsCardProps {
    icon: IconType;
    value: string;
    label: string;
}

interface Content {
    stats: {
        volunteers: string;
        projects: string;
        satisfaction: string;
        hours: string;
    }
}

interface BannerStatsProps {
    content: Content;
}

const StatsCard = ({icon: Icon, value, label}: StatsCardProps) => {
    return (
        <div className="text-center">
            <div className="text-white mb-2 md:mb-4 flex justify-center">
                <Icon className="w-6 h-6 md:w-10 md:h-10"/>
            </div>
            <div className="text-2xl md:text-4xl font-bold text-white mb-1 md:mb-2">{value}</div>
            <div className="text-white text-sm md:text-base">{label}</div>
        </div>
    );
};

const BannerStats = ({content}: BannerStatsProps) => {
    const statsData: StatsCardProps[] = [
        {
            icon: FaHandshake,
            value: "500+",
            label: content.stats.volunteers
        },
        {
            icon: FaProjectDiagram,
            value: "100+",
            label: content.stats.projects
        },
        {
            icon: FaStar,
            value: "98%",
            label: content.stats.satisfaction
        },
        {
            icon: FaRulerCombined,
            value: "10000+",
            label: content.stats.hours
        }
    ];

    return (
        <div className="grid grid-cols-2 md:flex md:justify-between items-center gap-6 md:gap-0 max-w-6xl mx-auto">
            {statsData.map((stat, index) => (
                <StatsCard
                    key={index}
                    icon={stat.icon}
                    value={stat.value}
                    label={stat.label}
                />
            ))}
        </div>
    );
};

export default BannerStats;
