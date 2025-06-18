import { Header } from '@/components/header';
import { LoginForm } from '@/components/login-form';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
            <p className="text-muted-foreground mt-2">
              Sign in to your account to continue
            </p>
          </div>
          <LoginForm />
        </div>
      </main>
    </div>
  );
}