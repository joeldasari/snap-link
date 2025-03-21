import { toast } from "sonner";
import { Copy, Download, Loader2, Trash } from "lucide-react";
import useFetch from "@/hooks/useFetch";
import { deleteUrl } from "@/db/urls";
import { Link } from "react-router-dom";

const LinkCard = ({ url, fetchUrls }) => {
  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, url?.id);
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    } catch (error) {
      console.error("Failed to copy:", error);
      toast.error("Failed to copy to clipboard");
    }
  };
  const downloadImage = async (url) => {
    try {
      const imageUrl = url?.qr;
      const fileName = `${url?.title}.png`; // Ensure a file extension

      // Fetch the image as a Blob
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error("Failed to fetch image");

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      // Create a download link
      const anchor = document.createElement("a");
      anchor.href = blobUrl;
      anchor.download = fileName;
      document.body.appendChild(anchor);
      anchor.click();

      // Cleanup
      document.body.removeChild(anchor);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-between max-sm:flex-col max-sm:gap-8 max-sm:items-start w-full h-full border-2 rounded-lg border-gray-700 p-4">
      <div className="flex items-center gap-8 max-sm:flex-col max-sm:items-start">
        <img className="h-24 xl:h-40" src={url.qr} />
        <div className="flex flex-col gap-2">
          <Link
            to={`/link/${url.id}`}
            className="text-lg xl:text-xl font-extrabold"
          >
            {url.title}
          </Link>
          <Link
            to={`https://snaplinkurl.vercel.app/${
              url.custom_url ? url.custom_url : url.short_url
            }`}
            target="_blank"
            className="text-lg xl:text-xl text-blue-400 font-bold"
          >
            https://snaplinkurl.vercel.app/
            {url.custom_url ? url.custom_url : url.short_url}
          </Link>
          <Link target="_blank" to={url.original_url} className="break-all">
            {url.original_url}
          </Link>
          <span className="text-gray-400 text-sm">
            {new Date(url.created_at).toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
            })}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Copy
          onClick={() =>
            copyToClipboard(
              `https://snaplinkurl.vercel.app/${
                url.custom_url ? url.custom_url : url.short_url
              }`
            )
          }
          className="cursor-pointer hover:text-gray-400 duration-300"
        />
        <Download
          onClick={() => downloadImage(url)}
          className="cursor-pointer hover:text-gray-400 duration-300"
        />

        {loadingDelete ? (
          <Loader2 className="animate-spin" />
        ) : (
          <Trash
            onClick={() =>
              fnDelete()
                .then(() => toast.success("Deleted Successfully!"))
                .then(() => fetchUrls())
            }
            className="cursor-pointer hover:text-red-500 duration-300"
          />
        )}
      </div>
    </div>
  );
};

export default LinkCard;
