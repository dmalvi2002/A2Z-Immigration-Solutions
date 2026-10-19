"use client";
import { useEffect } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Lines from "@/components/Lines";
import ScrollToTop from "@/components/ScrollToTop";
import ToasterContext from "@/app/utils/context/ToastContext";
import StoreProvider from "@/app/utils/provider/StoreProvider";
import { useAppDispatch } from "@/configs/redux/hooks";
import { fetchLoggedInUser } from "@/configs/redux/auth/authSlice";
import TawkToChat from "@/app/utils/context/TawkToChat";
import GoogleAnalytics from "@/app/utils/context/GoogleAnalytics";
import CookieConsent from "@/utils/CookiesConsent";
function Initializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchLoggedInUser());
  }, [dispatch]);
  return <>{children}</>;
}
export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <Initializer>
        <TawkToChat />
        <GoogleAnalytics />
        <Lines />
        <Header />
        <ToasterContext />
        <main className="flex-grow">{children}</main>
        <Footer />
        <ScrollToTop />
        <CookieConsent />
      </Initializer>
    </StoreProvider>
  );
}
