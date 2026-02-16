import React, { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { Navigate, useLocation } from 'react-router';
import { supabase } from '../../lib/supabase';

const FALLBACK_MS = 4000;

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let mounted = true;
    let fallbackId: ReturnType<typeof setTimeout> | null = null;
    let resolved = false;

    const applyResult = (session: Session | null) => {
      if (!mounted || resolved) return;
      resolved = true;
      if (fallbackId) clearTimeout(fallbackId);
      fallbackId = null;
      setAuthenticated(!!session);
      setLoading(false);
    };

    // Primary: use onAuthStateChange; it fires with session when client restores from storage (e.g. on reload)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      applyResult(session);
    });

    // Fallback: if no event fires within FALLBACK_MS (e.g. offline or edge case), resolve anyway
    fallbackId = setTimeout(() => {
      if (!mounted || resolved) return;
      resolved = true;
      fallbackId = null;
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (mounted) {
          setAuthenticated(!!session);
          setLoading(false);
        }
      }).catch(() => {
        if (mounted) {
          setAuthenticated(false);
          setLoading(false);
        }
      });
    }, FALLBACK_MS);

    return () => {
      mounted = false;
      if (fallbackId) clearTimeout(fallbackId);
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
