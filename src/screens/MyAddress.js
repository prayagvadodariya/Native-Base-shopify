import React, { useState } from 'react';
import { View, Image, StyleSheet, TextInput, FlatList, TouchableOpacity, ImageBackground, Dimensions, SafeAreaView,TouchableHighlight, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as StaticData from '../constants/StaticData';
import { AntDesign, Entypo, Ionicons, Feather, EvilIcons } from '@expo/vector-icons';



const MyAddress = () => {
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const navigation = useNavigation(); 

    return (
            <View>
            <FlatList 
                    data={StaticData.Address_list} 
                    keyExtractor={(item, index) => String(index)} 
                    renderItem={({item, index}) => 
                    <View>
                      <View style={styles.cover}>
                        <Text style={{fontSize:18}}>{item.firstname}, {item.lastname}, {item.company}, {item.address1}, {item.address2}, {item.pincode}, {item.city}, {item.country}</Text>
                      </View>
                    
                    <View style={styles.cover2}>
                      <View style={{alignItems:'flex-start', flex:1}}>
                          <TouchableOpacity style={styles.edit} onPress={() => navigation.navigate('ScreenStack', { screen: 'AddEditAddress',  params: { data: item, active:false },})}>
                              <View style={{justifyContent:'center', flex:1}}><AntDesign name="edit" color='#3b2322' size={20} /></View>
                          </TouchableOpacity>
                      </View>
                      <View style={{alignItems:'flex-end', flex: 1}}>
                          <TouchableOpacity style={styles.edit1}>
                              <View style={{justifyContent:'center', flex:1}}><AntDesign name="delete" color='#3b2322' size={18} /></View>
                          </TouchableOpacity>
                      </View>    
                   </View>  
                  </View>
                }/>
                </View> 
                
    );
  
}


const styles = StyleSheet.create({
  cover: {
    marginLeft:20,
    marginRight:20,
    marginTop:20,
    backgroundColor: '#fff',
    paddingLeft:20,
    paddingRight:20,
    paddingTop:15,
    paddingBottom:15,
    borderColor:'#e2e2e2',
    borderRadius:5, 
    borderWidth:1
  },
  cover2: {
    marginLeft:20,
    marginRight:20,
    flexDirection:'row',
    backgroundColor: '#fff',
    padding:10,
    borderColor:'#e2e2e2',
    borderRadius:5,
    borderWidth:1
  },
 
  edit: {
    marginLeft:50,  
    borderRadius:25,
    borderColor:"#5e290e",
    borderWidth:1,
    width:55,
    height:45,
    alignItems:"center",
    backgroundColor:"#e7e4e4"
  },
  edit1: {
    marginRight:50,
    borderRadius:25,
    borderColor:"#5e290e",
    borderWidth:1,
    width:55,
    height:45,
    alignItems:"center",
    backgroundColor:"#e7e4e4"
  },
  

});

export default MyAddress;