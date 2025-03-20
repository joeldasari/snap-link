import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserContext } from "@/context/UserContext";
import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { QRCode } from "react-qrcode-logo";
import useFetch from "@/hooks/useFetch";
import { createUrl } from "@/db/urls";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

// Define the form schema using zod
const formSchema = z.object({
  title: z.string().nonempty({ message: "Title is required" }),
  long_url: z
    .string()
    .nonempty({ message: "Long URL is required" })
    .url({ message: "Please enter a valid URL" }),
  custom_url: z.string().optional(),
});

const CreateLink = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const ref = useRef();

  const longURL = localStorage.getItem("longURL");

  // Initialize react-hook-form with zod resolver and default values
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      long_url: longURL || "",
      custom_url: "",
    },
  });

  // useFetch hook to call createUrl function
  const {
    data: createdUrlData,
    error: createdUrlError,
    loading,
    fn: fnCreateUrl,
  } = useFetch(createUrl);

  // onSubmit handles validated form data, generates the QR code blob, and calls fnCreateUrl
  const onSubmit = async () => {
    localStorage.removeItem("longURL");
    const canvas = ref.current?.canvasRef?.current;
    if (!canvas) return;
    const blob = await new Promise((resolve) => canvas.toBlob(resolve));
    await fnCreateUrl(
      {
        title: form.getValues("title"),
        long_url: form.getValues("long_url"),
        custom_url: form.getValues("custom_url"),
        user_id: user.id,
      },
      blob
    );
  };

  useEffect(() => {
    if (
      createdUrlError &&
      createdUrlError.message ===
        'duplicate key value violates unique constraint "urls_custom_url_key"'
    )
      toast.error("Custom short URL is already taken. Try a different one!");
    if (createdUrlError === null && createdUrlData) {
      navigate(`/link/${createdUrlData[0].id}`);
      toast.success("Short URL created successfully!");
    }
  }, [createdUrlError, createdUrlData]);

  // Watch the long_url field so we can update the QR code accordingly
  const longUrlValue = form.watch("long_url");

  return (
    <Dialog
      defaultOpen={!!longURL}
      onOpenChange={(open) => {
        if (!open) {
          localStorage.removeItem("longURL");
        }
      }}
    >
      <DialogTrigger className="cursor-pointer bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 p-2 rounded-md text-sm font-medium transition-colors duration-150">
        Create Short Link
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">
            Create a Short Link
          </DialogTitle>
          <DialogDescription>
            Paste your long URL and customize the short link if needed.
          </DialogDescription>
        </DialogHeader>

        {longUrlValue && (
          <div className="w-full flex justify-center items-center">
            <QRCode size={150} value={longUrlValue} ref={ref} />
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a title for your short link"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="long_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Long URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Paste the long URL here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="custom_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Custom Short Link</FormLabel>
                  <div className="flex items-center gap-2">
                    <Card className="p-2">snaplink.in</Card>/
                    <FormControl>
                      <Input
                        placeholder="Custom short link (optional)"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="submit"
                disabled={loading}
                className="cursor-pointer transition-colors duration-150 w-[140px]"
              >
                {loading ? (
                  <Loader2 className="animate-spin text-black" />
                ) : (
                  "Create Short Link"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLink;
