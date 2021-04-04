import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet,Image, Text, View,Button, TextInput, ImageBackground,Dimensions, ListItem, FlatList, TouchableOpacity,SafeAreaView, ScrollView  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as StaticData from '../constants/StaticData';
import { AntDesign, Entypo } from '@expo/vector-icons';
import CImg from '../component/CImg';
import BImg from '../component/BImg';


import { element } from 'prop-types';
// import { AntDesign} from '@expo/vector-icons';

class Home extends Component {
  constructor(props) {
     
    super(props);
    this.state = {
      fontLoaded: false,
    };
    
  }

 getListViewItem = (item) => {  
  Alert.alert(item.key);  
} 

  render() {


    return (
      <ScrollView style={styles.container}>
          <View>
            <ImageBackground style={styles.top} source={require('../assets/images/home.jpg')}>
              <Text style={styles.h1}>WESTERN WERA</Text> 
              <Text style={styles.h2}>FOR THE WILD AT HEART</Text>  
              {/* <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('ScreenStack', { screen: 'DemoGrapql' })}>
                  <Text style={styles.btntext} >SHOP NOW</Text>
              </TouchableOpacity>   */}
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('menuScreenStack', { screen: 'GraphQlCollection' })}>
                  <Text style={styles.btntext} >SHOP NOW</Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
         
          <View style={styles.body}>
             
            <View style={styles.nexth}>
                <Text style={styles.bh1}>OUR FEATURED STYLES</Text>
                <Text style={styles.bh2}>Proudly bringing you leading style since 2015.</Text>
                <Image resizeMode="contain" style={styles.bhhh} source={require('../assets/images/2.webp')}/>            
            </View>
                   {StaticData.Product_one.map( (s) => (
            <CImg  key={s.id}
                   name1={s.name1}
                   name2={s.name2}
                  Image={s.Image}> {s}
            </CImg> ))}

            <View>
              <View>
                  <Image style={styles.bimag} source={require('../assets/images/6.jpg')}/>
              </View>
              <View  style={styles.cover}>

                  <View style={styles.cover1}>
                    <Text style={styles.covertext}>CHOOSE THE BEST GIFT FOR ANY MOMENT</Text> 
                      <TouchableOpacity style={styles.button1}>
                        <Text style={styles.btntext1}>SHOP GIFT CARDS</Text>
                     </TouchableOpacity> 
                  </View>
                  <View style={styles.cover2}>
                    <Image  style={styles.bimag1} source={require('../assets/images/7.webp')}/>
                  </View>   
              </View>
              </View>
              
              <View style={styles.nexth}>
                <Text style={styles.bh1}>OUR NEWEST STYLES</Text>
                <Image resizeMode="contain" style={styles.bhhh} source={require('../assets/images/2.webp')}/>            
              </View>
            

              <View style={styles.container}>  
                <FlatList  horizontal={true}
                    keyExtractor={(item, index) => String(index)} 
                    data={StaticData.Product_List}  
                    renderItem={({item}) => 
                      <View> 
                        <Image source={item.Image} style={{ width: Dimensions.get('screen').width / 2 - 10, height: 290, margin: 5 }} /> 
                          <Text style={styles.itemtitle}>{item.title}</Text> 
                          <View style={styles.cover}>
                            <Text style={styles.itemtitle1}>{item.amount}</Text>
                            <TouchableOpacity>
                              <AntDesign  style={{ marginLeft:10,marginTop:13}} name="hearto" color="29110d" size={15} />
                            </TouchableOpacity>  
                          </View>
                      </View>}/>  
              </View>
              <View style={styles.contarea}>
                  <View style={styles.innercontarea}>
                    <Text style={styles.i1}>ABOUT HEELS N SPURS</Text>
                    <Image resizeMode="contain" style={styles.irimg} source={require('../assets/images/2.webp')}/>
                    <Text style={styles.i2}>Our Western-Boho boutique is based out of Kenedy, Texas. Run by a mother-daughter dream-team, our love of fashion became a reality when we established in 2015. We love our land, our horses, and sharing our style with gals across the country who love to work hard, and look good while doing it.</Text>
                    <Text style={styles.i3}>We strive to offer the latest and trendiest styles at an affordable price. We offer $7.00 flat rate shipping across the US. Thank you so much for shopping Heels N Spurs! </Text>
                  </View>
              </View>

              <View style={styles.buttomlayout}>
                <ImageBackground style={styles.buttomimg} source={require('../assets/images/14.webp')}>
                    <Image style={styles.innerimg} source={require('../assets/images/15.webp')}/>
                </ImageBackground>
                <View style={styles.nextlayout}>
                    <View style={styles.cover3}>
                      <Text style={styles.l1}>GOOD SHOES TAKE YOU GOOD PLACES</Text>
                      <TouchableOpacity style={styles.butt1}>
                         <Text style={styles.btntext}>SHOP SHOES</Text>
                      </TouchableOpacity>  
                    </View>
                </View>
              </View>
              <View style={styles.buttomlayout}>
                <ImageBackground style={styles.buttomimg} source={require('../assets/images/16.webp')}>
                    <Image style={styles.innerimg} source={require('../assets/images/17.webp')}/>
                </ImageBackground>
                <View style={styles.nextlayout1}>
                    <View style={styles.cover3}>
                      <Text style={styles.l2}>ADDING STYLE TO YOUR MOMENTS</Text>
                      <TouchableOpacity style={styles.butt2}>
                         <Text style={styles.btntext3}>SHOP ACCESSORIES</Text>
                      </TouchableOpacity>  
                    </View>
                </View>
              </View>

              <View style={styles.nexth}>
                <Text style={styles.bh1}>HOME DECOR</Text>
                <Image resizeMode="contain" style={styles.bhhh} source={require('../assets/images/2.webp')}/>            
              </View>

                {StaticData.decor_one.map( (im) => (
              <BImg  
                  key={im.id}
                  Image={im.Image}
                  Image1={im.Image1}
                  Image2={im.Image2}>{im}
              </BImg> ))}

              <View>
                  <Text style={styles.btext}>Our style is all about bringing that rugged western look together with boho style! Check out our collection of rugs, accent pieces, towels, bedding, dishes, frames, and much more!</Text>
              </View>

              {StaticData.decor_two.map( (im) => (
              <BImg  
                  key={im.id}
                  Image={im.Image}
                  Image1={im.Image1}
                  Image2={im.Image2}>{im}
              </BImg> ))}

              <View>
                <ImageBackground style={styles.background} source={require('../assets/images/24.webp')}>
                <View style={styles.nexth}>
                    <Text style={styles.bh1}>OUR POPULAR STYLES</Text>
                    <Text style={styles.bh2}>Looking for that next piece to elevate your style? Look no further!</Text>
                    <Image resizeMode="contain" style={styles.bhhh} source={require('../assets/images/2.webp')}/>            
                </View>
                        {StaticData.Product_two.map( (s) => (
                <CImg  key={s.id}
                       name1={s.name1}
                       name2={s.name2}
                       Image={s.Image}> {s}
                </CImg> ))}

                </ImageBackground>
              </View>
              
              

              <View style={styles.end}>
                  <View style={styles.nexth}>
                    <Text style={styles.bh1}>YOUR FASHION</Text>
                    <Text style={styles.bh3}>DEFINES YOU</Text>
                    <Image resizeMode="contain" style={styles.bhhh} source={require('../assets/images/2.webp')}/>            
                  </View>
                  <TouchableOpacity><Image style={styles.endimg} source={require('../assets/images/28.jpg')}/></TouchableOpacity>
                  <Text style={styles.bh4}>Western Wear for the Wild at Heart means you're free to live the life you love– and look good doing it!</Text>
              </View>

          </View> 
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  itemtitle: {
    textAlign:"center",
    color:'#29110d',
    fontSize:15,
    fontWeight:"bold"
  },
  itemtitle1: {
    color:'#29110d',
    marginTop:10,
    fontSize:15,
    
  },
  top: {
    flex: 1,
    height:"120%"
  },
  h1: {
    fontSize:34,
    marginTop:"30%",
    textAlign:"center",
    color:'#ffffff',
    fontFamily:'Roboto',
  },
  h2: {
    fontSize:31,
    textAlign:"center",
    color:'#ffffff',
    fontFamily:'net',
    fontWeight:"normal",
  },
  button: {
  width:"33%",
  height:"17%",
  backgroundColor:'#ffffff',
  borderRadius:25,
  marginTop:"6%",
  marginBottom:"2%",
  alignItems:"center",
  marginLeft:"35%",
  justifyContent:"center",
  },
  button1: {
    width:"66%",
    height:"18%",
    backgroundColor:'rgba(94, 41, 14, 0.9)',
    // borderColor:"#3b2322",
    borderRadius:25,
    marginTop:"6%",
    marginBottom:"2%",
    alignItems:"center",
    marginLeft:"10%",
    justifyContent:"center",
    },
  btntext1: {
    fontSize:13,
    color:'#fff',
  },
  btntext: {
    fontSize:13,
    color:'#3b2322',
    fontWeight:"bold"
  },
  btntext3:{
    fontSize:13,
    color:'#fae0c6',
    fontWeight:"bold"
  },
  body: {
    marginTop:"20%"
  },
  nexth: {
    flex:1,
    justifyContent:"center",
    alignItems:"center",
  },
  bh1: {
    fontFamily:'Roboto',
    fontSize:32,
    marginTop:10
  },
  bh2: {
    marginTop:25,
    fontSize:21,
    marginLeft:15,
    marginRight:15,
    textAlign:"center",
  },
  bh3: {
    fontFamily:'net',
    fontSize:32,
    // marginTop:10
  },
  bh4: {
    marginTop:25,
    fontSize:15,
    marginLeft:15,
    marginRight:15,
    marginBottom:15,
    textAlign:"center",
  },
  bhhh: {
    width:"100%",
    height:20,
    marginTop:10,
    
  },
  bimag: {
    width:"100%",
    height:175,
    marginTop:40,
  },
  cover: {
    flex:1,
    flexDirection:"row",
    justifyContent:"center"
  },
  bimag1: {
    width:"100%",
    height:175,
  },
  cover1: {
    width:"65%",
    height:175,
    
  },
  cover2: {
    width:"35%",
    height:175
  },
  cover3: {
    flex:1,
    flexDirection:"row",
    justifyContent:"center"
  },
  covertext: {
    textAlign:"center",
    marginTop:30,
    fontSize:21,
    paddingLeft:10,
    color:'#29110d',
    fontFamily:'Roboto',
  },
  cardimg: {
    width:"100%",
    height:135,
    margin:20
  },
  contarea: {
    borderColor:'#868781',
    borderWidth:3,
    margin:15,
    marginTop:25
  },
  innercontarea: {
    borderColor:'#868781',
    borderWidth:1.5,
    margin:2,
  },
  i1: {
    fontFamily:'Roboto',
    fontSize:30,
    textAlign:"center",
    marginTop:15,
    lineHeight:25
  },
  irimg: {
    width:"100%",
    height:20,
    marginTop:20,
  },
  i2: {
    fontSize:15,
    textAlign:"center",
    marginTop:28,
    marginLeft:15,
    marginRight:15,
    color:'#333232',
    lineHeight:25
  },
  i3: {
    fontSize:15,
    textAlign:"center",
    marginTop:28,
    marginLeft:15,
    marginRight:15,
    color:'#333232',
    lineHeight:25,
    marginBottom:15
  },
  buttomlayout: {
  },
  buttomimg: {
    width:"100%",
    height:180
  },
  innerimg: {
    width:"100%",
    height:30,
    marginTop:168
  },
  nextlayout:{
   width:"100%",
   height:120,
   backgroundColor:'#fae0c6' 
  },
  nextlayout1:{
    width:"100%",
    height:120,
    backgroundColor:'#29110d' 
   },
  l1: {
    fontSize:30,
    textAlign:"center",
    marginTop:25,
    fontFamily:"net",
    color:'#29110d',
    marginLeft:10,
    marginRight:10
  },
  l2: {
    fontSize:30,
    textAlign:"center",
    marginTop:10,
    fontFamily:"net",
    color:'#fae0c6',
    marginLeft:10,
    marginRight:10
  },
  butt1: {
    width:"33%",
    height:"35%",
    borderColor:'#868781',
    borderWidth:1.5,
    borderRadius:25,
    marginTop:40,
    alignItems:"center",
    marginRight:15,
    justifyContent:"center",
  },
  butt2: {
    width:"45%",
    height:"35%",
    borderColor:'#fae0c6',
    borderWidth:1.5,
    borderRadius:25,
    marginTop:40,
    alignItems:"center",
    marginRight:15,
    justifyContent:"center",
  },
  btext: {
    marginTop:30,
    marginBottom:10,
    fontFamily:"about",
    fontSize:18,
    marginLeft:15,
    marginRight:15,
    textAlign:"center",
  },
  background:{
    marginTop:20
  },
  end: {
    marginTop:20,
    backgroundColor:'#fff'
  },
  endimg: {
    width:"100%",
    height:246,
    marginTop:20,
    lineHeight:25
  }
    
});

export default Home;