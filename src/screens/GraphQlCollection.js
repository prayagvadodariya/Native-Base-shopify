import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, Component} from 'react';
import { StyleSheet, Text, View,Button, TextInput, ImageBackground, Dimensions, Image, FlatList, TouchableOpacity, ScrollView  } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import ProductHorizontal from '../component/ProductHorizontal';
import { gql } from '@apollo/client';
import client from '../config/grapqlapi';
import Loader from '../component/Loader';
const defaultimg = 'https://cdn.shopify.com/s/files/1/1317/9855/products/image_73e2d385-0629-467b-b5d8-53e2882348c2_1024x1024@2x.jpg?v=1615670259'

const GraphQlCollection = () => {
  const [isVisible, setIsVisible] = useState(true);
  const navigation = useNavigation();
  const [isload, loading] = useState(true);
  const [isfirst, first] = useState(20);
  const [collectionList, setData] = useState(null);
 


  useEffect(() => {
          client
          .query({
            query: gql`
              query  {
                collections( first: ${isfirst}){
                  pageInfo {
                    hasNextPage
                  }
                  edges {
                    node {
                      handle
                      title
                      image {
                        src
                      }
                    }
                  }
                }
              }
            `
          })
          .then((results) => {
            setData(results.data.collections.edges)
            loading(false);
            console.log("netdatacheck", results);
          })
          .catch((error) => {
            console.error(error);
          });  
           
    },[])
   
  
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
                        <TouchableOpacity onPress={() => navigation.navigate('ScreenStack', { screen: 'GraphQlProduct', params: { collectionhandel: item.node.handle }, })}> 
                          <ImageBackground source={{uri: item.node.image?.src ||defaultimg }} style={{ width: Dimensions.get('screen').width / 2 - 20, height: 160, margin:10}} imageStyle={{ borderRadius: 0}}>
                            <View style={styles.textcontent}>
                         
                              <Text style={styles.t1}>{item.node.title}</Text>
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

export default GraphQlCollection;