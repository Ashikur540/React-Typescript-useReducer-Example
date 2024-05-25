import { usePixelStateContext } from "@/contexts/FBPixelProvider";
import {
  deletePixel,
  togglePixelStatus,
} from "@/features/create pixel/actions";
import { PixelInfo } from "@/types/createPixel.types";
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  DataTable,
  Page,
} from "@shopify/polaris";
import { Link, useNavigate } from "react-router-dom";
import EmptyStatePlaceholder from "./ui/EmptyStatePlaceholder";

const PixelsList = () => {
  const navigate = useNavigate();
  const { createPixelState, dispatch } = usePixelStateContext() || {};
  const { createdPixelsList } = createPixelState || {};
  console.log("✨ ~ PixelsList ~ createdPixelsList:", createdPixelsList);

  const actionButtons = (pixel: PixelInfo) => (
    <ButtonGroup>
      <Button
        variant="primary"
        onClick={() => dispatch(togglePixelStatus(pixel?.pixelID))}
      >
        {pixel.currentPixelStatus ? "Deactivate" : "Activate"}
      </Button>
      <Link to={`/pixel/${pixel?.pixelID}`}>
        <Button variant="secondary" tone="success">
          Edit
        </Button>
      </Link>
      <Button
        variant="secondary"
        tone="critical"
        onClick={() => dispatch(deletePixel(pixel?.pixelID))}
      >
        Delete
      </Button>
    </ButtonGroup>
  );

  const StatusBadge = (status: boolean) =>
    status ? (
      <Badge tone="success">Enabled</Badge>
    ) : (
      <Badge tone="warning">Disabled</Badge>
    );

  const pixelDataTableRows = createdPixelsList?.map((pixel) => [
    pixel?.pixelName,
    pixel?.pixelID,
    StatusBadge(pixel?.capiStatus),
    StatusBadge(pixel?.currentPixelStatus),
    actionButtons(pixel),
  ]);

  return (
    <Page
      title="Pixel List"
      primaryAction={{
        content: "Add New Pixel",
        onAction: () => navigate("/create-pixel"),
      }}
    >
      {createdPixelsList?.length === 0 ? (
        <EmptyStatePlaceholder
          heading="This is where you'll manage your pixels"
          action={{
            content: "Add new pixel",
            // url: "/create-pixel",
            onAction: () => navigate("/create-pixel"),
          }}
          image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
          secondaryAction={{
            content: "See how",
            url: "https://help.shopify.com",
          }}
        >
          <p>
            You can create a new pixel and manage your created pixels from here.
          </p>
        </EmptyStatePlaceholder>
      ) : (
        <Card>
          <DataTable
            verticalAlign="middle"
            columnContentTypes={["text", "text", "text", "text", "text"]}
            headings={[
              "Pixel Name",
              "Pixel ID",
              "CAPI Status",
              "Pixel Status",
              "Actions",
            ]}
            rows={pixelDataTableRows}
          />
        </Card>
      )}
    </Page>
  );
};

export default PixelsList;
