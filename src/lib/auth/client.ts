import { createAuthClient } from 'better-auth/react';
import { toast } from 'sonner';

export const authClient = createAuthClient({
  plugins: [],
  fetchOptions: {
    onError: (ctx) => {
      toast.error(ctx.error.message);
    },
  },
});

export const { useSession, signIn, signOut } = authClient;
