import React, { Component } from 'react';
import { View, Image, StyleSheet, ImageBackground,Dimensions, Text } from 'react-native';

class BImg extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
  const { params } = this.props;
   const item =   this.props
  
    return (
      <View style={styles.cover}>
         <Image resizeMode="contain" style={styles.imgsize}  source={item.Image}/> 
         <Image resizeMode="contain" style={styles.imgsize}  source={item.Image1}/>  
         <Image resizeMode="contain" style={styles.imgsize}  source={item.Image2}/>   
      </View>
    );
  }
}


const styles = StyleSheet.create({
  cover: {
    flex:1,
    flexDirection:"row",
    marginTop:10
  },
  imgsize :{
    width: Dimensions.get('screen').width / 3 - 10,
    height: 100, margin: 5
    // width:80,
    // height:80
  }

  });

export default BImg;