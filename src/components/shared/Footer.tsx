import { FooterHelp, Link } from "@shopify/polaris";

export const Footer = () => {
  return (
    <footer className="border border-slate-300 rounded-full  px-12 w-[90%] md:max-w-[30vw] mx-auto">
      <FooterHelp align="center">
        Need Help!{" "}
        <Link url="https://help.shopify.com/manual/orders/fulfill-orders">
          Contact Us
        </Link>
      </FooterHelp>
    </footer>
  );
};
