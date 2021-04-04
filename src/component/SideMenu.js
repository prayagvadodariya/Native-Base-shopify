import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet,ScrollView, Text, View, TouchableOpacity } from "react-native";
import { AntDesign, Entypo, EvilIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';

const SideMenu =  (props) => {
    console.log('propsdata',props);
const [isVisible, setIsVisible] = useState(false);
// const navigation = useNavigation();
const toggleFunction = () => {
    setIsVisible(!isVisible);
};     

const close = () => {
    props.navigation.closeDrawer()
}

const shareFacebook = async () => {
    await WebBrowser.openBrowserAsync('https://www.facebook.com/');
    props.navigation.closeDrawer()
}

const shareInstagram = async () => {
    await WebBrowser.openBrowserAsync('https://www.instagram.com/');
    props.navigation.closeDrawer()
}

const sharePinterest = async () => {
    await WebBrowser.openBrowserAsync('https://www.pinterest.com/shopify/');
    props.navigation.closeDrawer()
}

    return (
        <View style={styles.container}>
            <ScrollView>
            <View>
                <Text style={styles.sectionHeadingStyle1}>Test Dev</Text>
                <Text style={styles.sectionHeadingStyle2}>testdev301@gmail.com</Text>
            </View>
            <View>
                <View style={styles.navSectionStyle1}>
                   <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => props.navigation.navigate("Home")}>
                        <View style={{backgroundColor:'#3b2322',height:"100%", width:3}}></View>
                        <Text style={styles.navItemStyle2}>Home</Text>
                    </TouchableOpacity>  
                </View>  
                <View style={styles.navSectionStyle}> 
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.navItemStyle}>Shop By</Text>
                        <View style={styles.icon}><AntDesign onPress={toggleFunction} name={isVisible===false  ? 'down' : 'up'} color='#3b2322' size={15}/></View>
                    </View>
                    {!isVisible ?<View style={{width:"100%",height:0.3,backgroundColor: 'rgb(218, 219, 214)'}}></View>:null }
                    <View style={styles.navSectionStyle}>{isVisible ? 
                        <>
                        <View style={styles.navSectionStyle}>  
                            <Text style={styles.navItemStyle1}>Tops</Text>
                        </View>
                        <View style={styles.navSectionStyle}>  
                            <Text style={styles.navItemStyle1}>Dress</Text>
                        </View>
                        <View style={styles.navSectionStyle}>  
                            <Text style={styles.navItemStyle1}>Shoes</Text>
                        </View>
                        <TouchableOpacity style={styles.navSectionStyle} onPress={() => props.navigation.navigate("menuScreenStack",{ screen: 'GraphQlCollection'},)}>  
                            <Text style={styles.navItemStyle1}>GraphQl Collection</Text>
                        </TouchableOpacity>
                        <View style={styles.navSectionStyle}>  
                            <Text style={styles.navItemStyle1}>Bottoms</Text>
                        </View>
                        <View style={styles.navSectionStyle}>  
                            <Text style={styles.navItemStyle1}>Outerwear</Text>
                        </View>
                        <View style={styles.navSectionStyle}>  
                            <Text style={styles.navItemStyle1}>Home Decor</Text>
                        </View>
                        <View style={styles.navSectionStyle}>  
                            <Text style={styles.navItemStyle1}>Bags</Text>
                        </View>
                        <View style={styles.navSectionStyle}>  
                            <Text style={styles.navItemStyle1}>Lounge Wear</Text>
                        </View>
                        <View style={styles.navSectionStyle}>  
                            <Text style={styles.navItemStyle1}>Ranch Kids</Text>
                        </View>
                        <View style={styles.navSectionStyle}>  
                            <Text style={styles.navItemStyle1}>Accessories</Text>
                        </View>
                        <View style={styles.navSectionStyle}>  
                            <Text style={styles.navItemStyle1}>Jewelry</Text>
                        </View>
                    </>: null}
                    </View> 
                </View>
                {isVisible ?<View style={{width:"100%",height:0.3,backgroundColor: 'rgb(218, 219, 214)'}}></View>:null }
                <TouchableOpacity style={styles.navSectionStyle} onPress={() => props.navigation.navigate("Search")}>  
                    <Text style={styles.navItemStyle}>Search</Text>
                </TouchableOpacity>
                <View style={{width:"100%",height:0.3,backgroundColor: 'rgb(218, 219, 214)'}}></View>
                <TouchableOpacity style={styles.navSectionStyle} onPress={() => props.navigation.navigate("Wishlist")}>  
                    <Text style={styles.navItemStyle}>Wishlist</Text>
                </TouchableOpacity>
                <View style={{width:"100%",height:0.3,backgroundColor: 'rgb(218, 219, 214)'}}></View>  
                <TouchableOpacity style={styles.navSectionStyle} onPress={() => props.navigation.navigate("ScreenStack",{ screen: 'Cart'},)}>  
                    <Text style={styles.navItemStyle}>Cart</Text>
                </TouchableOpacity> 
                <View style={{width:"100%",height:0.3,backgroundColor: 'rgb(218, 219, 214)'}}></View>
                <View style={styles.navSectionStyle}>  
                    <Text style={styles.navItemStyle}>Your Orders</Text>
                </View>
                <View style={{width:"100%",height:0.3,backgroundColor: 'rgb(218, 219, 214)'}}></View>
                <TouchableOpacity style={styles.navSectionStyle} onPress={() => props.navigation.navigate("menuScreenStack")}>  
                    <Text style={styles.navItemStyle}>Collection</Text>
                </TouchableOpacity>
                <View style={{width:"100%",height:0.3,backgroundColor: 'rgb(218, 219, 214)'}}></View>  
                <TouchableOpacity style={styles.navSectionStyle}  onPress={() => props.navigation.navigate("ScreenStack",{ screen: 'Account'},)}>  
                    <Text style={styles.navItemStyle}>Account</Text>
                </TouchableOpacity>
                <View style={{width:"100%",height:0.3,backgroundColor: 'rgb(218, 219, 214)'}}></View>
                <TouchableOpacity style={styles.navSectionStyle} onPress={() => props.navigation.navigate("DrawerScreenStack",{ screen: 'Login'},)}>  
                    <Text style={styles.navItemStyle}>Login</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.navSectionStyle} onPress={() => close()}>  
                    <Text style={styles.navItemStyle}>Logout</Text>
                </TouchableOpacity>       */}
            </View>

            </ScrollView>

            <View style={styles.footerContainer}>
                <Text style={styles.textsocial}>Let's get social</Text>
                <View style={styles.sharing}>
                    <TouchableOpacity style={styles.share} onPress={() => shareFacebook()}>
                       <View style={styles.shearicon}><FontAwesome name="facebook" color='#fff' size={20} /></View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.share} onPress={() => shareInstagram()}>
                    <View style={styles.shearicon}><AntDesign name="instagram" color='#fff' size={18}/></View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.share} onPress={() => sharePinterest()}>
                    <View style={styles.shearicon}><Entypo name="pinterest" color='#fff' size={18}/></View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>    
    );
}

const styles = StyleSheet.create({
   container: {
     paddingTop: 10,
     flex: 1
   },
   sectionHeadingStyle1: {
    marginTop:3,
    marginLeft:15,
    fontSize:23,
    color: 'gray',
    fontWeight: 'bold'
  },
  sectionHeadingStyle2: {
    marginTop:3,
    marginLeft:15,
    fontSize:17,
    marginBottom:10,
    color: 'gray',
  },
  icon: {
    flex:1,
    paddingRight:10,
    paddingBottom:10,
    paddingTop:13,
    alignItems:"flex-end"
   },
   navItemStyle: {
     paddingBottom: 10,
     paddingTop: 10,
     paddingLeft: 15,
     fontWeight:'bold',
   },
   navItemStyle1: {
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 23,
    fontWeight:'bold',
  },
  navItemStyle2: {
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 15,
    color: '#3b2322',
    fontWeight:'bold'
  },
   navSectionStyle: {
    //  backgroundColor: 'lightgrey',
     marginBottom:1
   },
   navSectionStyle1: {
     backgroundColor: 'rgb(226, 226, 226)',
     marginBottom:1
   },
   sectionHeadingStyle: {
    marginTop:3,
    marginLeft:15
  },
   footerContainer: {
     padding: 20,
  },
   sharing: {
     flexDirection:"row"
  },
   share: {
     borderRadius:35,
     width:35,
     height:35,
     margin:5,
    alignItems:"center",
     backgroundColor:"#5e290e"
  },
   shearicon:{
     flex:1,
     justifyContent:'center'
  },
   textsocial:{
     fontSize:15,
     fontWeight:'bold',
     color: '#1c4252'
   } 
});

export default SideMenu;