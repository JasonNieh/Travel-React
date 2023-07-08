import React from "react";
import styles from "./Home.module.css";
import { Header, Footer, SideMenu, Carousel, ProductCollection, BusinessPartners } from '../../components';
import { Row, Col, Typography } from "antd";
import sideImage from '../../assets/images/sider_2019_12-09.png';
import sideImage2 from '../../assets/images/sider_2019_02-04.png';
import sideImage3 from '../../assets/images/sider_2019_02-04-2.png';
// import { productList1, productList2, productList3 } from '../../mockup';

import { withRouter, RouteComponentProps } from "../../helper/withRouter";
import { WithTranslation, withTranslation } from "react-i18next";
import axios from "axios";
import { Spin } from "antd";

axios.defaults.headers['x-icode'] = "63BAC72C6C13D16B";
interface StateProps {
    loading: boolean;
    error: string | null;
    productList: any[];
}

class HomePageComponent extends React.Component<RouteComponentProps & WithTranslation, StateProps> {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: null,
            productList: [],
        }
    }
    async componentDidMount() {
        try {
            const { data } = await axios.get("http://123.56.149.216:8080/api/productCollections", {
                headers: {
                    'x-icode': "63BAC72C6C13D16B",
                }
            });
            this.setState({
                productList: data,
                loading: false,
                error: null,
            })
        } catch (e) {
            if (e instanceof Error) {
                this.setState({
                    loading: false,
                    error: e.message,
                });
            }
        }

    }
    render() {
        const { t } = this.props;
        // console.log(this.props.navigate);
        const { loading, error, productList } = this.state;
        if (loading) {
            return (
                <Spin
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
            return (
                <div>There's been an error:{error}</div>
            );
        }
        return (
            <>
                <Header />
                <div className={styles["page-content"]}>
                    <Row style={{ marginTop: 20 }}>
                        <Col span={6}>
                            <SideMenu />
                        </Col>
                        <Col span={18}>
                            <Carousel />
                        </Col>
                    </Row>
                    <ProductCollection
                        title={
                            <Typography.Title level={3} type="warning">
                                {t("home_page.hot_recommended")}
                            </Typography.Title>
                        }
                        sideImage={sideImage}
                        products={productList[0].touristRoutes}
                    />
                    <ProductCollection
                        title={
                            <Typography.Title level={3} type="danger">
                                {t("home_page.new_arrival")}
                            </Typography.Title>
                        }
                        sideImage={sideImage2}
                        products={productList[1].touristRoutes}
                    />
                    <ProductCollection
                        title={
                            <Typography.Title level={3} type="success">
                                {t("home_page.domestic_travel")}
                            </Typography.Title>
                        }
                        sideImage={sideImage3}
                        products={productList[2].touristRoutes}
                    />
                    <BusinessPartners />
                </div>
                <Footer />
            </>
        );
    }
}
export const HomePage = withTranslation()(withRouter(HomePageComponent));