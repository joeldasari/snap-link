import { UAParser } from "ua-parser-js";
import supabase from "./supabase";

export async function getClicksForUrls(url_Ids) {
  if (!url_Ids || url_Ids.length === 0) return []; // Prevent unnecessary queries

  const { data, error } = await supabase // ✅ Added `await`
    .from("clicks")
    .select("*")
    .in("url_id", url_Ids);

  if (error) {
    console.error("Error fetching clicks:", error.message);
    throw new Error("Unable to fetch Clicks");
  }

  return data;
}

const parser = new UAParser();

export async function storeClicks({ id, originalUrl }) {
  console.log("storeClicks called with:", { id, originalUrl });
  try {
    const res = parser.getResult();
    const device = res.type || "Desktop";

    const response = await fetch("https://ipapi.co/json");
    const { city, country_name: country } = await response.json();

    await supabase.from("clicks").insert({
      url_id: id,
      city,
      country,
      device,
    });

    window.location.href = originalUrl;
  } catch (error) {
    console.log("Error recording clicks", error.message);
    throw new Error(error.message);
  }
}

export async function getClicksForSingleURL(url_id) {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .eq("url_id", url_id);

  if (error) {
    console.log(error.message);
    throw new Error("Error loading Clicks");
  }

  return data;
}
