import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, FlatList, TouchableOpacity, ImageBackground, Dimensions, SafeAreaView,TouchableHighlight, Text, ScrollView } from 'react-native';
import { AntDesign, Entypo, EvilIcons, FontAwesome } from '@expo/vector-icons';
import ImageSlider from 'react-native-image-slider';
import * as StaticData from '../constants/StaticData';
import { gql } from '@apollo/client';
import client from '../config/grapqlapi';
import { connect } from 'react-redux';
import HTML from "react-native-render-html";
import { addItemAction, removeItemAction, editItemAction, StorageAction } from '../actions/cartItemAction';
import Loader from '../component/Loader';
import * as WebBrowser from 'expo-web-browser';

const image = { uri: "https://reactjs.org/logo-og.png" };

const GraphQlProductDetails = (props) => {
  const [isvar, setvar] = useState(props.route.params.Producthandel);
  const [isVisible, setIsVisible] = useState(false);
  const [isload, loading] = useState(true);
  const [Productdata, setData] = useState(null);
  const [isfirst, first] = useState(10);
  const [isdisable, disable] = useState(true);
  const [isamount, setAmount] = useState(true);
  const [isaddtocart, setAddToCart] = useState(null);

  console.log("product details",props.route.params.Producthandel);

  const toggleFunction = () => {
    setIsVisible(!isVisible);
  };

  const shareFacebook = async () => {
    await WebBrowser.openBrowserAsync('https://www.facebook.com/');
  }

  const shareInstagram = async () => {
    await WebBrowser.openBrowserAsync('https://www.instagram.com/');
  }

  const sharePinterest = async () => {
    await WebBrowser.openBrowserAsync('https://www.pinterest.com/shopify/');
  }


  useEffect(() => {
    client
    .query({
      query: gql`
      {
        productByHandle(handle: "${props.route.params.Producthandel}") {
          title
          images(first: ${isfirst}) {
            edges {
              node {
                src
              }
            }
          }
          variants(first: ${isfirst}) {
            edges {
              node {
                priceV2 {
                  amount
                  currencyCode
                }
                available
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          descriptionHtml
          options(first: ${isfirst}) {
            name
            values
          }
        }
      }
      `
    })
    .then((results) => {
      setAddToCart(results.data.productByHandle.variants.edges[0].node)
      setData(results.data.productByHandle)
      loading(false);
      disable(results.data.productByHandle.variants.edges[0].node.available)
      console.log("netdatacheck", results);
    })
    .catch((error) => {
      console.error(error);
    });  
     
},[props.route.params.Producthandel])
         

const sizeSelect = (val) => {
  let checkactive = "size"
  console.log('a',isaddtocart);
  const arr = [
    {
      name: "Size",
      value: val.toString()
    },
    {
      name: "Color",
      value: isaddtocart.selectedOptions[1].value
    }
  ]
  selectCall(arr,checkactive);
}

const colorSelect = (val) => {
  let checkactive = "color"
  const arr = [
    {
      name: "Size",
      value: isaddtocart.selectedOptions[0].value
    },
    {
      name: "Color",
      value: val.toString()
    }
  ]
  selectCall(arr,checkactive);
}

const selectCall = (arr,checkactive) => {
 console.log('check',arr, checkactive);
  setAmount(true);
  client
    .query({
      query: gql`
      
      query MyQuery($arr: [SelectedOptionInput!]!, $isvar: String!){
        productByHandle(handle: $isvar) {
          variantBySelectedOptions(selectedOptions: $arr) {
            available
            priceV2 {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
      `
      ,variables:{ arr, isvar }
    },)
    .then((results) => {
      setAddToCart(results.data.productByHandle.variantBySelectedOptions)
      setAmount(false)
      loading(false);
      console.log("nextcall", results);
    })
    .catch((error) => {
      console.error(error);
    });   
}
    
const addToCart = () => {
  console.log("add to cart", isaddtocart);
}



if(isload===true && !Productdata ){
  return (
    <Loader/>
  )
} 

    return (
      // console.log('pro',Productdata.images),
        <ScrollView>
            <View>  
                <Text style={styles.t1}>{Productdata.title}</Text>   
            </View>

             <View>
            <SafeAreaView>
            <ImageSlider
            loopBothSides={false}
            images={Productdata.images.edges}
            customSlide={({ index, item, style, width }) => (
            
                <View key={index} style={styles.cover1}>  
                  <ImageBackground source={{uri: item.node.src}} style={styles.img}>
                    <View style={styles.zoomlayout}>
                      <TouchableOpacity style={styles.zoom}>
                        <AntDesign style={styles.icon} name="shrink" color='#3b2322' size={25}  />
                      </TouchableOpacity>
                    </View>
                  </ImageBackground>    
                </View>)}/>
                </SafeAreaView> 
            </View> 
            
            <View style={styles.cover}>
        
                <Text style={styles.amount}>${isaddtocart.priceV2.amount}</Text>
                <View style={styles.like}>
                <AntDesign  name="hearto" color='#3b2322' size={25}  />
                </View>
            </View>

            <View>
            {Productdata.options[0]?.name == 'Size' ? <Text style={styles.size}>{Productdata.options[0].name}</Text>:null}
            </View>

            <View>
            {Productdata.options[0]?.name == 'Size' ?
            <FlatList 
                horizontal={false}    
                numColumns={5}
                data={Productdata.options[0].values}  
                keyExtractor={(item, index) => String(index)} 
                extraData={isaddtocart}
                renderItem={({item}) => 
                    <TouchableOpacity onPress={() => sizeSelect(item)}
                        style ={{ width: Dimensions.get('screen').width /5 - 20,
                        height:35,
                        alignItems:"center",
                        marginLeft:10,
                        borderColor:"#3b2322",
                        borderWidth:1,
                        marginTop:10,
                        backgroundColor: isaddtocart.selectedOptions.findIndex((em) => em.value === item)>-1 ? '#3b2322' : null }}>

                        <Text style={{ marginTop:8, color: isaddtocart.selectedOptions.findIndex((em) => em.value === item)>-1 ? '#fff' : null}}>{item}</Text>
                    </TouchableOpacity>
                    }/>
            : null }        
            </View>
            
            <View>
            {Productdata.options[1]?.name == 'Color' ?<Text style={styles.size}>{Productdata.options[1].name}</Text>:null}
            </View>

            <View>
            {Productdata.options[1]?.name == 'Color' ?
            <FlatList 
                horizontal={false}    
                numColumns={5}
                data={Productdata.options[1].values}  
                extraData={isaddtocart}
                renderItem={({item}) =>  
                    <TouchableOpacity onPress={() => colorSelect(item)}
                        style ={{ width: Dimensions.get('screen').width /5 - 20,
                        height:35,
                        alignItems:"center",
                        marginLeft:10,
                        borderColor:"#3b2322",
                        borderWidth:1,
                        marginTop:10,
                        backgroundColor: isaddtocart.selectedOptions.findIndex((em) => em.value === item)>-1 ? '#3b2322' : null}}>

                        <Text style={{ marginTop:8, color: isaddtocart.selectedOptions.findIndex((em) => em.value === item)>-1 ? '#fff' : null}}>{item}</Text>
                    </TouchableOpacity>
                  }/>
            : null }        
            </View>


            <View>
                <TouchableOpacity style={isaddtocart.available?styles.enabled:styles.disabled} disabled={!isaddtocart.available} onPress={() => addToCart()}>
                  <View style={styles.cover2}>
                      <Entypo name="shopping-bag" color={isaddtocart.available ? '#3b2322' : '#c9c5c5'} size={18}/>
                      <Text style={isaddtocart.available?styles.textenabled:styles.textdisabled}>{isaddtocart.available ? 'ADD TO CART' : 'SOLD OUT'}</Text>
                  </View>
                </TouchableOpacity>
            </View>

            <View style={styles.cover}>
                <Text style={styles.details}>Product Details : </Text>

                  <View style={styles.like}>
                    <TouchableOpacity >
                    <AntDesign onPress={toggleFunction} name={isVisible===false  ? 'down' : 'up'} color='#3b2322' size={15}/>
                    </TouchableOpacity>
                </View>
            </View>

            <View>{isVisible ? 
              <View style={styles.details1}><HTML source={{ html: Productdata.descriptionHtml }}/></View>
              : null}
            </View>

            <View style={styles.sharing}>
              <Text style={styles.size}>SHARE : </Text>
              <TouchableOpacity style={styles.share} onPress={() => shareFacebook()}>
                  <FontAwesome style={styles.shearicon} name="facebook" color='#3b2322' size={28}  />
              </TouchableOpacity>
              <TouchableOpacity style={styles.share} onPress={() => shareInstagram()}>
                  <AntDesign style={styles.shearicon} name="instagram" color='#3b2322' size={25}  />
              </TouchableOpacity>
              <TouchableOpacity style={styles.share} onPress={() => sharePinterest()}>
                  <Entypo style={styles.shearicon} name="pinterest" color='#3b2322' size={25}  />
              </TouchableOpacity>
            </View> 

            <View>
              <Text style={styles.t2}>YOU MAY ALSO LIKE THIS</Text>
              <Image resizeMode="contain" style={styles.bhhh} source={require('../assets/images/2.webp')}/> 
            </View>

            <View style={styles.product} >  
                <FlatList  horizontal={true}
                    // numColumns={2}
                    data={StaticData.Product_Details_List} 
                    keyExtractor={(item, index) => String(index)}  
                    renderItem={({item}) => 
                      <TouchableOpacity> 
                        <Image source={item.Image} style={{ width: Dimensions.get('screen').width / 2 - 10, height: 250, margin: 5, }} /> 
                          <Text style={styles.itemtitle}>{item.title}</Text> 
                          <View style={styles.cover}>
                            <Text style={styles.itemtitle1}>{item.amount}</Text>
                            <TouchableOpacity>
                              <AntDesign  style={{ marginLeft:10,marginTop:13}} name="hearto" color="29110d" size={15}/>
                            </TouchableOpacity>  
                          </View>
                      </TouchableOpacity>}/>  
            </View>
        </ScrollView>
        
    );
  
}


const styles = StyleSheet.create({
   t1: {
      fontSize:35,
      fontFamily:"Roboto",
      color:"#5e290e",
      margin:10
   },
   t2: {
    fontSize:25,
    fontFamily:"Roboto",
    color:"#1c4252",
    marginTop:15,
    margin:15,
    textAlign:"center"
    
  },
   cover1: {
     backgroundColor:"#f2f2f2"
   },
   cover2: {
    marginTop:8, 
    flexDirection:'row'
   },
   zoomlayout: {   
    alignItems:"flex-end",
    marginTop:295
   },
   zoom: {
    borderRadius:25,
    borderColor:"#5e290e",
    borderWidth:2,
    width:55,
    height:45,
    alignItems:"center",
    backgroundColor:"transparent"
   },
   icon:{
    marginTop:5,
    position:'absolute'
   },
   amount: {
    fontSize:25,
    marginTop:10,
    marginLeft:10,
    color:"#3b2322"
   },
    details: {
    fontSize:15,
    marginTop:10,
    marginLeft:10,
    fontWeight:'bold'
    
   },
   details1: {
    fontSize:15,
    marginLeft:10,
    marginRight:10,
   },
   size:{
    fontSize:25,
    marginTop:10,
    marginLeft:10,
    fontWeight:"bold",
    color:"#3b2322"
   },
   like: {
    flex:1,
    marginTop:10,
    marginEnd:10,
    alignItems:"flex-end"
   },
   img: {
     flex:1,
    width: Dimensions.get('screen').width /1 - 20,
    height: 390,
    margin: 10,
   },
   enabled: {
    borderRadius:25,
    borderColor:"#5e290e",
    borderWidth:1.5,
    width: Dimensions.get('screen').width /1 - 20,
    height:45,
    margin: 10,
    marginTop:25,
    alignItems:"center",
    backgroundColor:"transparent"
   },
   disabled: {
    borderRadius:25,
    borderColor:"#c9c5c5",
    borderWidth:1.5,
    width: Dimensions.get('screen').width /1 - 20,
    height:45,
    margin: 10,
    marginTop:25,
    alignItems:"center",
   },
   textenabled: {
     marginLeft:10,
     color:"#3b2322",
     fontWeight:"bold"
   },
   textdisabled: {
    marginLeft:10,
    color:"#c9c5c5",
    fontWeight:"bold"
  },
   boxlayout: {
     flexDirection:"row",
   },
   sharing: {
     flexDirection:"row"
   },
   share: {
    borderRadius:25,
    borderColor:"#5e290e",
    borderWidth:1,
    width:55,
    height:50,
    margin:5,
    alignItems:"center",
    backgroundColor:"transparent"
   },
   shearicon:{
     marginTop:10,
   },
   bhhh: {
    width:"100%",
    height:20,
    marginTop:10,
   },
   itemtitle: {
    textAlign:"center",
    color:"#29110d",
    fontSize:15,
    fontWeight:"bold",  
  },
  cover: {
    flex:1,
    flexDirection:"row",
    justifyContent:"center"
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

const mapStateToProps = (state) => ({
  cartlist: state.cartItemReducer.data,
});


const mapDispatchToProps = (dispatch) => ({
  addItemAction: (cardItem) => dispatch(addItemAction(cardItem)),
  editItemAction: (updateItem, arrayid) => dispatch(editItemAction(updateItem, arrayid)),
  // removeItemAction: (Id) => dispatch(removeItemAction(Id)),
});

export default connect(mapStateToProps,mapDispatchToProps) (GraphQlProductDetails);