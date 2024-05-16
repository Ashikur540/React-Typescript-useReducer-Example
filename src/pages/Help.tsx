import { Card, Form, FormLayout, Page, TextField } from "@shopify/polaris";
import { useForm } from "react-hook-form";

const Help = () => {
  const { register, handleSubmit, formState } = useForm();
  const onSubmit = (data: object) => console.log(data);

  console.log("✨ ~ Help ~ formState:", formState);
  return (
    <Page
      // breadcrumbs={[{ content: "Products", url: "/products" }]}
      title="Add Product"
      primaryAction={{
        content: "Save",
        disabled: false,
        onAction: () => handleSubmit(onSubmit),
      }}
    >
      <Card>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormLayout>
            <TextField
              label="Title"
              type="text"
              {...register("title", { required: true })}
            />
            <TextField
              label="Description"
              type="text"
              multiline={4}
              {...register("description", { required: true })}
            />
          </FormLayout>
        </Form>
      </Card>
    </Page>
  );
};

export default Help;
