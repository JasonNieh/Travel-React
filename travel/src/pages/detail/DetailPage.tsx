import { Match } from "@testing-library/react";
import React from "react";
import { useParams } from "react-router";

type MatchParams = {
    touristRouteId: string,
}

export const DetailPage: React.FC = () => {
    var params = useParams<MatchParams>();
    return (
        <h1>This is the Detail Page of id: {params.touristRouteId}</h1>
    );
}