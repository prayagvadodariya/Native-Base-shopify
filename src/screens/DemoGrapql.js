import React, { useEffect, useState, useCallback  } from 'react';
import { View, Image, StyleSheet, TextInput, FlatList, ActivityIndicator, TouchableOpacity, ImageBackground, Dimensions, SafeAreaView,TouchableHighlight, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as StaticData from '../constants/StaticData';
import { gql } from '@apollo/client';
import client from '../config/grapqlapi';
import Loader from '../component/Loader';
import { string } from 'prop-types';

const DemoGrapql = (props) => {
console.log('props', props);
 const [isload, loading] = useState(true);
 const [isinfinity, infinityloader] = useState(false)
 const [isresponse, response] = useState(null);
 const [isfirst, first] = useState(10);
 const [isafter, after] = useState(null)
 const [isListEnd, setIsListEnd] = useState(false);

 useEffect(() => {
  // if (!loading && !isListEnd) {
   console.log('getData');
  //   loading(true);
        client
        .query({
          query: gql`
            query  {
              products(after: ${isafter}, first: ${isfirst}){
                pageInfo {
                  hasNextPage
                }
                  edges{
                    cursor
                      node{
                          id
                          images(first: ${isfirst}){
                              edges{
                                  node {
                                      id
                                      src
                                  }
                              }
                          }
                      }
                  }
              }
            }
          `
        })
        .then((results) => {
          response(results.data.products.edges)
          after(results.data.products.edges[results.data.products.edges.length-1].cursor)
          loading(false);
          setIsListEnd(results.data.products.pageInfo.hasNextPage)
          console.log("netdatacheck", results);
        })
        .catch((error) => {
          console.error(error);
        });  
         
  },[])

  const getMoreData = () => {
    infinityloader(true);
    console.log('checknext', isListEnd);
    // console.log('getmoredata');
        client
        .query({
          query: gql`
            query  {
              products(after: "${isafter}", first: ${isfirst}){
                pageInfo {
                  hasNextPage
                }
                  edges{
                    cursor
                      node{
                          id
                          images(first: ${isfirst}){
                              edges{
                                  node {
                                      id
                                      src
                                  }
                              }
                          }
                      }
                  }
              }
            }
          `
        })
        .then((results) => {
          response([...isresponse, ...results.data.products.edges]);
          after(results.data.products.edges[results.data.products.edges.length-1].cursor)
          infinityloader(false);
          setIsListEnd(results.data.products.pageInfo.hasNextPage)
          console.log("seconddatacheck", results);
        })
        .catch((error) => {
          console.error(error);
        }); 
  }

    console.log('result', isresponse)

    const renderFooter =() => {
      return (
        <View style={styles.footer}>
          {isListEnd ? (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={getMoreData}
          //On Click of button load more data
          style={styles.loadMoreBtn}>
          <Text style={styles.btnText}>Load More</Text>
          {isinfinity ? (
            <ActivityIndicator
              color="white"
              style={{marginLeft: 8}} />
          ) : null}
        </TouchableOpacity>
         ) : null}
      </View>
      );
    };


    if(isload===true && !isresponse ){
      return (
        <Loader/>
      )
    }
    return(
        <View>
            <View>
              <Text style={styles.head}>Product List</Text>
            </View>
           
            <SafeAreaView style={styles.product} >  
                  <FlatList  horizontal={false}
                      numColumns={2}
                      data={isresponse} 
                      renderItem={({item, index}) => 
                      {
                      return (
                        <TouchableOpacity onPress={() => navigation.navigate('ScreenStack', { screen: 'ProductList', params: { collectionid: item.id }, })}> 
                          <ImageBackground source={{uri: item.node.images.edges[0].node?.src || StaticData.defaultimg }} style={{ width: Dimensions.get('screen').width / 2 - 20, height: 160, margin:10}} imageStyle={{ borderRadius: 0}}>
                            
                          </ImageBackground> 
                            
                        </TouchableOpacity>)}}
                        keyExtractor={(item, index) => String(index)}
                        ListFooterComponent={renderFooter}
                        // onEndReached={retrieveMore}
                        onEndReachedThreshold={0}                 
                        />  
              </SafeAreaView> 
     </View>
    )
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
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },    
}); 



export default DemoGrapql;