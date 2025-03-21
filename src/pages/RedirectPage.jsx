import { storeClicks } from "@/db/clicks";
import { getLongUrl } from "@/db/urls";
import useFetch from "@/hooks/useFetch";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const RedirectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    loading: loadingLongUrl,
    data: longUrlData,
    fn,
    error: errorLongUrl,
  } = useFetch(getLongUrl, id);

  const { loading: loadingStats, fn: fnStats } = useFetch(storeClicks, {
    id: longUrlData?.id,
    originalUrl: longUrlData?.original_url,
  });

  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    if (!loadingLongUrl && longUrlData) {
      fnStats();
    }
  }, [loadingLongUrl, longUrlData]);

  if (loadingLongUrl || loadingStats) {
    return (
      <div className="w-full flex flex-col items-center gap-4">
        <BarLoader width={"100%"} color="#60A5FA" />
        <span className="text-center text-gray-400">Redirecting...</span>
      </div>
    );
  }
  if (errorLongUrl) {
    navigate("*");
  }
  return null;
};

export default RedirectPage;
