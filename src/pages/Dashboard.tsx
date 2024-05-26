import PixelsList from "@/components/PixelsList";
import ToastMessage from "@/components/shared/ToastMessage";
import { usePixelStateContext } from "@/contexts/FBPixelProvider";
import {
  toggleCreatePixelSuccessToast,
  toggleDeletePixelSuccessToast,
} from "@/features/create pixel/actions";

const Dashboard = () => {
  const { createPixelState, dispatch } = usePixelStateContext();
  const { isActiveCreatePixelSuccessToast, isActiveDeletePixelSuccessToast } =
    createPixelState || {};

  return (
    <div>
      <PixelsList />
      <ToastMessage
        isActive={isActiveCreatePixelSuccessToast}
        content="Pixel created successfully"
        error={false}
        toggle={() => dispatch(toggleCreatePixelSuccessToast())}
      />
      <ToastMessage
        isActive={isActiveDeletePixelSuccessToast}
        content="Pixel Deleted successfully"
        error={false}
        toggle={() => dispatch(toggleDeletePixelSuccessToast())}
      />
    </div>
  );
};

export default Dashboard;
