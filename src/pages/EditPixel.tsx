import CapiStatusToggleSwitch from "@/components/ui/CapiStatusToggleSwitch";
import { usePixelStateContext } from "@/contexts/FBPixelProvider";
import { editPixel } from "@/features/create pixel/actions";
import { PixelInfo } from "@/types/createPixel.types";
import {
  Card,
  ChoiceList,
  ContextualSaveBar,
  FormLayout,
  InlineStack,
  Layout,
  Page,
  RadioButton,
  TextField,
} from "@shopify/polaris";

import { useCallback } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Form, useNavigate, useParams } from "react-router-dom";

const EditPixel = () => {
  const { id } = useParams();
  const { createPixelState, dispatch } = usePixelStateContext() || {};
  const currentPixel = createPixelState.createdPixelsList?.find(
    (pixel) => pixel.pixelID === id
  );

  const {
    _id,
    pixelName,
    pixelID,
    capiStatus,
    userSelectedPages,
    pageSelectionOption,
  } = currentPixel || {};

  const { handleSubmit, control, reset, watch, formState } = useForm<PixelInfo>(
    {
      defaultValues: {
        pixelName: pixelName || "",
        pixelID: pixelID || "",
        capiStatus: capiStatus || false,
        pageSelectionOption: userSelectedPages?.includes("allPages")
          ? "allPages"
          : "specificPages",
        userSelectedPages: userSelectedPages || [],
      },
    }
  );

  const { errors, isDirty } = formState;
  const pageSelectionOptionValue = watch("pageSelectionOption");
  const navigate = useNavigate();
  const handleCreatePixelSubmit = useCallback<SubmitHandler<PixelInfo>>(
    (data: PixelInfo) => {
      const updatedPixel: PixelInfo = {
        _id,
        pixelName: data.pixelName,
        pixelID: data.pixelID,
        capiStatus: data.capiStatus,
        userSelectedPages:
          data.pageSelectionOption === "specificPages"
            ? data.userSelectedPages
            : [data.pageSelectionOption],
      };
      console.log("✨ ~ EditPixel ~ data:", updatedPixel);
      dispatch(editPixel(updatedPixel));
      navigate("/");
    },
    [_id, dispatch, navigate]
  );
  const contextBar = isDirty && (
    <ContextualSaveBar
      message="Unsaved product"
      saveAction={{
        onAction: handleSubmit(handleCreatePixelSubmit),
      }}
      discardAction={{
        onAction: () => reset(),
      }}
    />
  );

  interface IPageOptions {
    label: string;
    value: string;
  }
  const pageOptionsArray: Array<IPageOptions> = [
    { label: "home page", value: "homePage" },
    { label: "collection pages", value: "collectionPages" },
    { label: "product pages", value: "productPages" },
    { label: "cart pages", value: "cartPages" },
  ];
  return (
    <Page
      title="Edit Pixel"
      backAction={{ content: "Settings", onAction: () => navigate("/") }}
    >
      {contextBar}
      <Form onSubmit={handleSubmit(handleCreatePixelSubmit)}>
        <Layout sectioned>
          <Layout.AnnotatedSection
            id="pixel-name"
            title="Pixel Name"
            description="Enter a name of your choice"
          >
            <Card>
              <FormLayout>
                <Controller
                  control={control}
                  name="pixelName"
                  defaultValue={pixelName}
                  rules={{ required: "Pixel Name is required" }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      label="Pixel Name"
                      autoComplete="off"
                      requiredIndicator
                      helpText="This name will help you recognize your pixel"
                      error={error?.message}
                      {...field}
                    />
                  )}
                />
              </FormLayout>
            </Card>
          </Layout.AnnotatedSection>

          <Layout.AnnotatedSection
            id="pixel-id"
            title="Pixel ID"
            description="Enter your pixel ID here"
          >
            <Card>
              <FormLayout>
                <Controller
                  control={control}
                  name="pixelID"
                  rules={{ required: "Pixel ID is required" }}
                  render={({ field }) => (
                    <TextField
                      label="Pixel ID"
                      autoComplete="off"
                      requiredIndicator
                      helpText="Copy Pixel ID from Facebook Business Manager and paste it here"
                      error={errors.pixelID?.message}
                      {...field}
                    />
                  )}
                />
              </FormLayout>
            </Card>
          </Layout.AnnotatedSection>

          <Layout.AnnotatedSection
            id="conversion-api"
            title="Conversion API (IOS 14+ Solution)"
            description="Activate Conversion API to track events from the server side, bypassing browser limits, ad-blockers, and without relying on thank you page"
          >
            <Card>
              <FormLayout>
                <Controller
                  control={control}
                  name="capiStatus"
                  render={({ field }) => <CapiStatusToggleSwitch {...field} />}
                />
              </FormLayout>
            </Card>
          </Layout.AnnotatedSection>

          <Layout.AnnotatedSection
            id="page selection"
            title="Page Selection"
            description="Choose page templates you want to integrate this pixel"
          >
            <Card>
              <FormLayout>
                <InlineStack align="start" gap="100">
                  <Controller
                    name="pageSelectionOption"
                    control={control}
                    // defaultValue={pageSelectionOptionValue}
                    render={({ field }) => {
                      return (
                        <>
                          <RadioButton
                            label="All Pages"
                            name="pageSelectionOption"
                            value="allPages"
                            checked={field.value === "allPages"}
                            onChange={() => field.onChange("allPages")}
                          />
                          <RadioButton
                            label="Specific Pages"
                            name="pageSelectionOption"
                            value="specificPages"
                            checked={field.value === "specificPages"}
                            onChange={() => field.onChange("specificPages")}
                          />
                        </>
                      );
                    }}
                  />
                </InlineStack>
              </FormLayout>

              {/* page selection checkboxes */}
              {pageSelectionOptionValue === "specificPages" && (
                <Controller
                  name="userSelectedPages"
                  control={control}
                  render={({ field }) => (
                    <ChoiceList
                      allowMultiple
                      title="Select Pages"
                      titleHidden
                      selected={field.value}
                      choices={pageOptionsArray}
                      onChange={(value: string[]) => field.onChange(value)}
                    />
                  )}
                />
              )}
            </Card>
          </Layout.AnnotatedSection>
        </Layout>
      </Form>
    </Page>
  );
};

export default EditPixel;
