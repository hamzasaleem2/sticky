import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ConvexReactClient } from "convex/react";
import { ThemeProvider } from "./providers/theme-provider";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { PostHogProvider } from 'posthog-js/react'
import { Toaster } from "./providers/toaster";
import { HalloweenProvider } from "./providers/halloween-provider";
import HalloweenDecorations from "./components/halloween-decorations";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

const options = {
  api_host: import.meta.env.VITE_POSTHOG_API_HOST,
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PostHogProvider apiKey={import.meta.env.VITE_POSTHOG_KEY} options={options}>
      <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <HalloweenProvider>
              <HalloweenDecorations />
              <App />
              <Toaster/>
            </HalloweenProvider>
          </ThemeProvider>
        </ConvexProviderWithClerk>
      </ClerkProvider>
    </PostHogProvider>
  </React.StrictMode>,
);