// import theme style scss file
import 'styles/theme.scss';
import Providers from "./providers";

export const metadata = {
    title: 'Tire management system',
    description: 'Tire management system',
    keywords: 'Tire management system, Tyre management system, ERP, Tire ERP'
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className='bg-light'>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
