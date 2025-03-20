import CreateLink from "@/components/CreateLink";
import LinkCard from "@/components/LinkCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UserContext } from "@/context/UserContext";
import { getClicksForUrls } from "@/db/clicks";
import { getUrls } from "@/db/urls";
import useFetch from "@/hooks/useFetch";
import { Search } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const DashboardPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useContext(UserContext);

  const {
    loading: loadingUrls,
    error: errorUrls,
    data: urls,
    fn: fnUrls,
  } = useFetch(getUrls, user?.id);

  const {
    loading: loadingClicks,
    error: errorClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(
    getClicksForUrls,
    urls?.map((url) => url.id)
  );

  useEffect(() => {
    fnUrls();
  }, []);

  useEffect(() => {
    if (urls?.length) {
      fnClicks();
    }
  }, [urls]);

  const filteredUrls = searchQuery
    ? urls?.filter((url) =>
        url.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : urls; // If searchQuery is empty, show all URLs

  if (loadingUrls || loadingClicks)
    return <BarLoader width={"100%"} color="#60A5FA" />;
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-center text-xl xl:text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{clicks ? clicks?.length : 0}</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl xl:text-2xl font-bold">My Links</h1>

        <CreateLink />
      </div>
      <div className="relative">
        <Input
          type="text"
          placeholder="Search for your links..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // ✅ Fixing function call
          className="border-2 border-gray-500 text-foreground h-12"
        />
        <Search color="#6B7280" className="absolute top-3 right-3 p-0.5" />
      </div>
      {errorUrls && <span>{errorUrls.message}</span>}
      {errorClicks && <span>{errorClicks.message}</span>}
      <div className="flex flex-col gap-4 pb-4">
        {filteredUrls?.length > 0 ? (
          <div className="flex flex-col gap-4 pb-4">
            {filteredUrls.map((url) => (
              <React.Fragment key={url.id}>
                <LinkCard url={url} fetchUrls={fnUrls} />
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div className="text-center font-semibold text-gray-400 mt-6">
            <p>No links found. Start creating short links!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
