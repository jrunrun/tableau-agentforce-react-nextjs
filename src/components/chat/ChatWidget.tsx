'use client';

import { useState } from 'react';
import { ChatWindow, ChatMinimized, ChatErrorBoundary } from './components';

export default function ChatWidget() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      {!isChatOpen && <ChatMinimized onMaximize={() => setIsChatOpen(true)} />}
      {isChatOpen && (
        <ChatErrorBoundary>
          <ChatWindow
            agentRole="AI Concierge"
            onClose={() => setIsChatOpen(false)}
          />
        </ChatErrorBoundary>
      )}
    </>
  );
} 