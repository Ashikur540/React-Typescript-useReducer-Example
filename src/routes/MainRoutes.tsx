import { createBrowserRouter } from "react-router-dom";

import DefaultLayout from "@/layouts/DefaultLayout";
import CreatePixel from "@/pages/CreatePixel";
import Dashboard from "@/pages/Dashboard";
import ErrorPage from "@/pages/ErrorPage";
import EventTrackingSetup from "@/pages/EventTrackingSetup";
import GdprBanner from "@/pages/GdprBanner";
import Help from "@/pages/Help";
import PricingPlans from "@/pages/PricingPlans";
import ProductFeed from "@/pages/ProductFeed";
import Settings from "@/pages/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/event-tracking-setup",
        element: <EventTrackingSetup />,
      },
      {
        path: "/product-feed",
        element: <ProductFeed />,
      },
      {
        path: "/gdpr-banner",
        element: <GdprBanner />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/help",
        element: <Help />,
      },
      {
        path: "/pricing-plans",
        element: <PricingPlans />,
      },
      {
        path: "/create-pixel",
        element: <CreatePixel />,
      },
    ],
  },

  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
