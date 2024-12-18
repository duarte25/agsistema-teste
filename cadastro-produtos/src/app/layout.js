import ReactQueryProvider from "@/providers/reactQueryProvider.js";
import "./globals.css"; 

export const metadata = {
  title: "Produtos",
  description: "WebSite Cadastrar Produtos"
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" suppressHydrationWarning={true}>
       <ReactQueryProvider>
        <body className='bg-zinc-500'>
          {children}
        </body>
       </ReactQueryProvider>
    </html>
  );
}