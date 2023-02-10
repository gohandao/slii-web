import { useAtom } from "jotai";
import type { NextPage } from "next";

import { ArticleArea } from "@/components/layouts/ArticleArea";
import { SplitLayout } from "@/components/layouts/SplitLayout";
import { supabase } from "@/libs/supabase";
import { authUserAtom } from "@/state/auth.state";

const Settings: NextPage = () => {
  const [authUser] = useAtom(authUserAtom);
  return (
    <div>
      <SplitLayout>
        <ArticleArea>
          <div className="flex flex-col gap-2">
            <h2 className="items-baseline text-2xl font-bold">Settings</h2>
            <div className="flex rounded-xl bg-white p-5 shadow-xl shadow-gray-100">
              {authUser ? (
                <button
                  onClick={async () => {
                    await supabase.auth.signOut();
                  }}
                >
                  Logout
                </button>
              ) : (
                <p>There are no contents now.</p>
              )}
            </div>
          </div>
        </ArticleArea>
      </SplitLayout>
    </div>
  );
};

export default Settings;
