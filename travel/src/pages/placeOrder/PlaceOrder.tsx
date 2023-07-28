import React from "react";
import { Row, Col } from "antd";
import { MainLayout } from "../../layouts";
import { CheckOutCard, PaymentForm } from "../../components";

export const PlaceOrder: React.FC = (props) => {
    return (
        <MainLayout>
            <Row>
                <Col span={12}>
                    <PaymentForm />
                </Col>
                <Col span={12}>
                    {/* <CheckOutCard /> */}
                </Col>
            </Row>
        </MainLayout>
    );
}