import { Match } from "@testing-library/react";
import React from "react";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./DetailPage.module.css";
import { Col, Row, Spin, DatePicker, Space } from "antd";
import { Footer, Header } from "../../components";
import { ProductIntro } from "../../components/productIntro";
const { RangePicker } = DatePicker;
type MatchParams = {
    touristRouteId: string,
}

export const DetailPage: React.FC = () => {
    const { touristRouteId } = useParams<MatchParams>();
    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [product, setProduct] = useState<any>(null);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`);
                setLoading(false);
                setProduct(data);
            } catch (error) {
                setError(error instanceof Error ? error.message : "error");
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return (<Spin
            size="large"
            style={{
                marginTop: 200,
                marginBottom: 200,
                marginLeft: "auto",
                marginRight: "auto",
                width: "100%",
            }}
        />
        );
    }
    if (error) {
        return <div> There's been an error: {error} </div>
    }
    return (

        <>
            <Header />
            <div className={styles["page-content"]}>
                <div className={styles["product-intro-container"]}>
                    {/*Product Intro and Date Selection*/}
                    <Row>
                        <Col span={13}>
                            <ProductIntro
                                title={product.title}
                                shortDescription={product.description}
                                price={product.originalPrice}
                                coupons={product.coupons}
                                points={product.points}
                                discount={product.price}
                                rating={product.rating}
                                pictures={product.touristRoutePictures.map((p) => p.url)}
                            />
                        </Col>
                        <Col span={11}>
                            <RangePicker open
                                style={{ marginTop: 20 }}
                            />
                        </Col>
                    </Row>
                </div>
                <div className={styles["product-detail-anchor"]}>
                    {/*Anchor Menu*/}
                </div>
                <div id="feature" className={styles["product-detail-container"]}>
                    {/*Feature*/}
                </div>
                <div id="fees" className={styles["product-detail-container"]}>
                    {/*Fees*/}
                </div>
                <div id="notes" className={styles["product-detail-container"]}>
                    {/*Notice*/}
                </div>
                <div id="comments" className={styles["product-detail-container"]}>
                    {/*Review*/}
                </div>
            </div>
            <Footer />

        </>
    );
}