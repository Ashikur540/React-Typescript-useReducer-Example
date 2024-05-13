import { Button } from "@shopify/polaris";
import { HomeIcon } from "@shopify/polaris-icons";

const ErrorPage = () => {
  return (
    <main>
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8">
        <div className="max-w-lg mx-auto text-center">
          <div className="pb-6">
            <img
              src="https://cdn.shopify.com/app-store/listing_images/5ff251f2bb1d9d01bda6b8ac3b4b40db/icon/CPP2nL_Dp_oCEAE=.png"
              width={150}
              className="mx-auto"
            />
          </div>
          <h3 className="text-gray-800 text-4xl font-semibold sm:text-5xl">
            Page Not Found
          </h3>
          <p className="text-gray-600 mt-3">
            Sorry, the page you are looking for could not be found or has been
            removed.
          </p>

          <div className="mt-10">
            <Button icon={HomeIcon} url="/" variant="primary">
              Return to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;
