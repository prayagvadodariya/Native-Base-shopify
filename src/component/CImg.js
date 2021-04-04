import React, { Component, useState } from 'react';
import { View, Image, StyleSheet, ImageBackground,TouchableOpacity, Text } from 'react-native';
import * as Font from 'expo-font';
import { useNavigation } from '@react-navigation/native'


const CImg = (props) => {
  // const [isVisible, setIsVisible] = useState(true);
  const navigation = useNavigation();


    return (
      <TouchableOpacity  onPress={() => navigation.navigate('ScreenStack', { screen: 'ProductList' })}>
        <ImageBackground
          style={styles.stretch}
          source={props.Image}>
              <View style={styles.buttom}>
              <Text style={styles.text1}>{props.name1}</Text>
              <Text style={styles.text2}>{props.name2}</Text>
              </View >
        </ImageBackground>
      </TouchableOpacity>
    );
  }



const styles = StyleSheet.create({
    stretch: {
      marginTop: 30,  
      width: "100%",
      height: 500,
      resizeMode: 'contain',
      // position: "relative",
    },
    buttom: {
      position: 'absolute',
      bottom: 0,
      width:"100%",
      height:110,
      backgroundColor:"rgba(94, 41, 14, 0.9)",
    },
    text1: {
      marginTop:12,
      fontSize:20,
      textAlign:"center",
      fontFamily:"text1",
      color:"#ffffff"
    },
    text2: {
        marginTop:1,
        fontSize:50,
        textAlign:"center",
        fontFamily:"text2",
        color:"#ffffff"
          
      },
  });

export default CImg;