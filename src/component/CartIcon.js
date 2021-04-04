import React, { Component, useState } from 'react';
import { View, Image, StyleSheet, ImageBackground,TouchableOpacity, Text } from 'react-native';
import { AntDesign, Entypo, Ionicons, Feather, EvilIcons } from '@expo/vector-icons';
import { Badge, Icon } from 'react-native-elements';
import { connect } from 'react-redux';

const CartIcon = (props) => {
  
    let arr = props.cartlist.data
    let sum = arr.reduce(function(a,b){return parseInt(a) + parseInt(b.quantity)},0)

    console.log('dadacheckodiosia',arr);

    return (
        <View style={styles.row}>
            <AntDesign name="shoppingcart" color='#3b2322' size={26}/>
            <Badge value={sum} status="error"  containerStyle={{ position: 'absolute', top: -4, right: -4 }}/>
        </View>
    );
  }



const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },

 });

  const mapStateToProps = (state) => ({
    cartlist: state.cartItemReducer,
  });

export default connect(mapStateToProps,null) (CartIcon);