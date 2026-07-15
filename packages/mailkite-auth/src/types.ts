export interface AuthConfig {
  apiUrl: string;
  sessionCookie: string;
  providers: {
    google: { enabled: boolean; clientId: string; clientSecret: string };
    github: { enabled: boolean; clientId: string; clientSecret: string };
    email: { enabled: boolean };
    magicLink: { enabled: boolean };
  };
}

export interface AuthUser {
  id: string;
  email: string;
  isAdmin: boolean;
  emailVerified: boolean;
  avatarUrl: string | null;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export interface AuthError {
  error: string;
  code?: string;
}

export type SignInResult =
  | { jwt: string; user: AuthUser; error?: never }
  | { error: string; jwt?: never; user?: never };

export type SignUpResult = SignInResult;

export type MagicLinkResult =
  | { status: 'sent'; error?: never }
  | { error: string; status?: never };

export type PasswordResetResult =
  | { status: 'sent' | 'reset'; error?: never }
  | { error: string; status?: never };

export type VerifyResult =
  | { status: 'verified' | 'sent'; error?: never }
  | { error: string; status?: never };

export interface SessionData {
  userId: string;
  expires: string;
}
