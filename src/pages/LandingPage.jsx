import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState, useEffect } from "react"; // Added useEffect
import { Link, useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [isMobileLoaded, setIsMobileLoaded] = useState(false);
  const [isWebsiteLoaded, setIsWebsiteLoaded] = useState(false);
  const [longURL, setLongURL] = useState("");
  const navigate = useNavigate();

  // Styles for 3:4 ratio (mobile)
  const mobileStyles =
    "h-[400px] w-[300px] max-w-[90vw] rounded-md border border-blue-400 shadow-md shadow-blue-500/50";

  // Styles for 2:1 ratio (sm and above)
  const websiteStyles =
    "h-[150px] w-[300px] sm:h-[200px] sm:w-[400px] md:h-[300px] md:w-[600px] lg:h-[400px] lg:w-[800px] xl:h-[600px] xl:w-[1200px] max-w-[90vw] rounded-md border border-blue-400 shadow-md shadow-blue-500/50 sm:rounded-lg sm:border-2 sm:shadow-lg md:rounded-xl md:border-[3px] md:shadow-xl lg:rounded-2xl lg:border-4 lg:shadow-2xl xl:rounded-3xl xl:border-[5px] xl:shadow-3xl";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (longURL) {
      navigate("/auth");
      localStorage.setItem("longURL", longURL);
    }
  };

  // Reset loading states on initial render to avoid cached image issues
  useEffect(() => {
    setIsMobileLoaded(false);
    setIsWebsiteLoaded(false);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-4">
      <h1 className="text-center text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold bg-gradient-to-b from-foreground to-gray-400 text-transparent bg-clip-text">
        Shrink Links Like Magic <br /> Your Ultimate{" "}
        <span className="underline underline-offset-8 decoration-blue-400 decoration-2">
          URL Shortener
        </span>
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mt-4 w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] m-auto flex flex-col lg:flex-row items-center gap-4"
      >
        <Input
          type="url"
          className="border-2 border-gray-500 text-foreground h-12"
          placeholder="Paste Your URL Here"
          value={longURL}
          onChange={(e) => setLongURL(e.target.value)}
        />
        <Button
          type="submit"
          className="cursor-pointer transition-colors duration-150 h-12"
        >
          Shrink It Now!
        </Button>
      </form>
      <div className="flex flex-col items-center max-w-full px-4 gap-4">
        {/* Mobile Section */}
        <div className="sm:hidden">
          {!isMobileLoaded && (
            <div className={`${mobileStyles} animate-pulse bg-gray-900`} />
          )}
          <img
            src="/demo-mobile.jpg"
            alt="demo-mobile"
            className={`${mobileStyles} object-cover ${
              isMobileLoaded ? "block" : "hidden"
            }`}
            onLoad={() => setIsMobileLoaded(true)}
            onError={() => console.error("Mobile image failed to load")}
          />
        </div>
        {/* Website Section */}
        <div className="hidden sm:block">
          {!isWebsiteLoaded && (
            <div className={`${websiteStyles} animate-pulse bg-gray-900`} />
          )}
          <img
            src="/demo-website.png"
            alt="demo-website"
            className={`${websiteStyles} object-cover ${
              isWebsiteLoaded ? "block" : "hidden"
            }`}
            onLoad={() => setIsWebsiteLoaded(true)}
            onError={() => console.error("Website image failed to load")}
          />
        </div>
      </div>
      <h2 className="mt-14 text-center text-xl md:text-2xl 2xl:text-3xl font-bold bg-gradient-to-b from-foreground to-gray-400 text-transparent bg-clip-text">
        Frequently Asked Questions
      </h2>
      <Accordion
        type="single"
        collapsible
        className="h-[300px] xl:h-[240px] max-sm:w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] m-auto"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="cursor-pointer">
            How Fast Does SnapLink Work?
          </AccordionTrigger>
          <AccordionContent>
            Super fast! Paste your long URL, click ‘Shrink It Now!’, and get a
            short link in just a second. It’s that simple!
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="cursor-pointer">
            Are My Links Safe and Permanent?
          </AccordionTrigger>
          <AccordionContent>
            Yes! SnapLink keeps your links secure and active for as long as you
            want. No worries about them disappearing or being unsafe.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="cursor-pointer">
            What Makes SnapLink Special?
          </AccordionTrigger>
          <AccordionContent>
            SnapLink is fast, easy, and packed with extras like custom links and
            click tracking—all in a cool dark-mode design. It’s everything you
            need in one place!
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <footer className="text-center">
        <span>Made by </span>
        <Link
          to="https://github.com/joeldasari"
          target="_blank"
          className="font-bold hover:text-gray-400 transition-colors duration-150"
        >
          Joel Dasari
        </Link>
      </footer>
    </div>
  );
};

export default LandingPage;
