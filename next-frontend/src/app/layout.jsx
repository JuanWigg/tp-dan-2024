import "./globals.css";
import Navbar from '@/components/Navbar';
export const metadata = {
  title: "DAN Frontend",
  description: "Creado para el TP de Desarrollo de Apps en la Nube",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className='bg-indigo-950'>
          {children}
        </div>
      </body>
    </html>
  );
}
