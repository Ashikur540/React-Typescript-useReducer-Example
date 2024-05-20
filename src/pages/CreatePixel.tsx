import {
  Card,
  Checkbox,
  ContextualSaveBar,
  Form,
  FormLayout,
  InlineStack,
  Layout,
  Page,
  RadioButton,
  TextField,
} from "@shopify/polaris";
import { useCallback, useReducer } from "react";

import CapiStatusToggleSwitch from "@/components/ui/CapiStatusToggleSwitch";

import { selectPagesHandler } from "@/features/create pixel/actions";
import {
  createPixelReducer,
  initialState,
} from "@/features/create pixel/createPixelReducer";

import { Controller, SubmitHandler, useForm } from "react-hook-form";

const CreatePixel = () => {
  const [state, dispatch] = useReducer(createPixelReducer, initialState);
  const { selectedPages } = state || {};

  const handleSelectPageOptions = useCallback((newValue: string) => {
    dispatch(selectPagesHandler(newValue));
  }, []);

  type PixelInfo = {
    pixelName: string;
    pixelID: string;
    capiStatus: boolean;
    PageSelectionOption: "allPages" | "specificPages";
    selectedPages: string[];
  };
  const handleCreatePixel: SubmitHandler<PixelInfo> = (data: PixelInfo) => {
    const pixelInfo = {
      pixelName: data.pixelName,
      pixelID: data.pixelID,
      capiStatus: data.capiStatus,
      selectedPages:
        data.PageSelectionOption === "specificPages"
          ? selectedPages
          : "allPages",
    };
    localStorage.setItem("pixee-pixel", JSON.stringify(pixelInfo));
    reset();
  };

  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm<PixelInfo>({
    defaultValues: {
      pixelName: "",
      pixelID: "",
      capiStatus: false,
      PageSelectionOption: "allPages",
      selectedPages: [],
    },
  });

  const pageSelectionOption = watch("PageSelectionOption");
  const contextBar = isDirty && (
    <ContextualSaveBar
      message="Unsaved product"
      saveAction={{
        onAction: handleSubmit(handleCreatePixel),
      }}
      discardAction={{
        onAction: () => reset(),
      }}
    />
  );

  const pageOptionsArray = [
    { name: "home page", value: "homePage", id: 1 },
    { name: "collection pages", value: "collectionPages", id: 2 },
    { name: "product pages", value: "productPages", id: 3 },
    { name: "cart pages", value: "cartPages", id: 4 },
  ];

  return (
    <Page
      primaryAction={{
        content: "Save",
        onAction: handleSubmit(handleCreatePixel),
      }}
    >
      {contextBar}
      <Form onSubmit={handleSubmit(handleCreatePixel)}>
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
                  render={({ field }) => (
                    <CapiStatusToggleSwitch field={field} />
                  )}
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
                    name="PageSelectionOption"
                    control={control}
                    defaultValue=""
                    render={({ field }) => {
                      return (
                        <>
                          <RadioButton
                            label="All Pages"
                            name="PageSelectionOption"
                            value="allPages"
                            checked={field.value === "allPages"}
                            onChange={() => field.onChange("allPages")}
                          />
                          <RadioButton
                            label="Specific Pages"
                            name="PageSelectionOption"
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
                <div className="mt-4 flex gap-2 flex-wrap">
                  {pageOptionsArray.map((page) => (
                    // <Checkbox
                    //   key={page}
                    //   label={page}
                    //   checked={selectedPages?.includes(page)}
                    //   onChange={() => handleSelectPageOptions(page)}
                    // />
                    <Controller
                      key={page.id}
                      name={page.value}
                      control={control}
                      defaultValue={[]}
                      render={({ field }) => {
                        console.log("✨ ~ CreatePixel ~ field:", field);
                        return (
                          <Checkbox
                            key={page.id}
                            value={page.value}
                            label={page.name}
                            checked={field.value?.includes(page.value)}
                            onChange={(e) => {
                              const newValue = e.target.checked
                                ? [...field?.value, page.value]
                                : field.value?.filter((p) => p !== page.value);
                              field.onChange(newValue);
                            }}
                          />
                        );
                      }}
                    />
                  ))}
                </div>
              )}
            </Card>
          </Layout.AnnotatedSection>
        </Layout>
      </Form>
    </Page>
  );
};

export default CreatePixel;
