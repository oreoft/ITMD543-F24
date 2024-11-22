// components/Footer.tsx
const Footer = ({
                    email = "meetyifan@gmail.com",
                    companyName = "VolunteerHub"
                }) => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-50 py-4 border-t">
            <div className="container mx-auto px-4 flex justify-center items-center text-gray-600 text-sm">
                <span>© {currentYear} {companyName}· USA</span>
                <span className="mx-2">·</span>
                <a
                    href={`mailto:${email}`}
                    className="hover:text-gray-900 cursor-pointer"
                >
                    Contact Us
                </a>
            </div>
        </footer>
    );
};

export default Footer;
