import { useAtom } from "jotai";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";

import { loginModalAtom } from "@/state/utilities.state";

import { profileAtom, userAtom } from "../../state/auth.state";

export const Header: FC = () => {
  const router = useRouter();
  const [profile] = useAtom(profileAtom);
  const [, setLoginModal] = useAtom(loginModalAtom);
  const [avatorSrc, setAvatorSrc] = useState<string>();
  const [user] = useAtom(userAtom);
  const delQuery = (url: string) => {
    return url.split("?")[0];
  };
  const { asPath } = router;
  const currentPath = delQuery(asPath);

  useEffect(() => {
    const src = profile && profile.avatar_url ? profile.avatar_url : "/default-avatar.jpg";
    setAvatorSrc(src);
  }, [profile]);

  return (
    <header className="relative z-50 py-3">
      <div className="mx-auto flex justify-end px-5 md:px-8">
        <div className="relative flex items-center gap-5">
          <button
            onClick={() => {
              setLoginModal(true);
            }}
            className="flex h-10 w-10 items-center justify-center gap-3 rounded-full border border-gray-700 bg-gray-800 font-bold text-gray-400"
          >
            <FaBell />
          </button>
        </div>
      </div>
    </header>
  );
};
