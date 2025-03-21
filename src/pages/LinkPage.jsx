import { UserContext } from "@/context/UserContext";
import { getClicksForSingleURL } from "@/db/clicks";
import { deleteUrl, getUrl } from "@/db/urls";
import useFetch from "@/hooks/useFetch";
import { ArrowLeft, LinkIcon } from "lucide-react";
import { useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { toast } from "sonner";
import { Copy, Download, Loader2, Trash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LocationStats from "@/components/LocationStats";
import DeviceStats from "@/components/DeviceStats";

const LinkPage = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const {
    loading: loadingUrl,
    error: errorUrl,
    data: dataUrl,
    fn: fnUrl,
  } = useFetch(getUrl, {
    id,
    user_id: user?.id,
  });

  const {
    loading: loadingClicks,
    error: errorClicks,
    data: dataClicks,
    fn: fnClicks,
  } = useFetch(getClicksForSingleURL, id);

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, id);

  useEffect(() => {
    fnUrl();
    fnClicks();
  }, []);

  if (errorUrl || errorClicks) {
    navigate("/dashboard");
  }

  let link = "";
  if (dataUrl) {
    link = dataUrl?.custom_url ? dataUrl?.custom_url : dataUrl?.short_url;
  }

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

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    } catch (error) {
      console.error("Failed to copy:", error);
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <>
      {loadingUrl || loadingClicks ? (
        <BarLoader className="mb-8" width={"100%"} color="#60A5FA" />
      ) : (
        <ArrowLeft
          onClick={() => navigate("/dashboard")}
          className="size-8 cursor-pointer mb-8"
        />
      )}
      {dataUrl ? (
        <div className="flex flex-col xl:flex-row gap-8 pb-8">
          <div className="flex flex-col gap-4 xl:w-2/5">
            <img className="h-24 xl:h-48 w-max" src={dataUrl.qr} />
            <span className="text-lg xl:text-xl font-extrabold">
              {dataUrl?.title}
            </span>
            <Link
              className="text-lg xl:text-xl text-blue-400 font-bold"
              to={`https://snaplinkurl.vercel.app/${link}`}
              target="_blank"
            >
              https://snaplinkurl.vercel.app/{link}
            </Link>
            <Link
              to={dataUrl?.original_url}
              target="_blank"
              className="flex items-center gap-2 break-all"
            >
              <LinkIcon className="size-5" />
              {dataUrl?.original_url}
            </Link>
            <span className="text-gray-400 text-sm">
              {new Date(dataUrl?.created_at).toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
              })}
            </span>
            <div className="flex items-center gap-4">
              <Copy
                onClick={() =>
                  copyToClipboard(
                    `https://snaplinkurl.vercel.app/${
                      dataUrl.custom_url
                        ? dataUrl.custom_url
                        : dataUrl.short_url
                    }`
                  )
                }
                className="cursor-pointer hover:text-gray-400 duration-300"
              />
              <Download
                onClick={() => downloadImage(dataUrl)}
                className="cursor-pointer hover:text-gray-400 duration-300"
              />

              {loadingDelete ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Trash
                  onClick={() =>
                    fnDelete()
                      .then(() => toast.success("Deleted Successfully!"))
                      .then(() => navigate("/dashboard"))
                  }
                  className="cursor-pointer hover:text-red-500 duration-300"
                />
              )}
            </div>
          </div>
          <div className="border p-2 rounded-lg xl:w-3/5 xl:p-8 flex flex-col gap-8">
            {dataClicks && dataClicks.length ? (
              loadingClicks ? (
                <p>Loading...</p>
              ) : (
                <>
                  <Card className="m-2">
                    <CardHeader>
                      <CardTitle>Total Clicks</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{dataClicks.length}</p>
                    </CardContent>
                  </Card>
                  <CardTitle>Location Stats</CardTitle>
                  <LocationStats stats={dataClicks} />
                  <CardTitle>Device Stats</CardTitle>
                  <DeviceStats stats={dataClicks} />
                </>
              )
            ) : (
              <p>No Stats to display</p>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default LinkPage;
