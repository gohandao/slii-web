import { useAtom } from "jotai";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { ScreenModal } from "@/components/modules/ScreenModal";
import { BasePageScreen } from "@/components/templates/BasePageScreen";
import { IndexPageTemplate } from "@/components/templates/IndexPageTemplate";
import { screenModalAtom } from "@/state/utilities.state";

const Home: NextPage = () => {
  const router = useRouter();
  const [screenModal, setScreenModal] = useAtom(screenModalAtom);
  const { slug, username } = router.query;

  useEffect(() => {
    username || slug ? setScreenModal(true) : setScreenModal(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, slug]);
  return (
    <>
      {screenModal && (
        <ScreenModal>
          <BasePageScreen />
        </ScreenModal>
      )}
      <IndexPageTemplate />
    </>
  );
};

export default Home;
