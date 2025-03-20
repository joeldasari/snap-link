import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [longURL, setLongURL] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (longURL) {
      navigate("/auth");
      localStorage.setItem("longURL", longURL);
    } else return;
  };
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-4">
      <h1 className="text-center text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold bg-gradient-to-b from-foreground to-gray-400 text-transparent bg-clip-text">
        Shrink Links Like Magic <br /> Your Ultimate{" "}
        <span className="underline underline-offset-8 decoration-blue-400 decoration-thickness-2">
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
      <img
        src="/demo.png"
        alt="demo-img"
        className="h-[200px] md:h-[350px] lg:h-[400px] xl:h-[600px] m-auto border-blue-400 border rounded-xl lg:border-2 lg:rounded-4xl shadow-blue-400 shadow-md xl:shadow-xl"
      />
      <h2 className="mt-14 text-center text-xl md:text-2xl 2xl:text-3xl font-bold bg-gradient-to-b from-foreground to-gray-400 text-transparent bg-clip-text">
        Frequently Asked Questions
      </h2>
      <Accordion
        type="single"
        collapsible
        className="h-[300px] xl:h-[240px] max-sm: w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] m-auto"
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
          Joel D
        </Link>
      </footer>
    </div>
  );
};

export default LandingPage;
