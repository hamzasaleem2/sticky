import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import FAQSection from "./components/lander/faqs"
import Footer from "./components/lander/footer"
import HeroSection from "./components/lander/hero"
import NavBar from "./components/lander/nav"
import PricingSection from "./components/lander/pricing-beta"
import PrivacyPolicy from "./components/privacy"
import TermsOfConditions from "./components/terms"
import Signin from './auth/signin';
import { useConvexAuth } from './hooks/useConvexAuth';
import AuthenticatedApp from './authenticated';
import Signup from './auth/signup';
import ErrorBoundary from './components/ErrorBoundary';
import Onboarding from './authenticated/Onboarding';
import SelfHostSection from './components/lander/selfhost';

function App() {
  const { isLoaded } = useConvexAuth();

  if (!isLoaded) {
    return;
  }

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={
            <>
              <NavBar />
              <main>
                <HeroSection />
                <PricingSection />
                <FAQSection />
                <SelfHostSection />
              </main>
              <Footer />
            </>
          } />
          <Route path="/privacy" element={
            <>
              <NavBar />
              <PrivacyPolicy />
              <Footer />
            </>
          } />
          <Route path="/terms" element={
            <>
              <NavBar />
              <TermsOfConditions />
              <Footer />
            </>
          } />
          <Route path="/onboarding" element={
            <>
              <SignedIn>
                <Onboarding />
              </SignedIn>
              <SignedOut>
                <Navigate to="/signin" />
              </SignedOut>
            </>
          } />
          <Route path="/boards" element={
            <>
              <SignedIn>
                <AuthenticatedApp />
              </SignedIn>
              <SignedOut>
                <Navigate to="/signin" />
              </SignedOut>
            </>
          } />
          <Route path="/board/:id" element={
            <>
              <SignedIn>
                <AuthenticatedApp />
              </SignedIn>
              <SignedOut>
                <Navigate to="/signin" />
              </SignedOut>
            </>
          } />
          <Route path="/board" element={
            <>
              <SignedIn>
                <AuthenticatedApp />
              </SignedIn>
              <SignedOut>
                <Navigate to="/signin" />
              </SignedOut>
            </>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  )
}

export default App