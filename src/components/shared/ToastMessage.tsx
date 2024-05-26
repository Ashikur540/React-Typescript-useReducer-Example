import { Toast } from "@shopify/polaris";

interface IToastMessageProps {
  isActive: boolean;
  content: string;
  toggle: () => void;
  error: boolean;
}
const ToastMessage = ({
  isActive,
  content,
  toggle,
  error,
}: IToastMessageProps) => {
  return (
    <>
      {isActive && (
        <Toast
          content={content}
          onDismiss={toggle}
          duration={3000}
          error={error}
        />
      )}
    </>
  );
};

export default ToastMessage;
