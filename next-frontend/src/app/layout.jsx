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
        <div className='bg-gray-900 h-screen'>
          <main> {children} </main> 
        </div>
      </body>
    </html>
  );
}
