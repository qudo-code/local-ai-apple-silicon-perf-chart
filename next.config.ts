import MillionLint from "@million/lint";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // turbopack: {} // silencing Next 16 turbopack warning caused by Million webpack inject
};

export default MillionLint.next({
  enabled: true,
  rsc: true
})(nextConfig);
