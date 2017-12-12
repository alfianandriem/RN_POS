import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Text, View, ListView, TouchableOpacity } from "react-native";
import { Button, FormLabel, FormInput, Icon } from "react-native-elements";
import { width } from "../config/constants";
import DeliveryButton from "./Buttons/DeliveryButton";
import CollectionButton from "./Buttons/CollectionButton";

import style from "./CartStyles";

const EmptyCart = () => (
  <View style={style.emptyCart}>
    <Text>Please add items in order to proceed!</Text>
  </View>
)

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      productsList: this.ds.cloneWithRows(this.props.products)
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      productsList: this.ds.cloneWithRows(nextProps.products)
    });
  }

  removeItem = (product) => {
    let index = this.props.products.indexOf(product);
    if (product.quantity > 1) {
      this.props.removeSingleExistingItem(
        index,
        product,
        (product.quantity -= 1)
      );
    } else {
      this.props.removeCart(index, product);
    }
  }

  displayCart() {
    return (
      <ListView
        style={style.CartProductContainer}
        dataSource={this.state.productsList}
        renderRow={(product, rowID) => (
          <View style={{ borderBottomWidth: 0.2 }}>
            <View style={style.CartItem} key={rowID}>
              <Text style={{ flex: 0.1 }}>{product.quantity}x</Text>
              <Text style={{ padding: 10, flex: 0.5 }}>
                {product.product}
              </Text>
              <Text style={{ flex: 0.2 }}>
                Rp.{(product.quantity * product.price)}
              </Text>
              <TouchableOpacity
                style={{ flex: 0.2 }}
                onPress={() => {
                  this.removeItem(product);
                }}
              >
                <Icon size={15} reverse color="#66cccc" name="close" />
              </TouchableOpacity>
            </View>

          </View>
        )}
      />
    );
  }

  render() {
    console.log(this.props.products.valueOf())
    return (
      <View style={style.CartContainer}>
        <View>
          
        </View>
        <View style={{ flex: 3, padding: 10 }}>
          {this.props.products.length > 0 ? this.displayCart() : <EmptyCart />}
        </View>

        <View style={style.cartSummaryContainer}>
          <View style={style.accumulatorContainer}>
            <Text style={style.totalItems}>
              Total Items {this.props.totalItemsInCart}
            </Text>
            <Text style={style.totalPrice}>
              Total Rp.{this.props.totalPrice}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
