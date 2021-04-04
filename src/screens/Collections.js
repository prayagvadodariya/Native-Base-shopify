import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, Component} from 'react';
import { StyleSheet, Text, View,Button, TextInput, ImageBackground, Dimensions, Image, FlatList, TouchableOpacity, ScrollView  } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import ProductHorizontal from '../component/ProductHorizontal';
import shopify from '../config/shopify';
import Loader from '../component/Loader';
const defaultimg = 'https://cdn.shopify.com/s/files/1/1317/9855/products/image_73e2d385-0629-467b-b5d8-53e2882348c2_1024x1024@2x.jpg?v=1615670259'

const Collections = () => {
  const [isVisible, setIsVisible] = useState(true);
  const navigation = useNavigation();
  const [isload, loading] = useState(true);
  const [collectionList, setData] = useState(null);
 


  useEffect(() => {
    shopify.collection.fetchAllWithProducts().then((collections) => {
    setData(collections),
    loading(false);
    }).catch((error)=> {console.log("error",error);})
  }, []);
  
   
  
  if(isload===true && !collectionList ){
    return (
      <Loader/>
    )
  }
    return (
      console.log("data", collectionList),
     
          <View >
          
            <View>
              <Text style={styles.head}>COLLECTIONS</Text>
            </View>
            <ScrollView>
            <View style={styles.product} >  
                  <FlatList  horizontal={false}
                      numColumns={2}
                      data={collectionList}  
                      renderItem={({item}) => 
                      {
                      return (
                        <TouchableOpacity onPress={() => navigation.navigate('ScreenStack', { screen: 'ProductList', params: { collectionid: item.id }, })}> 
                          <ImageBackground source={{uri: item.image?.src ||defaultimg }} style={{ width: Dimensions.get('screen').width / 2 - 20, height: 160, margin:10}} imageStyle={{ borderRadius: 0}}>
                            <View style={styles.textcontent}>
                         
                              <Text style={styles.t1}>{item.title}</Text>
                            </View>
                          </ImageBackground> 
                            
                        </TouchableOpacity>)}}/>  
              </View> 

            </ScrollView>
          
            
     </View>
    );
  }


const styles = StyleSheet.create({
  head: {
    fontSize:28,
    fontFamily:'Roboto',
    color:"#1c4252",
    fontWeight:"bold",
    marginTop:10,
    textAlign:'center',
  },
  product: {
    marginTop:20,
    marginBottom:20
  },
  textcontent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  t1: {
    fontSize:23,
    fontWeight:"bold",
    color:"#fff"
  },
  
});

export default Collections;