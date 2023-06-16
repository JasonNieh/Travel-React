import React from "react";
import { Typography, Layout } from "antd";


export const Footer: React.FC = () => {
    return (
        <Layout.Footer>
            <Typography.Title level={5} style={{ textAlign: "center" }}>
                Copyright @ React Travel
            </Typography.Title>
        </Layout.Footer>
    );
}