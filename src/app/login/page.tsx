import AuthCard from '@/components/auth/AuthCard';

export default function LoginPage() {
    return (
        <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden relative selection:bg-blue-100 selection:text-blue-900">

            <div className="z-10 w-full flex justify-center">
                <AuthCard />
            </div>

        </main>
    );
}
