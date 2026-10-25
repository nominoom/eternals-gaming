import React, { createContext, useContext, useState, useEffect } from 'react';
import { ClerkProvider as OfficialClerkProvider } from '@clerk/react';

const ClerkAuthContext = createContext();

const CLERK_STORAGE_KEY = 'eternals_clerk_publishable_key';
const CLERK_SESSION_KEY = 'eternals_clerk_active_session';

export const getStoredClerkKey = () => {
  return localStorage.getItem(CLERK_STORAGE_KEY) || import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || '';
};

export const setStoredClerkKey = (key) => {
  if (key) {
    localStorage.setItem(CLERK_STORAGE_KEY, key.trim());
  } else {
    localStorage.removeItem(CLERK_STORAGE_KEY);
  }
};

// Preset demo accounts for quick role-testing
export const DEMO_CLERK_ACCOUNTS = [
  {
    id: "usr_clerk_admin_01",
    name: "Alex 'Reaper' Mercer",
    email: "reaper@eternalsggs.com",
    role: "admin",
    title: "Organization Director",
    division: "Executive Staff",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "usr_clerk_athlete_01",
    name: "Marcus Vance",
    email: "vortex@eternalsggs.com",
    role: "athlete",
    title: "ALGS IGL & Pro Athlete",
    division: "Apex Legends",
    playerTag: "VORTEX",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "usr_clerk_ref_01",
    name: "Jordan Reed",
    email: "jordan.ref@eternalsggs.com",
    role: "referee",
    title: "Senior Tournament Arbiter",
    division: "Tournament Operations",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "usr_clerk_player_01",
    name: "Darek Stone",
    email: "darek.stone@competitor.gg",
    role: "player",
    title: "Registered Tournament Competitor",
    division: "Vanguard Syndicate",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
  }
];

export function ClerkAuthProvider({ children }) {
  const [publishableKey, setPublishableKey] = useState(getStoredClerkKey());
  const [session, setSession] = useState(() => {
    try {
      const saved = localStorage.getItem(CLERK_SESSION_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Session load error:', e);
    }
    return DEMO_CLERK_ACCOUNTS[0]; // Default to Admin
  });

  useEffect(() => {
    try {
      if (session) {
        localStorage.setItem(CLERK_SESSION_KEY, JSON.stringify(session));
      } else {
        localStorage.removeItem(CLERK_SESSION_KEY);
      }
    } catch (e) {
      console.error('Session save error:', e);
    }
  }, [session]);

  const updateClerkKey = (key) => {
    setStoredClerkKey(key);
    setPublishableKey(key);
  };

  const switchRole = (roleKey) => {
    const matched = DEMO_CLERK_ACCOUNTS.find(a => a.role === roleKey) || DEMO_CLERK_ACCOUNTS[0];
    setSession(matched);
  };

  const signIn = (userObject) => {
    setSession(userObject);
  };

  const signOut = () => {
    setSession(null);
  };

  const isLiveClerk = Boolean(publishableKey && publishableKey.startsWith('pk_'));

  const contextValue = {
    publishableKey,
    updateClerkKey,
    isLiveClerk,
    session,
    user: session,
    isSignedIn: Boolean(session),
    signIn,
    signOut,
    switchRole,
    demoAccounts: DEMO_CLERK_ACCOUNTS
  };

  // If a valid live Clerk key is present, wrap in Official Clerk Provider with dark theme styling
  if (isLiveClerk) {
    return (
      <OfficialClerkProvider 
        publishableKey={publishableKey}
        appearance={{
          baseTheme: undefined,
          variables: {
            colorPrimary: '#00FFDF',
            colorBackground: '#080A0E',
            colorText: '#FFFFFF',
            colorTextSecondary: 'rgba(255,255,255,0.7)',
            colorInputBackground: '#0F131D',
            colorInputBorder: 'rgba(0,255,223,0.3)',
            borderRadius: '12px'
          }
        }}
      >
        <ClerkAuthContext.Provider value={contextValue}>
          {children}
        </ClerkAuthContext.Provider>
      </OfficialClerkProvider>
    );
  }

  // Otherwise, use our embedded Clerk-ready simulation provider
  return (
    <ClerkAuthContext.Provider value={contextValue}>
      {children}
    </ClerkAuthContext.Provider>
  );
}

export function useClerkAuth() {
  const context = useContext(ClerkAuthContext);
  if (!context) {
    throw new Error('useClerkAuth must be used within a ClerkAuthProvider');
  }
  return context;
}
