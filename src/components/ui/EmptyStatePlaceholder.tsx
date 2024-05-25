import { EmptyState, LegacyCard } from "@shopify/polaris";
import { ReactNode } from "react";

interface EmptyStatePlaceholderProps {
  heading: string;
  action?: { content: string; url?: string; onAction?: () => void };
  secondaryAction?: { content: string; url: string };
  image: string;
  children: ReactNode;
}

const EmptyStatePlaceholder = ({
  heading,
  action,
  secondaryAction,
  image,
  children,
}: EmptyStatePlaceholderProps) => {
  return (
    <>
      <LegacyCard sectioned>
        <EmptyState
          heading={heading}
          action={action}
          secondaryAction={secondaryAction}
          image={image}
        >
          {children}
        </EmptyState>
      </LegacyCard>
    </>
  );
};

export default EmptyStatePlaceholder;
