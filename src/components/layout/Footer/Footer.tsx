"use client";
import QuickLinks from "./QuickLinks";
import SocialIcons from "./SocialIcons";
import PaymentMethods from "./PaymentMethods";
import ContactButton from "./ContactButton";
import { useDictionary } from "@/lib/hooks/useDictionary";

const PoliciesLinksKeys = [
  "termsAndConditions",
  "returnPolicy",
  "websiteAccessibility",
  "privacyPolicy",
  "serviceAndWarranty",
];

const QuickLinksItemsKeys = ["aboutUs", "termsHome", "contactUs"];

const Footer: React.FC = () => {
  const { dictionary } = useDictionary();

  // Extract translated links
  const policiesLinks = PoliciesLinksKeys.map(
    (key) => (dictionary as any)[key]
  );
  const quickLinksItems = QuickLinksItemsKeys.map(
    (key) => (dictionary as any)[key]
  );

  return (
    <footer className="flex flex-col mt-auto w-full bg-slate-50">
      <div className="flex flex-col pt-12 w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center w-full max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row flex-wrap gap-5 justify-between items-start w-full">
            <div className="flex flex-col items-center w-full md:w-auto">
              <QuickLinks
                title={dictionary.quickLinks}
                links={quickLinksItems}
              />
              <div>
                <div className="flex gap-2 mt-14">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/ee8fefbd02f6b5f71632374fa675323e71520489aa3af89d4f0a83a30e309179?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595"
                    alt={dictionary.companyLogo}
                    className="object-contain shrink-0 w-32"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/354d9a40d6584edf38e49f98eb53629ea1b797fb17543b9296b8335e20904713?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595"
                    alt={dictionary.companyLogo}
                    className="object-contain shrink-0 w-32"
                  />
                </div>
                <ContactButton />
              </div>
            </div>
            <div className="flex flex-col items-center w-full md:w-auto">
              <SocialIcons />
            </div>
            <div className="flex flex-col items-center w-full md:w-auto">
              <QuickLinks title={dictionary.policies} links={policiesLinks} />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center px-4 py-3 mt-10 w-full bg-neutral-100 shadow-[0px_-1px_1px_rgba(0,0,0,0.161)]">
          <div className="flex flex-wrap gap-5 justify-between w-full max-w-6xl">
            <div className="my-auto text-sm font-medium text-zinc-400">
              <span className="capitalize">
                {dictionary.footerRightsReserved.replace(
                  "{{year}}",
                  new Date().getFullYear().toString()
                )}
              </span>
            </div>
            <PaymentMethods />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
