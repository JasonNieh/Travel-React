import React from "react";
import styles from "./ShoppingCart.module.css";
import { MainLayout } from "../../layouts/mainLayout";
import { Row, Col, Affix } from "antd";
import { ProductList, PaymentCard } from "../../components";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import { clearShoppingCartItem } from "../../redux/shoppingCart/slice";

export const ShoppingCart: React.FC = (props) => {
  const shoppingCartItems = useSelector(state => state.shoppingCart.items);
  const loading = useSelector(state => state.shoppingCart.loading);
  const jwt = useSelector(s => s.user.token);
  const dispatch = useAppDispatch();

  return (
    <MainLayout>
      <Row>
        {/* 购物车清单 */}
        <Col span={16}>
          <div className={styles["product-list-container"]}>
            <ProductList
              data={shoppingCartItems.map(s => s.touristRoute)}
            />
          </div>
        </Col>
        {/* 支付卡组件 */}
        <Col span={8}>
          <Affix>
            <div className={styles["payment-card-container"]}>
              <PaymentCard
                loading={loading}
                originalPrice={shoppingCartItems
                  .map(s => s.originalPrice)
                  .reduce((a, b) => a + b, 0)}
                price={shoppingCartItems
                  .map(s => s.originalPrice * (s.discountPresent ? s.discountPresent : 1))
                  .reduce((a, b) => a + b, 0)}
                onCheckout={() => { }}
                onShoppingCartClear={
                  () => dispatch(clearShoppingCartItem({ jwt, itemId: shoppingCartItems.map(s => s.id) }))}
              />
            </div>
          </Affix>
        </Col>
      </Row>
    </MainLayout>
  );
};
