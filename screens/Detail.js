import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { useQuery } from "react-query";
import styled from "styled-components";
import { VictoryChart, VictoryLine, VictoryScatter } from "victory-native";
import { history, info } from "../api";
import { BLACK_COLOR } from "../colors";
import { Icon } from "../components/Coin";

const Container = styled.ScrollView`
    background-color: ${BLACK_COLOR};
`;

const Detail = ({
    navigation,
    route: {
        params: { symbol, id },
    },
}) => {
    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Icon
                    source={{
                        uri: `https://coinicons-api.vercel.app/api/icon/${symbol.toLowerCase()}`,
                    }}
                />
            ),
            // headerLargeTitle: true,
        });
    });

    const { isLoading: infoLoading, data: infoData } = useQuery(
        ["coinInfo", id],
        info
    );
    const { isLoading: historyLoading, data: historyData } = useQuery(
        ["coinHistory", id],
        history
    );
    const [victoryData, setVictoryData] = useState(null);

    useEffect(() => {
        if (historyData) {
            setVictoryData(
                historyData.map((price) => ({
                    x: new Date(price.timestamp),
                    y: price.price,
                }))
            );
        }
    }, [historyData]);
    console.log(victoryData);
    return (
        <Container>
            {victoryData ? (
                <VictoryChart height={360}>
                    <VictoryLine
                        animate
                        interpolation="monotoneX"
                        data={victoryData}
                        style={{ data: { stroke: "#1abc9c" } }}
                    />
                    <VictoryScatter
                        data={victoryData}
                        style={{ data: { fill: "#1abc9c" } }}
                    />
                </VictoryChart>
            ) : null}
        </Container>
    );
};

export default Detail;
