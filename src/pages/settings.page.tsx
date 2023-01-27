import type { NextPage } from "next";

import { ArticleArea } from "@/components/layouts/ArticleArea";
import { SplitLayout } from "@/components/layouts/SplitLayout";

const Settings: NextPage = () => {
  return (
    <div>
      <SplitLayout>
        <ArticleArea>
          <div className="flex flex-col gap-2">
            <h2 className="items-baseline text-2xl font-bold">Settings</h2>
            <div className="flex rounded-xl bg-white p-5 shadow-xl shadow-gray-100">
              <p>Now preparing...</p>
            </div>
          </div>
        </ArticleArea>
      </SplitLayout>
    </div>
  );
};

export default Settings;
