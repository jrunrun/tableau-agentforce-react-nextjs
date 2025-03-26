import Sidebar from '@/components/Sidebar';
import ChatWidget from '@/components/chat/ChatWidget';

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <main className="ml-16">
        {children}
      </main>
      <ChatWidget />
    </>
  );
} 