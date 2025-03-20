import { storeClicks } from "@/db/clicks";
import { getLongUrl } from "@/db/urls";
import useFetch from "@/hooks/useFetch";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const RedirectPage = () => {
  const { id } = useParams();

  const {
    loading: loadingLongUrl,
    data: longUrlData,
    fn,
  } = useFetch(getLongUrl, id);

  const { loading: loadingStats, fn: fnStats } = useFetch(storeClicks, {
    id: longUrlData?.id,
    originalUrl: longUrlData?.original_url,
  });

  useEffect(() => {
    console.log("First useEffect: Fetching long URL");
    fn();
  }, []);

  useEffect(() => {
    if (!loadingLongUrl && longUrlData) {
      console.log("Second useEffect: Storing clicks");
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
  return null;
};

export default RedirectPage;
