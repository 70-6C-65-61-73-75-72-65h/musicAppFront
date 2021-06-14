import { EuiFlexItem, EuiLink } from "@elastic/eui";
import { EuiCard } from "@elastic/eui/src/components/card/card";
import React, { ReactElement } from "react";
import { AudioData } from "../../types/redux/audio";
import AudioPlayer from "../AudioPlayer";

interface Props {
  item: AudioData;
}

export default function AudioItem({ item }: Props): ReactElement {
  return (
    <EuiFlexItem>
      <EuiCard
        textAlign="left"
        image={
          <div
            style={{
              backgroundColor: "purple",
              width: "400px",
              height: "200px",
              paddingBottom: "calc((height / width) * 100",
            }}
          ></div>
        }
        title={item?.compositionName}
        description={item?.author}
        footer={<AudioPlayer audioItem={item} key={item._id} />}
      />
    </EuiFlexItem>
  );
}
