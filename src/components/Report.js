import React, { Component } from 'react'
import { ListView, View, Text, TouchableOpacity } from 'react-native'
import moment from 'moment';
import { Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'

import style from './CartStyles'

const EmptyCart = () => (
  <View style={style.emptyCart}>
    <Text>{`Refresh\n    atau\nInput produk`}</Text>
  </View>
)

class Report extends Component {

  displayReport() {
    console.log(this.props.transactionList)
    return (
      <ListView
        enableEmptySections
        style={style.CartProductContainer}
        dataSource={this.props.transactionList}
        renderRow={rowData => (
          
          <View style={{ borderBottomWidth: 0.5, borderColor: 'grey' }}>
            { rowData.uid.search(this.props.searchText) != -1 ?
            <View style={{ borderBottomWidth: 0.5, borderColor: 'grey' }}>
              <View style={style.CartItem}>
                <Text style={{ padding: 5, paddingLeft: 15, flex: .6 }}>
                  Kode Transaksi
                </Text>

                <Text style={{ flex: .5 }}>
                  {rowData.payment}
                </Text>

                <Text style={{ flex: .5 }}>
                  Waktu
                </Text>
              </View>

              <View style={style.CartItem}>
                <Text style={{ padding: 5, paddingLeft: 15, flex: .6, fontWeight: 'bold' }}>
                  {rowData.uid.substr(1, 6)}
                </Text>

                <Text style={{ flex: .5, fontWeight: 'bold' }}>
                  {rowData.bayar}
                </Text>

                <Text style={{ flex: .5, fontWeight: 'bold' }}>
                  {moment(rowData.createdAt).format('YYYY-MM-DD HH:mm')}
                </Text>
              </View>
            </View>
            : null
            }
          </View>
        )}
      />
    )
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
        <View style={{ flex: 3 }}>
          {this.displayReport()}
        </View>
      </View>
    )
  }
}

const styles = {
  footerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#66cccc',
  },
  viewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    padding: 10,
    position: 'relative'
  },
  textStyle: {
    fontSize: 20,
    fontFamily: 'Avenir'

  }
}

export default Report

