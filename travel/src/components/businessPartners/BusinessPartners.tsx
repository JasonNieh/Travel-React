import React from "react";
import styles from "./BusinessPartners.module.css";
import { Divider, Typography, Row, Col } from "antd";


import image1 from "../../assets/images/microsoft.png";
import image2 from "../../assets/images/youtube.png";
import image3 from "../../assets/images/instagram.png";
import image4 from "../../assets/images/facebook.png";

const companies = [
    { src: image1, title: "Microsoft" },
    { src: image2, title: "Youtube" },
    { src: image3, title: "Ins" },
    { src: image4, title: "Facebook" }
]
export const BusinessPartners: React.FC = (props) => {
    return (
        <div className={styles.content}>
            <Divider orientation="left">
                <Typography.Title level={3}>合作企业</Typography.Title>
            </Divider>
            <Row>
                {companies.map((c, index) => (
                    <Col span={6} key={"bussiness-partner-" + index}>
                        <img
                            alt="bussiness-partner"
                            src={c.src}
                            style={{
                                width: "80%",
                                display: "block",
                                marginLeft: "auto",
                                marginRight: "auto",
                            }}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    );
};
