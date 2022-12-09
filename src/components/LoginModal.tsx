import { useContext, useState } from "react";
import ReactCodeInput from "react-code-input";

import { BaseModal } from "@/components/BaseModal";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";
import { supabase } from "@/libs/supabase";

export const LoginModal = () => {
  const { loginModal, setLoginModal } = useContext(UtilitiesContext);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [email, setEmail] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const [sentCode, setSentCode] = useState<boolean>(false);

  const handleLogin = async (email: string) => {
    try {
      setLoading(true);
      if (supabase) {
        const { error } = await supabase.auth.signIn({ email });
        if (error) throw error;
        setSentCode(true);
        alert("We sent verification code!");
      }
    } catch (error) {
      //alert(error.error_description || error.message)
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    try {
      setChecking(true);
      if (supabase) {
        const { error } = await supabase.auth.verifyOTP({
          email: email,
          token: otpToken,
          type: "magiclink",
        });
        if (error) throw error;
        alert("Login success!");
      }
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setChecking(false);
      location.reload();
    }
  };
  return (
    <BaseModal modalIsOpen={loginModal} setModalIsOpen={setLoginModal}>
      <div className="flex-center mx-auto flex w-full max-w-xl rounded bg-gray-800 px-8 pt-8 pb-10 ">
        <div className="mx-auto flex w-[400px] flex-col gap-4">
          <div className="">
            <h1 className="text-center text-2xl text-gray-100">Login with email </h1>
            <p className="text-center text-xs text-gray-500">You can login only with email.</p>
          </div>
          <input
            className="block w-full rounded bg-white px-5 py-3"
            type="email"
            placeholder="Your email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              return setEmail(e.target.value);
            }}
          />
          <div className="flex justify-center">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleLogin(email);
              }}
              className="block rounded bg-blue-500 px-5 py-3 text-center text-blue-100"
              disabled={loading}
            >
              <span>{loading ? "Sending" : "Send verification code"}</span>
            </button>
          </div>
          {sentCode && (
            <div>
              <p className="mt-3 mb-1 text-center text-lg text-gray-100">Verify code</p>
              <ReactCodeInput
                type="text"
                fields={6}
                name={""}
                inputMode={"email"}
                value={otpToken}
                placeholder="000000"
                autoFocus={false}
                onChange={(e) => {
                  return setOtpToken(e);
                }}
              />
              <div className="mt-4 flex justify-center">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleVerify();
                  }}
                  className="block rounded bg-blue-500 px-10 py-3 text-center text-blue-100"
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
