import React from "react";
import logo from "../../assets/images/logo.svg";
import styles from "./Header.module.css";
import { Typography, Layout, Input, Menu, Button, Dropdown } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { withRouter, RouteComponentProps } from "../../helper/withRouter";
import store from "../../redux/store";
import { languageState } from "../../redux/language/languageReducer";
import { WithTranslation, withTranslation } from "react-i18next";
import { changeLanguageCreator, addLanguageCreator } from "../../redux/language/languageActions";
import { connect, MapStateToProps } from "react-redux";
import { RootState } from "../../redux/store";
import { Dispatch } from "redux";
interface State extends languageState { };

const mapStateToProps = (state: RootState) => {
    return {
        language: state.language.language,
        languageList: state.language.languageList,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        changeLanguage: (code: "en" | "zh") => {
            const action = changeLanguageCreator(code);
            dispatch(action);
        },
        addLanguage: (name: string, code: string) => {
            const action = addLanguageCreator(name, code);
            dispatch(action);
        },
    };
};

type PropsType = RouteComponentProps & WithTranslation & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
class HeaderComponent extends React.Component<PropsType>{

    menuHandleClick = (e) => {
        if (e.key === "new") {
            this.props.addLanguage("New Language", "new_lang");
        }
        else {
            this.props.changeLanguage(e.key);
        }
    }
    render() {
        const { navigate, t } = this.props;
        return (
            <div className={styles['app-header']}>
                <div className={styles['top-header']}>
                    <div className={styles.inner}>
                        <Typography.Text style={{ color: 'grey' }}>{t("header.slogan")}</Typography.Text>
                        <Dropdown.Button
                            style={{ marginLeft: 15 }}
                            overlay={
                                <Menu onClick={this.menuHandleClick}
                                    items={[...this.props.languageList.map(l => {
                                        return { key: l.code, label: l.name };
                                    }), { key: "new", label: t("header.add_new_language") }]}
                                />
                            }
                            icon={<GlobalOutlined />}
                        >
                            {this.props.language === "zh" ? "中文" : "English"}
                        </Dropdown.Button>
                        <Button.Group className={styles['button-group']}>
                            <Button onClick={() => { navigate("/register") }}>{t("header.register")}</Button>
                            <Button onClick={() => { navigate("/signin") }}>{t("header.signin")}</Button>
                        </Button.Group>
                    </div>
                </div>

                <Layout.Header className={styles['main-header']}>
                    <img src={logo} alt="" className={styles["App-logo"]} />
                    <Typography.Title level={3} className={styles.title}>{t("header.title")}</Typography.Title>
                    <Input.Search placeholder={t("header.search_place_holder")} className={styles['search-input']} />
                </Layout.Header>
                <Menu
                    mode={"horizontal"}
                    className={styles["main-menu"]}
                    items={[
                        { key: "1", label: t("header.home_page") },
                        { key: "2", label: t("header.weekend") },
                        { key: "3", label: t("header.group") },
                        { key: "4", label: t("header.backpack") },
                        { key: "5", label: t("header.private") },
                        { key: "6", label: t("header.cruise") },
                        { key: "7", label: t("header.hotel") },
                        { key: "8", label: t("header.local") },
                        { key: "9", label: t("header.theme") },
                        { key: "10", label: t("header.custom") },
                        { key: "11", label: t("header.study") },
                        { key: "12", label: t("header.visa") },
                        { key: "13", label: t("header.enterprise") },
                        { key: "14", label: t("header.high_end") },
                        { key: "15", label: t("header.outdoor") },
                        { key: "16", label: t("header.insurance") },
                    ]}
                />

            </div>
        );
    }
}

export const Header = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(HeaderComponent)));