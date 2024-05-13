import {
  Card,
  Checkbox,
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
} from "@/features/create pixel/actions";
import {
  createPixelReducer,
  initialState,
} from "@/features/create pixel/createPixelReducer";

const CreatePixel = () => {
  const [state, dispatch] = useReducer(createPixelReducer, initialState);
  const { pixelName, pixelID } = state || {};
  const [capiActive, setCapiActive] = useState(false);
  const [value, setValue] = useState("all pages");

  const handleChange = useCallback(
    (_: boolean, newValue: string) => setValue(newValue),
    []
  );

  const [checked, setChecked] = useState(false);
  const handleCheck = useCallback(
    (newChecked: boolean) => setChecked(newChecked),
    []
  );

  const handleChangePixelName = useCallback((newValue: string) => {
    dispatch(changePixelName(newValue));
  }, []);

  const handleChangePixelID = useCallback((newValue: string) => {
    dispatch(changePixelID(newValue));
  }, []);

  useEffect(() => {
    console.log({
      state,
    });
  }, [state]);
  return (
    <Page>
      <Layout sectioned>
        <Layout.AnnotatedSection
          id="pixel-name"
          title="Pixel Name"
          description="Enter a name of your choice"
        >
          <Card>
            <FormLayout>
              <TextField
                label="Pixel Name"
                onChange={handleChangePixelName}
                autoComplete="off"
                value={pixelName}
                placeholder="Example: Osthir pixel!"
                requiredIndicator
                // error={errorFeedName}
                helpText="This name will help you recognize your pixel"
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
                onChange={handleChangePixelID}
                autoComplete="off"
                value={pixelID}
                placeholder="Example: Osthir pixel!"
                requiredIndicator
                helpText="Copy Pixel ID from Facebook Business Manager and paste it here"
                // error={errorFeedName}
              />
            </FormLayout>
          </Card>
        </Layout.AnnotatedSection>

        <Layout.AnnotatedSection
          id="conversion-api"
          title="Conversion API (IOS 14+ Solution)"
          description="Enter your pixel ID here"
        >
          <Card>
            <FormLayout>
              <CapiStatusToggleSwitch
                capiActive={capiActive}
                setCapiActive={setCapiActive}
              />
            </FormLayout>
          </Card>
        </Layout.AnnotatedSection>

        <Layout.AnnotatedSection
          id="conversion-api"
          title="Conversion API (IOS 14+ Solution)"
          description="Enter your pixel ID here"
        >
          <Card>
            <FormLayout>
              <InlineStack align="start" gap="100">
                <RadioButton
                  label="All Pages"
                  checked={value === "all pages"}
                  id="all pages"
                  name="select-pages"
                  onChange={handleChange}
                />
                <RadioButton
                  label="Specific Pages"
                  id="specific pages"
                  name="select-pages"
                  checked={value === "specific pages"}
                  onChange={handleChange}
                />
              </InlineStack>
            </FormLayout>
            {/* page selection checkboxes */}

            <div className="mt-4 flex gap-2 flex-wrap">
              <Checkbox
                label="Basic checkbox"
                checked={checked}
                onChange={handleCheck}
              />
              <Checkbox
                label="Basic checkbox"
                checked={checked}
                onChange={handleCheck}
              />
              <Checkbox
                label="Basic checkbox"
                checked={checked}
                onChange={handleCheck}
              />
            </div>
          </Card>
        </Layout.AnnotatedSection>
      </Layout>
    </Page>
  );
};

export default CreatePixel;
