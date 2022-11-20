import { useContext, useEffect, useState } from "react";
import { supabase } from "@/libs/supabase";
import { BaseLayout } from "@/components/BaseLayout";
import Head from "next/head";
import ReactCodeInput from "react-code-input";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";
import router, { useRouter } from "next/router";
import { AuthContext } from "@/contexts/AuthContext";
import { useRedirections } from "@/utilities/useRedirections";
import { BaseModal } from "./BaseModal";

export const LoginModal = () => {
  const router = useRouter();
  const { prev } = router.query;

  const { user } = useContext(AuthContext);
  const { loginModal, setLoginModal } = useContext(UtilitiesContext);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [email, setEmail] = useState("");
  const [otpToken, setOtpToken] = useState("");

  const [sentCode, setSentCode] = useState<boolean>(false);

  const handleLogin = async (email: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      setSentCode(true);
      alert("We sent verification code!");
    } catch (error) {
      //alert(error.error_description || error.message)
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    try {
      setChecking(true);
      const { error } = await supabase.auth.verifyOTP({
        email: email,
        token: otpToken,
        type: "magiclink",
      });
      if (error) throw error;
      alert("Login success!");
    } catch (error) {
      // alert("Login failed!");
      //@ts-ignore
      alert(error.error_description || error.message);
    } finally {
      setChecking(false);
      location.reload();
    }
  };
  return (
    <BaseModal modalIsOpen={loginModal} setModalIsOpen={setLoginModal}>
      <div className="flex flex-center max-w-xl w-full mx-auto rounded bg-gray-800 pt-8 pb-10 px-8 ">
        <div className="w-[400px] mx-auto flex flex-col gap-4">
          <div className="">
            <h1 className="text-center text-2xl text-gray-100">
              Login with email{" "}
            </h1>
            <p className="text-center text-xs text-gray-500">
              You can login only with email.
            </p>
          </div>
          <input
            className="block px-5 py-3 rounded bg-white w-full"
            type="email"
            placeholder="Your email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/*<input
                className="block px-5 py-3 rounded bg-white w-full"
                type="text"
                placeholder="One-time password"
                value={otpToken}
                onChange={(e) => setOtpToken(e.target.value)}
  />*/}
          <div className="flex justify-center">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleLogin(email);
              }}
              className="block rounded bg-blue-500 text-blue-100 text-center px-5 py-3"
              disabled={loading}
            >
              <span>{loading ? "Sending" : "Send verification code"}</span>
            </button>
          </div>
          {sentCode && (
            <div>
              <p className="text-center text-lg text-gray-100 mt-3 mb-1">
                Verify code
              </p>
              <ReactCodeInput
                type="text"
                fields={6}
                name={""}
                inputMode={"email"}
                value={otpToken}
                placeholder="000000"
                autoFocus={false}
                onChange={(e) => setOtpToken(e)}
              />
              <div className="flex justify-center mt-4">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleVerify();
                  }}
                  className="block rounded bg-blue-500 text-blue-100 text-center px-10 py-3"
                  disabled={checking}
                >
                  <span>{checking ? "Checking" : "Login"}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </BaseModal>
  );
};
