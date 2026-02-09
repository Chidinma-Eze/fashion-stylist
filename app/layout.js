import '../styles/globals.css'

export const metadata = {
  title: 'Virtual Fashion Stylist'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen p-6 md:p-12">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </body>
    </html>
  )
}
