import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { BaseLayout } from "@/components/BaseLayout";
import { CreatorScreen } from "@/components/CreatorScreen";
import { CreatorsIndexScreen } from "@/components/CreatorsIndexScreen";
import { ScreenModal } from "@/components/ScreenModal";

const Home: NextPage = () => {
  const router = useRouter();
  const { username } = router.query;
  const [screenModal, setScreenModal] = useState(false);

  useEffect(() => {
    setScreenModal(username ? true : false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  return (
    <div>
      <ScreenModal modalIsOpen={screenModal} setModalIsOpen={setScreenModal} path="/">
        <CreatorScreen />
      </ScreenModal>
      <BaseLayout>
        <CreatorsIndexScreen />
      </BaseLayout>
    </div>
  );
};

export default Home;
