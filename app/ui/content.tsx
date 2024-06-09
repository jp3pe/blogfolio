import Image from "next/image";
import H2 from "@/app/ui/h2";
import P from "@/app/ui/p";

export type H2Type = {
  title: string;
};

export type PType = {
  content: string;
};

export default function Content() {
  return (
    <article className="flex flex-col">
      <H2 h2={{ title: "1. 가평의 대표 명소, 남이섬" }} />
      <Image
        src="/image-sample.webp"
        alt="sample image"
        width={500}
        height={500}
        className="m-auto mb-5"
      />

      <P
        p={{
          content: `남이섬은 가평의 대표적인 관광지로, 아름다운 자연경관과 다양한 액티비티를
        즐길 수 있는 곳입니다. 특히, 섬을 둘러싼 은행나무와 메타세쿼이아 길은
        사계절 내내 아름다운 모습을 자랑하며, 사진 찍기 좋은 장소로 유명합니다.
        남이섬은 또한 자전거 대여, 짚라인, 그리고 다양한 문화 공연 등 다양한
        활동을 제공합니다. 가족 단위나 연인들이 방문하기에 좋은 장소로
        추천드립니다.`,
        }}
      ></P>

      <H2 h2={{ title: "2. 아름다운 자연 속에서의 힐링, 아침고요수목원" }} />
      <Image
        src="/image-sample.webp"
        alt="sample image"
        width={500}
        height={500}
        className="m-auto"
      />
      <P
        p={{
          content: `아침고요수목원은 사계절 내내 다양한 꽃과 나무들이 어우러진 아름다운
        정원을 자랑합니다. 특히 봄철의 벚꽃과 여름철의 수국, 가을의 단풍, 겨울의
        눈꽃 축제는 각 계절마다 다른 매력을 선사합니다. 다양한 테마 정원과
        산책로가 있어 자연 속에서 힐링하며 여유로운 시간을 보낼 수 있습니다.
        사진 찍기 좋은 포인트도 많아 SNS에 공유하기에도 좋습니다.`,
        }}
      ></P>

      <H2 h2={{ title: "3. 전통과 현대가 어우러진 가평 쁘띠프랑스" }} />
      <Image
        src="/image-sample.webp"
        alt="sample image"
        width={500}
        height={500}
        className="m-auto"
      />
      <P
        p={{
          content: `쁘띠프랑스는 프랑스의 작은 마을을 재현한 테마파크로, 아기자기한 건물들과
        예쁜 조형물들이 많이 있습니다. 이곳에서는 다양한 프랑스 문화 체험
        프로그램과 공연을 즐길 수 있으며, 프랑스의 전통 음식을 맛볼 수도
        있습니다. 특히, 드라마 '별에서 온 그대'의 촬영지로도 유명해 많은
        관광객들이 방문하고 있습니다. 가족과 연인, 친구와 함께 방문하기에 좋은
        장소입니다.`,
        }}
      ></P>
    </article>
  );
}
