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
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import { Dispatch } from "redux";
import {
    fetchRecommendProductStartActionCreator,
    fetchRecommendProductSuccessActionCreator,
    fetchRecommendProductFailActionCreator,
    giveMeDataActionCreator
} from "../../redux/recommendProducts/RecommendProductActions";

axios.defaults.headers['x-icode'] = "63BAC72C6C13D16B";

const mapStateToProps = (state: RootState) => {
    return {
        loading: state.recommendProducts.loading,
        error: state.recommendProducts.error,
        productList: state.recommendProducts.productList,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        giveMedata: () => {
            dispatch(giveMeDataActionCreator());
            //Here if parameter dispatch is defined by Dispatch from redux then it would be wrong.
        }
    }
}
type PropsType = RouteComponentProps & WithTranslation & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

class HomePageComponent extends React.Component<PropsType> {

    componentDidMount() {
        this.props.giveMedata();
    }
    render() {
        const { t, loading, error, productList } = this.props;
        // console.log(this.props.navigate);
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
export const HomePage = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(HomePageComponent)));