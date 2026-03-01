# hyperoptimized-nextjs-template

hyperoptimized-nextjs-template is an intensely optimized, low-noise Next.js web application template. It was built with a dual focus on delivering a pristine Developer Experience (DX) free of boilerplate, and extreme runtime performance that rivals lean Single Page Applications (SPAs) or zero-JS frameworks like Qwik.

## Key Features

1. **Clean Next.js Architecture:** A radically restructured project layout that gets configuration files out of your way and enforces strict feature-based colocation. We use `src/components/ui`, `src/lib`, and feature folders with private directories (like `_components`, `_hooks`) to keep the codebase navigable and scalable.
2. **Hyper-Optimized Performance:**
   - **Million.js Integrated:** The React Virtual DOM is swapped out for Million's block-based optimizing compiler, making heavy React iterative rendering much faster.
   - **Edge Runtime Enabled:** The application runs on the Edge by default (`runtime = 'edge'`), ensuring near-zero cold starts and globally distributed speed.
   - **RSC "Zero-Bundle" Focus:** Emphasizes React Server Components (RSC) to ship 0KB of JavaScript to the client wherever possible.
3. **shadcn/ui pre-configured:** A fully customized and aliased shadcn/ui integration, properly wired to our clean `src/components/ui` architectural pattern with Tailwind CSS.

## Documentation

For deep dives into the architectural philosophies and optimization techniques employed in this repository, see our core documentation:

- 📖 **[Clean Next.js Project Structure](./docs/clean_nextjs_structure.md):** Learn how we organize files, utilize route groups, and hide the boilerplate to make Next.js a joy to work with.
- 🚀 **[Next.js Hyper-Optimization](./docs/nextjs_hyper_optimization.md):** Understand the "Resumability Hack" with RSCs, how to leverage Million.js effectively, and how to push Next.js performance to the absolute limit.

## Getting Started

To run the development server:

```bash
pnpm dev
# or
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You'll find the `FastList` example component demonstrating the Million.js `block()` compiler hook in action.
