import { SplitLayout } from "@/components/layouts/SplitLayout";
import { IndexCategoryTabs } from "@/components/modules/CategoryTabs";
import { IndexHeader } from "@/components/modules/IndexHeader";
import { TinderCards } from "@/components/modules/TinderCards";

export const IndexPageTemplate = () => {
  return (
    <div>
      <SplitLayout>
        <div className="relative mx-auto flex w-full max-w-[400px] flex-col gap-4">
          <div className="flex flex-col gap-2">
            <IndexHeader />
            <IndexCategoryTabs />
          </div>
          <TinderCards />
        </div>
      </SplitLayout>
    </div>
  );
};
