import './globals.css'
import { ReactNode } from 'react'
 
export const metadata = {
  title: 'EngSoftComp LTDA',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className={`m-0 p-0 box-border`}>
          {children}
      </body>
    </html>
  )
}
