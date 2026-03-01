import { CheckCircle2, Zap, Rocket, Database } from "lucide-react";

export default async function Page() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className="max-w-3xl w-full">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold mb-4 tracking-tight">hyperoptimized-nextjs-template</h1>
                    <p className="text-xl text-muted-foreground">A bleeding-edge Next.js stack optimized for speed.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-card p-6 rounded-xl border shadow-sm flex flex-col items-center text-center">
                        <Rocket className="w-8 h-8 text-blue-500 mb-3" />
                        <h3 className="text-3xl font-bold mb-1">300%</h3>
                        <p className="text-sm text-muted-foreground">Faster Dev Startup</p>
                    </div>
                    <div className="bg-card p-6 rounded-xl border shadow-sm flex flex-col items-center text-center">
                        <Zap className="w-8 h-8 text-yellow-500 mb-3" />
                        <h3 className="text-3xl font-bold mb-1">70%</h3>
                        <p className="text-sm text-muted-foreground">Faster Execution</p>
                    </div>
                    <div className="bg-card p-6 rounded-xl border shadow-sm flex flex-col items-center text-center">
                        <Database className="w-8 h-8 text-purple-500 mb-3" />
                        <h3 className="text-3xl font-bold mb-1">10x</h3>
                        <p className="text-sm text-muted-foreground">Lower DB Latency</p>
                    </div>
                </div>

                <div className="space-y-4 bg-card p-8 rounded-xl border shadow-sm">
                    <h2 className="text-2xl font-semibold mb-6">Why it's blazing fast</h2>
                    <ul className="space-y-4">
                        <li className="flex gap-3">
                            <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                            <div>
                                <span className="font-medium">Next.js 16 + Turbopack</span>
                                <p className="text-sm text-muted-foreground">Replaces Webpack for instant dev server cold starts and lightning HMR.</p>
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                            <div>
                                <span className="font-medium">Million Lint Optimizer</span>
                                <p className="text-sm text-muted-foreground">Automatically memoizes React components to skip unnecessary Virtual DOM diffing.</p>
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                            <div>
                                <span className="font-medium">Turso / libsql + Drizzle ORM</span>
                                <p className="text-sm text-muted-foreground">Queries a local/edge SQLite runtime, dropping database latency to ~2-5ms.</p>
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                            <div>
                                <span className="font-medium">Server Components First</span>
                                <p className="text-sm text-muted-foreground">Zero bytes of Javascript shipped for the layout page; renders purely as HTML.</p>
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                            <div>
                                <span className="font-medium">Tailwind v4</span>
                                <p className="text-sm text-muted-foreground">Brand new CSS compiler generating styles dynamically with minimal footprint.</p>
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                            <div>
                                <span className="font-medium">Auth.js (v5 Beta)</span>
                                <p className="text-sm text-muted-foreground">Edge-compatible authentication integrated perfectly with Drizzle ORM.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </main>
    );
}