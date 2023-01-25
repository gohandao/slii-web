import { useAtom } from "jotai";
import type { FC, SetStateAction } from "react";
import { useEffect, useState } from "react";
import ReactCodeInput from "react-code-input";

import { BaseModal } from "@/components/modules/BaseModal";
import { supabase } from "@/libs/supabase";
import { loginModalAtom } from "@/state/utilities.state";

export const LoginModal: FC = () => {
  const [loginModal, setLoginModal] = useAtom(loginModalAtom);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [email, setEmail] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const [sentCode, setSentCode] = useState<boolean>(false);

  const handleLogin = async (email: string) => {
    try {
      setLoading(true);
      if (supabase) {
        const { error } = await supabase.auth.signInWithOtp({ email: email });
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
        const { error } = await supabase.auth.verifyOtp({
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

  useEffect(() => {
    if (otpToken.length == 6) {
      handleVerify();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otpToken]);

  return (
    <BaseModal modalIsOpen={loginModal} setModalIsOpen={setLoginModal}>
      <div className="flex-center mx-auto flex w-full max-w-xl rounded bg-white px-8 pt-8 pb-10 ">
        <div className="mx-auto flex w-[400px] flex-col gap-4">
          <div className="">
            <h1 className="text-center text-2xl text-gray-900">Login with email </h1>
            <p className="text-center text-xs font-normal text-gray-400">You can login only with email.</p>
          </div>
          <input
            className="block w-full rounded-lg border border-gray-300 bg-slate-50 px-5 py-3 "
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
              <p className="mt-3 mb-1 text-center text-lg text-gray-900">Verify code</p>
              <ReactCodeInput
                type="number"
                fields={6}
                name={""}
                inputMode={"numeric"}
                value={otpToken}
                autoFocus={false}
                onChange={(e: SetStateAction<string>) => {
                  return setOtpToken(e);
                }}
                className="no-spin"
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
