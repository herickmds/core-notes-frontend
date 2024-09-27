import Navbar from './Navbar'

export default function Layout({ children }: any) {
  return (
    <>
      <Navbar />
      <main className="container">
        {children}
      </main>
    </>
  )
}
