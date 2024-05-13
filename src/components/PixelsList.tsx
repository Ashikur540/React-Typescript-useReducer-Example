import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  DataTable,
  Page,
} from "@shopify/polaris";
import { useNavigate } from "react-router-dom";

const PixelsList = () => {
  const navigate = useNavigate();

  const actionButtons = () => (
    <ButtonGroup>
      <Button variant="primary">Activate</Button>
      <Button variant="secondary" tone="success">
        Edit
      </Button>
      <Button variant="secondary" tone="critical">
        Delete
      </Button>
    </ButtonGroup>
  );

  const StatusBadge = (status: string) =>
    status === "Active" ? (
      <Badge tone="success">{status}</Badge>
    ) : (
      <Badge tone="warning">{status}</Badge>
    );

  const rows = [
    [
      "Test 1",
      2333345768798,
      StatusBadge("Inactive"),
      StatusBadge("Active"),
      actionButtons(),
    ],
    [
      "Test 2",
      1345668687993,
      StatusBadge("Inactive"),
      StatusBadge("Active"),
      actionButtons(),
    ],
  ];

  return (
    <Page
      title="Pixel List"
      primaryAction={{
        content: "Add New Pixel",
        onAction: () => navigate("/create-pixel"),
      }}
    >
      <Card>
        <DataTable
          verticalAlign="middle"
          columnContentTypes={["text", "numeric", "text", "text", "text"]}
          headings={[
            "Pixel Name",
            "Pixel ID",
            "CAPI Status",
            "Pixel Status",
            "Actions",
          ]}
          rows={rows}
        />
      </Card>
    </Page>
  );
};

export default PixelsList;
