import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '@/integrations/firebase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

type AuthResult = {
  error: Error | null;
};

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (email: string, password: string, fullName: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      setUser(authUser);

      if (authUser) {
        setIsAdmin(false);
        await checkAdminRole(authUser.uid);
      } else {
        setIsAdmin(false);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const checkAdminRole = async (userId: string) => {
    try {
      const rolesDoc = await getDoc(doc(db, 'user_roles', userId));
      if (rolesDoc.exists()) {
        const roleData = rolesDoc.data() as { role?: string; roles?: string[] };
        if (roleData.role === 'admin' || roleData.roles?.includes('admin')) {
          setIsAdmin(true);
          return;
        }
      }

      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        const userData = userDoc.data() as { role?: string; roles?: string[] };
        if (userData.role === 'admin' || userData.roles?.includes('admin')) {
          setIsAdmin(true);
          return;
        }
      }

      setIsAdmin(false);
    } catch (error) {
      console.error('Error checking admin role:', error);
      setIsAdmin(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      toast.success('Signed in successfully');
      navigate('/');
      return { error: null };
    } catch (error) {
      const authError = error instanceof Error ? error : new Error('Sign in failed');
      toast.error(authError.message);
      return { error: authError };
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(credential.user, { displayName: fullName });

      await setDoc(
        doc(db, 'users', credential.user.uid),
        {
          full_name: fullName,
          email,
          roles: ['user'],
          created_at: serverTimestamp(),
          updated_at: serverTimestamp(),
        },
        { merge: true },
      );

      await setDoc(
        doc(db, 'user_roles', credential.user.uid),
        {
          role: 'user',
          roles: ['user'],
          updated_at: serverTimestamp(),
        },
        { merge: true },
      );

      toast.success('Account created successfully!');
      navigate('/');
      return { error: null };
    } catch (error) {
      const authError = error instanceof Error ? error : new Error('Sign up failed');
      toast.error(authError.message);
      return { error: authError };
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      
      toast.success('Signed out successfully');
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Error signing out');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        loading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
