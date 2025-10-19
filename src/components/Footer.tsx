export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="footer flex items-center justify-center p-4 bg-gray-800 text-white">
        <p className="footer__text">©{year}  e-commerce | Curso React js Talento Tech | By Hernan Nuñez West</p>
        </footer>
    );
}