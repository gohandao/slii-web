import { useAtom } from "jotai";
import type { FC, SetStateAction } from "react";
import { useEffect, useState } from "react";
import ReactCodeInput from "react-code-input";
import { toast } from "react-toastify";

import { LoginButton } from "@/components/elements/LoginButton";
import { BaseModal } from "@/components/modules/BaseModal";
import { supabase } from "@/libs/supabase";
import { authUserAtom } from "@/state/auth.state";
import { loginModalAtom } from "@/state/utilities.state";

export const LoginModal: FC = () => {
  const [loginModal, setLoginModal] = useAtom(loginModalAtom);
  const [, setAuthUser] = useAtom(authUserAtom);
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
        if (error) {
          toast.error("Failed.");
          throw error;
        }
        setSentCode(true);
        setOtpToken("");
        toast.success("We sent verification code!");
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
        const {
          data: { user },
        } = await supabase.auth.verifyOtp({
          email: email,
          token: otpToken,
          type: "magiclink",
        });
        if (!user) {
          toast.error("Login failed.");
        } else {
          setAuthUser(user);
          toast.success("Login success!");
        }
        setLoginModal(false);
      }
    } catch (error: any) {
      console.log(error.error_description || error.message);
    } finally {
      setChecking(false);
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
      <div className="flex flex-col py-2">
        <div className="mx-auto flex w-full max-w-[400px] flex-col gap-4 text-center">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-medium text-gray-900">Login easily</h1>
            <p className="text-sm text-gray-400">You can login with only email.</p>
          </div>
          <input
            className="block w-full rounded-lg border border-gray-300 bg-slate-50 px-5 py-3 "
            type="email"
            placeholder="Your email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              sentCode && setSentCode(false);
              return setEmail(e.target.value);
            }}
          />
          <div className="inline-flex flex-col justify-center gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                !sentCode && handleLogin(email);
              }}
              className=""
              disabled={loading}
            >
              <LoginButton property={sentCode}>
                {loading ? "Sending..." : sentCode ? "Sent code" : "Send verify code"}
              </LoginButton>
            </button>
            {sentCode && (
              <div className="flex justify-center gap-2 text-center text-sm">
                <p className="text-gray-400">Please check your email box.</p>
                <button
                  className="text-sky-500 underline transition-all duration-200 hover:no-underline"
                  onClick={() => {
                    setSentCode(false);
                  }}
                >
                  Resend.
                </button>
              </div>
            )}
          </div>
          {sentCode && (
            <div className="flex flex-col gap-2">
              <p className="mt-3 mb-1 text-center text-xl font-medium text-gray-900">Verify code</p>
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
              <div className="mt-4 inline-flex justify-center">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleVerify();
                  }}
                  className=""
                  disabled={checking}
                >
                  <LoginButton>{checking ? "Checking" : "Login"}</LoginButton>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </BaseModal>
  );
};
