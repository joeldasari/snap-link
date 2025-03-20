import supabase from "./supabase";

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

export async function SignInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window.location.origin + "/dashboard",
    },
  });
  if (error) {
    throw new Error(error.message);
  }
}

export async function getCurrentUser() {
  const user = supabase.auth.getUser();
  return user;
}
