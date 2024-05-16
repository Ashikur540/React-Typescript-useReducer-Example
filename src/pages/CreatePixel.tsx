import {
  Banner,
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
import { useCallback, useEffect, useReducer, useState } from "react";

import CapiStatusToggleSwitch from "@/components/ui/CapiStatusToggleSwitch";

import {
  changePixelID,
  changePixelName,
  selectPagesHandler,
} from "@/features/create pixel/actions";
import {
  createPixelReducer,
  initialState,
} from "@/features/create pixel/createPixelReducer";
import { useDirty, useField, useReset, useSubmit } from "@shopify/react-form";

const CreatePixel = () => {
  const [state, dispatch] = useReducer(createPixelReducer, initialState);
  const [showPagesOptions, setShowPagesOptions] = useState(false);
  const [selectPagesChecked, setSelectPagesChecked] = useState("all pages");

  const { pixelName, pixelID, selectedPages } = state || {};

  const handleSelectPagesChecked = useCallback(
    (_: boolean, newValue: string) => setSelectPagesChecked(newValue),
    []
  );

  const handleChangePixelName = useCallback((newValue: string) => {
    dispatch(changePixelName(newValue));
  }, []);

  const handleChangePixelID = useCallback((newValue: string) => {
    dispatch(changePixelID(newValue));
  }, []);

  const handleSelectPageOptions = useCallback((newValue: string) => {
    dispatch(selectPagesHandler(newValue));
  }, []);

  useEffect(() => {
    console.log("✨ ~ CreatePixel ~ state:", state);
  }, [state]);

  useEffect(() => {
    if (selectPagesChecked === "specific pages") {
      setShowPagesOptions(true);
    }
  }, [selectPagesChecked]);

  const handleCreatePixel = () => {
    localStorage.setItem("pixee-pixel", JSON.stringify(state));
  };

  const pixelTitle = useField("");
  const pixelId = useField("");

  const fields = { pixelTitle, pixelId };

  // track whether any field has been changed from its initial values
  const dirty = useDirty(fields);

  // generate a reset callback
  const reset = useReset(fields);

  // handle submission state
  const { submit, errors, submitting } = useSubmit(async (fieldValues) => {
    console.log("✨ ~ fieldValues:", fieldValues);
    return { status: "success" };
  }, fields);

  const contextBar = dirty && (
    <ContextualSaveBar
      message="Unsaved product"
      saveAction={{
        onAction: submit,
        loading: submitting,
        disabled: false,
      }}
      discardAction={{
        onAction: reset,
      }}
    />
  );

  const errorBanner = errors.length > 0 && (
    <Layout.Section>
      <Banner tone="critical">
        <p>There were some issues with your form submission:</p>
        <ul>
          {errors.map(({ message }, index) => {
            return <li key={`${message}${index}`}>{message}</li>;
          })}
        </ul>
      </Banner>
    </Layout.Section>
  );

  return (
    <Page
      primaryAction={{
        content: "Save",
        onAction: submit,
      }}
    >
      {contextBar}
      <Form onSubmit={submit}>
        <Layout sectioned>
          {errorBanner}
          <Layout.AnnotatedSection
            id="pixel-name"
            title="Pixel Name"
            description="Enter a name of your choice"
          >
            <Card>
              <FormLayout>
                <TextField
                  label="Pixel Name"
                  // onChange={handleChangePixelName}
                  autoComplete="off"
                  // value={pixelName}
                  placeholder="Example: Osthir pixel!"
                  requiredIndicator
                  // error={errorFeedName}
                  helpText="This name will help you recognize your pixel"
                  {...fields.pixelTitle}
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
                <TextField
                  label="Pixel ID"
                  // onChange={handleChangePixelID}
                  autoComplete="off"
                  // value={pixelID}
                  placeholder="Example: Osthir pixel!"
                  requiredIndicator
                  helpText="Copy Pixel ID from Facebook Business Manager and paste it here"
                  // error={errorFeedName}
                  {...fields.pixelId}
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
                <CapiStatusToggleSwitch />
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
                  <RadioButton
                    label="All Pages"
                    checked={selectPagesChecked === "all pages"}
                    id="all pages"
                    name="select-pages"
                    onChange={handleSelectPagesChecked}
                  />
                  <RadioButton
                    label="Specific Pages"
                    id="specific pages"
                    name="select-pages"
                    checked={selectPagesChecked === "specific pages"}
                    onChange={handleSelectPagesChecked}
                  />
                </InlineStack>
              </FormLayout>
              {/* page selection checkboxes */}

              {showPagesOptions && selectPagesChecked === "specific pages" && (
                <div className="mt-4 flex gap-2 flex-wrap">
                  <Checkbox
                    label="Home Page"
                    checked={selectedPages?.includes("home page")}
                    onChange={() => handleSelectPageOptions("home page")}
                  />
                  <Checkbox
                    label="collection Pages"
                    checked={selectedPages?.includes("collection pages")}
                    onChange={() => handleSelectPageOptions("collection pages")}
                  />
                  <Checkbox
                    label="Product Pages"
                    checked={selectedPages?.includes("product pages")}
                    onChange={() => handleSelectPageOptions("product pages")}
                  />
                  <Checkbox
                    label="Cart Pages"
                    checked={selectedPages?.includes("cart pages")}
                    onChange={() => handleSelectPageOptions("cart pages")}
                  />
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
