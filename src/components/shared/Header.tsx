import { Button, Divider, Icon, InlineStack, Tabs } from "@shopify/polaris";
import {
  CashDollarIcon,
  CategoriesIcon,
  CursorIcon,
  HomeIcon,
  QuestionCircleIcon,
  SettingsIcon,
  ShieldCheckMarkIcon,
} from "@shopify/polaris-icons";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const tabsData = [
  {
    id: "id1",
    href: "/",
    content: (
      <InlineStack gap="100">
        <Icon source={HomeIcon} tone="base" />
        <span>Dashboard</span>
      </InlineStack>
    ),
  },
  {
    id: "id2",
    href: "/event-tracking-setup",
    content: (
      <InlineStack gap="100">
        <Icon source={CursorIcon} tone="base" />
        <span>Event Tracking Setup</span>
      </InlineStack>
    ),
  },
  {
    id: "id3",
    href: "/product-feed",
    content: (
      <InlineStack gap="100">
        <Icon source={CategoriesIcon} tone="base" />
        <span>Product Feed</span>
      </InlineStack>
    ),
  },
  {
    id: "id4",
    href: "/gdpr-banner",
    content: (
      <InlineStack gap="100">
        <Icon source={ShieldCheckMarkIcon} tone="base" />
        <span>GDPR Banner</span>
      </InlineStack>
    ),
  },
  {
    id: "id5",
    href: "/settings",
    content: (
      <InlineStack gap="100">
        <Icon source={SettingsIcon} tone="base" />
        <span>Settings</span>
      </InlineStack>
    ),
  },
  {
    id: "id6",
    href: "/pricing-plans",
    content: (
      <InlineStack gap="100">
        <Icon source={CashDollarIcon} tone="base" />
        <span>Pricing Plans</span>
      </InlineStack>
    ),
  },

  {
    id: "id7",
    href: "/help",
    content: (
      <InlineStack gap="100">
        <Icon source={QuestionCircleIcon} tone="base" />
        <span>Help</span>
      </InlineStack>
    ),
  },
];

const Header = () => {
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate();

  const handleTabChange = useCallback((selectedTabIndex: number) => {
    setSelected(selectedTabIndex);
    navigate(tabsData[selectedTabIndex]?.href);
  }, []);

  useEffect(() => {
    navigate(tabsData[selected]?.href);
  }, [selected]);

  return (
    <>
      <InlineStack align="space-between" blockAlign="center" gap="100">
        <Tabs
          tabs={tabsData}
          selected={selected}
          onSelect={handleTabChange}
          key={tabsData[selected].id}
        />
        <Button variant="primary">Contact Support 😊</Button>
      </InlineStack>
      <Divider borderWidth="025" borderColor="border-brand" />
    </>
  );
};

export default Header;
