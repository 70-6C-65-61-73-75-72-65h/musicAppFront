import React, { ReactElement, useEffect, useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { fetchAllAudio } from "../../redux/actions/audio.wrappers";
// import styles from "playingTracks.module.scss";

import { useHistory } from "react-router-dom";
import AudioItem from "../../components/AudioItem/AudioItem";
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiLink,
  EuiLoadingChart,
} from "@elastic/eui";
interface Props {}

export default function Catalog({}: Props): ReactElement {
  const audios = useTypedSelector((state) => state.audios.audios);
  const [fetching, setFetching] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (audios === null && !fetching) {
      // after that audios would be AudioData[]
      fetchAllAudio(setFetching, "error in fetching all audios");
    }
  }, [fetching, audios]);

  if (fetching) return <EuiLoadingChart size="xl" />;

  //   add classes to styling
  return (
    <main>
      {/* columns={2} */}
      <EuiFlexGroup gutterSize="l">
        {audios?.map((item) => <AudioItem item={item} />) && (
          <EuiFlexItem>
            There is no audios yet. You can
            <EuiLink
              color="secondary"
              onClick={() => {
                history.push("/create");
              }}
            >
              upload yours
            </EuiLink>
          </EuiFlexItem>
        )}
      </EuiFlexGroup>
    </main>
  );
}

//  <EuiCard
//         textAlign="left"
//         image={
//           <div style={{width:'400px'; height:'200px'; paddingBottom: 'calc((height / width) * 100';
// }}>
//             {/* <img
//               src="https://source.unsplash.com/400x200/?Nature"
//               alt="Nature"
//             /> */}
//           </div>
//         }
//         title={audioItem?.compositionName}
//         description={audioItem?.author}
//         footer={<AudioPlayer audioItem={item} key={item._id} />}
//       />

{
  /* <EuiPageTemplate
  restrictWidth={false}
  template="empty"
  pageHeader={{
    iconType: "logoElastic",
    pageTitle: "Page title",
    rightSideItems: [button, <EuiButton>Do something</EuiButton>],
  }}
>
 
  <EuiFlexGrid gutterSize="l">
    <EuiFlexItem>
      <EuiPanel style={{ height: 200 }}>
        <AudioPlayer audioItem={item} key={item._id} />
      </EuiPanel>
    </EuiFlexItem>
    <EuiFlexItem>
      <EuiPanel style={{ height: 200 }} />
    </EuiFlexItem>
    <EuiFlexItem>
      <EuiPanel style={{ height: 200 }} />
    </EuiFlexItem>
    <EuiFlexItem>
      <EuiPanel style={{ height: 200 }} />
    </EuiFlexItem>
  </EuiFlexGrid>
</EuiPageTemplate>; */
}
