import { Footer } from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { Frame, Page } from "@shopify/polaris";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <Page fullWidth>
      <Header />
      <Frame>
        <Outlet />
      </Frame>
      <Footer />
    </Page>
  );
};

export default DefaultLayout;
