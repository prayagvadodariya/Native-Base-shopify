import React, { useState } from 'react';
import { View, Image, StyleSheet, FlatList,TextInput, TouchableOpacity, ImageBackground, Dimensions, SafeAreaView,TouchableHighlight, Text, ScrollView } from 'react-native';
import { AntDesign, Entypo, EvilIcons, FontAwesome } from '@expo/vector-icons';


const Button = (props) => {
        
    return (
     
        <View style={styles.inputView} >
         <TouchableOpacity onPress={props.onPress}>
            <Text style={styles.inputText}>{props.children}</Text>
         </TouchableOpacity>
        </View>
  
    );
  
}


const styles = StyleSheet.create({

inputView: {
    flex:1,
    marginTop: 25,
    marginLeft:20,
    marginRight:20,
    backgroundColor:"#5e290e",
    borderRadius:30,
    // height:50,
    marginBottom:20,
    borderColor:'#5e290e',
    borderWidth:1,
    justifyContent:"center",
    padding:15
},
inputText:{
   textAlign:"center",
   color:"#fff"
},

});

export default Button;