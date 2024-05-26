import {
  Card,
  ChoiceList,
  ContextualSaveBar,
  Form,
  FormLayout,
  InlineStack,
  Layout,
  Page,
  RadioButton,
  TextField,
} from "@shopify/polaris";
import { useCallback, useEffect } from "react";

import CapiStatusToggleSwitch from "@/components/ui/CapiStatusToggleSwitch";

import { usePixelStateContext } from "@/contexts/FBPixelProvider";
import {
  addNewPixel,
  toggleCreatePixelSuccessToast,
} from "@/features/create pixel/actions";
import { PixelInfo } from "@/types/createPixel.types";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const CreatePixel = () => {
  const { createPixelState, dispatch } = usePixelStateContext() || {};
  const navigate = useNavigate();

  useEffect(() => {
    console.log("✨ ~ CreatePixel ~ createdPixelsList", createPixelState);
  }, [createPixelState]);
  const { handleSubmit, control, reset, watch, formState } = useForm<PixelInfo>(
    {
      defaultValues: {
        pixelName: "",
        pixelID: "",
        capiStatus: false,
        pageSelectionOption: "allPages",
        userSelectedPages: [],
      },
    }
  );

  const { errors, isDirty } = formState;
  const pageSelectionOption = watch("pageSelectionOption");

  const handleCreatePixelSubmit = useCallback<SubmitHandler<PixelInfo>>(
    (data: PixelInfo) => {
      const newPixel: PixelInfo = {
        _id: new Date().getTime().toString(),
        pixelName: data.pixelName,
        pixelID: data.pixelID,
        capiStatus: data.capiStatus,
        userSelectedPages:
          data.pageSelectionOption === "specificPages"
            ? data.userSelectedPages
            : [data.pageSelectionOption],
        currentPixelStatus: true,
      };
      // console.log("✨ ~ CreatePixel ~ newPixel:", newPixel);
      dispatch(addNewPixel(newPixel));
      dispatch(toggleCreatePixelSuccessToast());
      reset();
      navigate("/");
    },
    [dispatch, navigate, reset]
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
      title="Create New Pixel"
      primaryAction={{
        content: "Save",
        onAction: handleSubmit(handleCreatePixelSubmit),
      }}
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
                  defaultValue=""
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
                    defaultValue="allPages"
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
              {pageSelectionOption === "specificPages" && (
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

export default CreatePixel;
