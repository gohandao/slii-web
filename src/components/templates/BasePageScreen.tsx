import { useRouter } from "next/router";
import type { FC } from "react";

import { CollectionScreen } from "@/components/templates/CollectionScreen";
import { CreatorScreen } from "@/components/templates/CreatorScreen";

export const BasePageScreen: FC = () => {
  const router = useRouter();
  const { slug, username } = router.query;
  return (
    <>
      {username && <CreatorScreen />}
      {slug && <CollectionScreen />}
    </>
  );
};
