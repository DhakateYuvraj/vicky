// import theme style scss file
import Link from 'next/link';
import 'styles/theme.scss';

export const metadata = {
    title: 'Tire management system',
    description: 'Tire management system',
    keywords: 'Tire management system, Tyre management system, ERP, Tire ERP'
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className='bg-light'>
                {children}
            </body>
        </html>
    )
}
