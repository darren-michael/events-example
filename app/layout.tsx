import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../css/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';



import styles from "../css/component-styles/layout.module.css"


import { UserProvider } from '@auth0/nextjs-auth0/client';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Darren Michael Code Examples',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* <UserProvider> */}
        <body className={inter.className} >
          <div style={{minHeight: "700px"}}>
            {children}
          </div>
          <footer className={styles.footer}></footer> 
        </body>
      {/* </UserProvider> */}
      
    </html>
  )
}
