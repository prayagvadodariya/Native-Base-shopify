import React, { useState } from 'react';
import { View, Image, StyleSheet, FlatList, TouchableOpacity, Dimensions, Text } from 'react-native';
import { AntDesign, Entypo, Ionicons, Feather, EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';



const account = () => {

    
    // const [isVisible, setIsVisible] = useState(true);
   const navigation = useNavigation();

    return (
        <View>
            <View style={styles.cover}>
                <View style={styles.sept}>
                    <Text style={styles.t1}>PROFILE</Text>
                    <Text style={styles.t2}>Test dev</Text>
                    <Text style={styles.t3}>textdev301@gmail.com</Text>
                </View>
                <View style={styles.editcontent}>
                    <TouchableOpacity style={styles.edit}>
                        <AntDesign style={styles.icon} name="edit" color='#3b2322' size={25}  />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.layout}>
               <View style={styles.innerlayout}>
                    <Feather style={styles.icon1} name="shopping-bag" color='gray' size={18}/>
                    <Text style={styles.t4}>My Orders</Text>
                    <View style={styles.icon2}><AntDesign  name="right" color='gray' size={18}  /></View>
               </View>
               <View style={styles.innerlayout}>
                    <AntDesign style={styles.icon1} name="hearto" color='gray' size={18}/>
                    <Text style={styles.t4}>Wishlist</Text>
                    <View style={styles.icon2}><AntDesign  name="right" color='gray' size={18}  /></View>
               </View>
               <TouchableOpacity style={styles.innerlayout} onPress={ () => navigation.navigate('ScreenStack', { screen: 'MyAddress' })}>
                    <Ionicons style={styles.icon1} name="md-location-outline" color='gray' size={18}/>
                    <Text style={styles.t4}>My Addresses</Text>
                    <View style={styles.icon2}><AntDesign  name="right" color='gray' size={18}  /></View>
               </TouchableOpacity>
               <View style={styles.innerlayout}>
                    <Feather style={styles.icon1} name="lock" color='gray' size={18}/>
                    <Text style={styles.t4}>Change Password</Text>
                    <View style={styles.icon2}><AntDesign  name="right" color='gray' size={18}  /></View>
               </View>
               <View style={styles.innerlayout}>
                    <AntDesign style={styles.icon1} name="logout" color='gray' size={18}/>
                    <Text style={styles.t4}>Logout</Text>
                    <View style={styles.icon2}><AntDesign  name="right" color='gray' size={18}  /></View>
               </View>
            </View>
        </View>
    );
  }

const styles = StyleSheet.create({
  cover: {
    margin:10,
    // marginLeft:10,
    flexDirection:"row",
    height:120,
    borderRadius:10,
    backgroundColor:"#e3c4aa"
  },
  sept: {
    flexDirection:"column"
  },
  t1: {
    fontSize:25,
    fontFamily:"Roboto",
    marginTop:20,
    marginLeft:10,
  },
  t2: {
    fontSize:16,
    fontFamily:"about",
    marginTop:7,
    marginLeft:10
  },
  t3: {
    fontSize:16,
    fontFamily:"about",
    marginTop:4,
    marginLeft:10
  },
  t4: {
    marginLeft:15,
    fontWeight:"bold"
  },
  editcontent: {
    flex:1,
    alignItems:"flex-end",
    marginRight:20,
    justifyContent:"center"
  },
  edit: {
    borderRadius:25,
    borderColor:"#5e290e",
    borderWidth:2,
    width:55,
    height:45,
    alignItems:"center",
    backgroundColor:"transparent"
  },
  icon: {
   marginTop:5
  },
  icon1: {
    marginLeft:10,
  },
  icon2: {
    flex:1,
    marginRight:20,
    alignItems:"flex-end"
  },
  layout: {
    marginTop:20,
    margin:10,
    backgroundColor:"#fff"
  },
  innerlayout: {
    flexDirection:"row",
    marginTop:15,
    marginBottom:15
  }
});    

export default account;