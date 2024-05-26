import { usePixelStateContext } from "@/contexts/FBPixelProvider";
import {
  deletePixel,
  toggleDeletePixelSuccessToast,
} from "@/features/create pixel/actions";
import { Button, Modal, TextContainer } from "@shopify/polaris";
import { useCallback, useState } from "react";

interface IDeletePixelModalProps {
  id: string;
}

const DeletePixelModal = ({ id }: IDeletePixelModalProps) => {
  const { dispatch, createPixelState } = usePixelStateContext();
  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);
  const toggleDeleteFeedModal = useCallback(
    () => setIsDeleteModalActive(!isDeleteModalActive),
    [isDeleteModalActive]
  );
  const selectedPixel = createPixelState?.createdPixelsList.find(
    (pixel) => pixel.pixelID === id
  );

  const handleDeletePixel = useCallback(
    (id: string) => {
      dispatch(deletePixel(id));
      dispatch(toggleDeletePixelSuccessToast());
    },
    [dispatch]
  );

  const activator = (
    <Button variant="secondary" tone="critical" onClick={toggleDeleteFeedModal}>
      Delete
    </Button>
  );
  return (
    <>
      <Modal
        activator={activator}
        open={isDeleteModalActive}
        onClose={toggleDeleteFeedModal}
        title={`Are you sure?`}
        sectioned
        primaryAction={{
          content: "Delete",
          onAction: () => handleDeletePixel(id),
          destructive: true,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: toggleDeleteFeedModal,
          },
        ]}
      >
        <Modal.Section>
          <TextContainer>
            <p>{selectedPixel?.pixelName} will be deleted permanently.</p>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </>
  );
};

export default DeletePixelModal;
