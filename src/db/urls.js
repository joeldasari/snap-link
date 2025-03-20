import supabase, { supabaseUrl } from "./supabase";

export async function getUrls(user_id) {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id);
  if (error) {
    console.log(error.message);
    throw new Error("Unable to fetch URLs");
  }
  return data;
}

export async function deleteUrl(id) {
  const { data, error } = await supabase.from("urls").delete().eq("id", id);
  if (error) {
    console.log(error.message);
    throw new Error("Unable to fetch URLs");
  }
  return data;
}

export async function createUrl(
  { title, long_url, custom_url, user_id },
  qr_code
) {
  try {
    // Generate a random short URL (4-character code)
    const short_url = Math.random().toString(36).substring(2, 6);

    // Upload QR code to Supabase Storage
    const fileName = `qr-${short_url}.png`; // Ensuring a file extension
    const { error: uploadError } = await supabase.storage
      .from("qrs")
      .upload(fileName, qr_code);

    if (uploadError) throw new Error("QR Code upload failed");

    // Get public URL for the QR code
    const qr_url = `${supabaseUrl}/storage/v1/object/public/qrs/${fileName}`;

    // Insert short link details into the database
    const { data, error } = await supabase
      .from("urls")
      .insert([
        {
          title,
          original_url: long_url,
          custom_url,
          user_id,
          short_url,
          qr: qr_url,
        },
      ])
      .select();

    if (error) throw new Error(error.message);

    return data; // Return newly created URL data
  } catch (err) {
    console.error(err.message);
    throw new Error(err.message);
  }
}

// This function is to fetch the long URL from the database by using the id (either it is custom URL "id" or short URL "id") so that we can redirect the user to the original URL
export async function getLongUrl(id) {
  const { data, error } = await supabase
    .from("urls")
    .select("id, original_url")
    .or(`short_url.eq.${id}, custom_url.eq.${id}`)
    .single();
  if (error) {
    console.log(error.message);
    throw new Error("Error fetching Short Link");
  }
  return data;
}

// Getting the URL for the user to display it in the "Link Page"
export async function getUrl({ id, user_id }) {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("id", id)
    .eq("user_id", user_id)
    .single();

  if (error) {
    console.log(error.message);
    throw new Error("Short URL not found");
  }

  return data;
}
