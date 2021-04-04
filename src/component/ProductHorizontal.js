import React, { useState } from 'react';
import { View, Image, StyleSheet, FlatList, TouchableOpacity, ImageBackground, Dimensions, SafeAreaView,TouchableHighlight, Text, ScrollView } from 'react-native';
import { AntDesign, Entypo, EvilIcons, FontAwesome } from '@expo/vector-icons';
import * as StaticData from '../constants/StaticData';


const ProductHorizontal = () => {
  // const [isVisible, setIsVisible] = useState(true);    

    return (
      <View style={styles.product} >  
          <FlatList  horizontal={true}
              // numColumns={2}
              data={StaticData.Product_Details_List}  
              keyExtractor={(item, index) => String(index)} 
              renderItem={({item}) => 
                <TouchableOpacity> 
                  <Image source={item.Image} style={{ width: Dimensions.get('screen').width / 2 - 20, height: 250, margin: 10, }} /> 
                    <Text style={styles.itemtitle}>{item.title}</Text> 
                    <View style={styles.cover}>
                      <Text style={styles.itemtitle1}>{item.amount}</Text>
                      <TouchableOpacity>
                        <AntDesign  style={{ marginLeft:10,marginTop:13}} name="hearto" color="29110d" size={15} />
                      </TouchableOpacity>  
                    </View>
                </TouchableOpacity>}/>  
      </View>
  
    );
  
}


const styles = StyleSheet.create({

  cover: {
    flex:1,
    flexDirection:"row",
    justifyContent:"center"
  },
  itemtitle: {
    textAlign:"center",
    color:"#29110d",
    fontSize:15,
    fontWeight:"bold",  
  },
  itemtitle1: {
    color:"#29110d",
    marginTop:10,
    fontSize:15,
  },
  product: {
    marginTop:20,
    marginBottom:20
  }

});

export default ProductHorizontal;