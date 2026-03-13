import Header from "../component/Header";
import { AuthCardProvider } from "../context/AuthCardContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div >
      <main >
        <AuthCardProvider>
          <Header/>
          {children}
        </AuthCardProvider>
      </main>
    </div>
  );
}