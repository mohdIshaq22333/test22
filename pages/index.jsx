import { useEffect, useState } from "react";
import Card from "../components/card";
import Style from "styled-components";
import { dataState } from "../states/data";
import { useRecoilState } from "recoil";

export default function Home() {
  const [listState, setListState] = useRecoilState(dataState);

  return <MainDiv>{listState.title && <Card data={listState} />}</MainDiv>;
}
const MainDiv = Style.div`
padding:50px 20px 0px 20px;
`;
