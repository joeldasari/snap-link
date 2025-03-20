import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "@/db/supabase";
import { SignInWithGoogle } from "@/db/auth";
import { Button } from "@/components/ui/button";

const AuthPage = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  console.log(session);

  if (!session) {
    return (
      <div className="flex flex-col items-center gap-8 h-[75vh] py-24">
        {searchParams.get("createNew") ? (
          <>
            <h1 className="text-center text-xl xl:text-2xl font-bold bg-gradient-to-b from-foreground to-gray-400 text-transparent bg-clip-text">
              Please Sign In with Google to Shorten Your Link
            </h1>
            <Button
              className="cursor-pointer transition-colors duration-150 flex items-center gap-2"
              onClick={SignInWithGoogle}
            >
              <img
                src="/google-icon.png"
                alt="google-icon"
                className="w-6 h-6"
              />
              <span>Sign in with Google</span>
            </Button>
          </>
        ) : (
          <>
            <h1 className="text-center text-xl xl:text-2xl font-bold bg-gradient-to-b from-foreground to-gray-400 text-transparent bg-clip-text">
              Sign In with Google to Get Started
            </h1>
            <Button
              className="cursor-pointer transition-colors duration-150 flex items-center gap-2"
              onClick={SignInWithGoogle}
            >
              <img
                src="https://cdn-icons-png.freepik.com/256/16509/16509564.png?semt=ais_hybrid"
                alt="google-icon"
                className="w-6 h-6"
              />
              <span>Sign in with Google</span>
            </Button>
          </>
        )}
      </div>
    );
  } else {
    navigate("/dashboard");
  }
};

export default AuthPage;
