import { StatusBar } from 'expo-status-bar';
import React, {useState, Component} from 'react';
import { StyleSheet, Text, View,Button, TextInput, ImageBackground, Image, FlatList, TouchableOpacity, ScrollView  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as StaticData from '../constants/StaticData';
import { SearchBar } from 'react-native-elements';
import ProductHorizontal from '../component/ProductHorizontal';

const Search = () => {
  const [isVisible, setIsVisible] = useState(true);
  // const navigation = NavigationContainer();
  
    
    return (
      // <View>
      <>
          <View style={styles.searchbrlayout}>
          <SearchBar
          containerStyle={{backgroundColor: 'transparent', borderTopColor:'transparent', borderBottomColor:'transparent'}}
          inputContainerStyle= {{backgroundColor:"white", borderRadius:5, margin:-4}}
          inputStyle={{backgroundColor: 'white', fontSize:15}}
          placeholder="Search Product here..."
          style={styles.searchbr}
          // onChangeText={this.updateSearch}
          // value={search}
          />
          </View>
          <ScrollView>
            <View>
              <Text style={styles.head}>SHOP BY</Text>
            </View>
          
            <View style={styles.product} >  
                  <FlatList  horizontal={true}
                      // numColumns={2}
                      keyExtractor={(item, index) => String(index)} 
                      data={StaticData.Search_List}  
                      renderItem={({item}) => 
                        <TouchableOpacity> 
                          <ImageBackground source={item.Image} style={{ width: 160, height: 155, marginLeft:10}} imageStyle={{ borderRadius: 10}}>
                            <View style={styles.textcontent}>
                              <Text style={styles.t1}>{item.title}</Text>
                            </View>
                          </ImageBackground> 
                            
                        </TouchableOpacity>}/>  
              </View> 

              <View>
                <Text style={styles.t2}>RECENTLY VIEWED</Text>
                <Image resizeMode="contain" style={styles.bhhh} source={require('../assets/images/2.webp')}/> 
              </View>

              <ProductHorizontal/>

              <View>
                <Text style={styles.t2}>ACCESSORIES</Text>
                <Image resizeMode="contain" style={styles.bhhh} source={require('../assets/images/2.webp')}/> 
              </View>

              <ProductHorizontal/>

              <View style={styles.cover}>
                <TouchableOpacity style={styles.button}>
                  <View style={styles.l1}><Text style={styles.t3}>SELL ALL</Text></View>
                </TouchableOpacity>
              </View>

            </ScrollView>
            </>
            
    // </View>
    );
  }


const styles = StyleSheet.create({
  searchbrlayout: {
   margin:5
  },
  searchbr: {
    
    // backgroundColor:"#fff",
    // color:"#fff"
  },
  head: {
    fontSize:18,
    fontFamily:"Helvetica",
    // color:"#606060",
    fontWeight:"bold",
    marginTop:25,
    marginLeft:10
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
  t2: {
    fontSize:28,
    fontFamily:"Roboto",
    color:"#1c4252",
    marginTop:15,
    margin:15,
    textAlign:"center"
  },
  l1:{
    flex:1,
    alignItems:"center",
    justifyContent:"center"
  },
  t3: {
    fontSize:11,
    color:"#29110d",
    fontWeight:"bold"
  },
  bhhh: {
    width:"100%",
    height:20,
   },

  cover: {
    flex:1,
    alignItems:"center",
    justifyContent:"center"
  }, 
  button: {
    width:70,
    height:30,
    borderRadius:25,
    borderColor:"#29110d",
    backgroundColor:"#e7e4e4",
    borderWidth:1,
    marginBottom:15
  }
});

export default Search;