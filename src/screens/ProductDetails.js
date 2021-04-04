import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, FlatList, TouchableOpacity, ImageBackground, Dimensions, SafeAreaView,TouchableHighlight, Text, ScrollView } from 'react-native';
import { AntDesign, Entypo, EvilIcons, FontAwesome } from '@expo/vector-icons';
import ImageSlider from 'react-native-image-slider';
import * as StaticData from '../constants/StaticData';
import { connect } from 'react-redux';
import HTML from "react-native-render-html";
import { addItemAction, removeItemAction, editItemAction, StorageAction } from '../actions/cartItemAction';
import shopify from '../config/shopify';
import { isLoaded } from 'expo-font';
import Loader from '../component/Loader';
import * as WebBrowser from 'expo-web-browser';

const image = { uri: "https://reactjs.org/logo-og.png" };
const ProductList = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isload, loading] = useState(true);
  const [Productdata, setData] = useState(null);
  const [isdisable, disable] = useState(true);
  console.log("product details",props.route.params.Productid);

  
    


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
    shopify.product.fetch(props.route.params.Productid).then((product) => {
    setData(product),
    console.log('product detailslist',product);
    loading(false);
    disable(product.variants[0].available)
    }).catch((error)=> {console.log("error",error);})
  },[props.route.params.Productid])
         

  const AddToCart = (data) => {

    let check = props.cartlist.findIndex((em) => em.id=== props.route.params.Productid)
    
    if(check!=-1){
      var arrayid = check
      var quantityget = props.cartlist[check]
      var count = parseInt(quantityget.quantity) + 1;
      const updateItem = {
        id: props.route.params.Productid,
        Image: data.images[0].src,
        title:  data.title,
        amount: data.variants[0].priceV2.amount,
        quantity: count.toString()
      }
      console.log('inneradd', check, arrayid);
       props.editItemAction(updateItem,arrayid);
    }
    else{
      const cardItem = {
      id: props.route.params.Productid,
      Image: data.images[0].src,
      title:  data.title,
      amount: data.variants[0].priceV2.amount,
      quantity: "1"
    }
      props.addItemAction(cardItem);
      console.log('check',check);
  }
    

    // console.log('addtocart',cardItem);
   
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
            images={Productdata.images}
            customSlide={({ index, item, style, width }) => (
            
                <View key={index} style={styles.cover1}>  
                  <ImageBackground source={{uri: item.src}} style={styles.img}>
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
                <Text style={styles.amount}>${Productdata.variants[0].priceV2.amount}</Text>
                <View style={styles.like}>
                <AntDesign  name="hearto" color='#3b2322' size={25}  />
                </View>
            </View>

            <View>
            {Productdata.options[0]?.name == 'Size'? <Text style={styles.size}>{Productdata.options[0].name}</Text>:null}
            </View>

            <View>
            {Productdata.options[0]?.name == 'Size'?
            <FlatList 
                horizontal={false}    
                numColumns={5}
                data={Productdata.options[0].values}  
                keyExtractor={(item, index) => String(index)} 
                renderItem={({item}) => 
                       
                    <View 
                        style ={{ width: Dimensions.get('screen').width /5 - 20,
                        height:35,
                        alignItems:"center",
                        marginLeft:10,
                        borderColor:"#3b2322",
                        borderWidth:1,
                        marginTop:10,
                        backgroundColor: Productdata.variants[0].selectedOptions.findIndex((em) => em.value === item.value)>-1 ? '#3b2322' : null}}>

                        <Text style={{ marginTop:8, color: Productdata.variants[0].selectedOptions.findIndex((em) => em.value === item.value)>-1 ? '#fff' : null}}>{item.value}</Text>
                    </View>}/>
            : null }        
            </View>
            
            <View>
            {Productdata.options[1]?.name == 'Color'?<Text style={styles.size}>{Productdata.options[1].name}</Text>:null}
            </View>

            <View>
            {Productdata.options[1]?.name == 'Color'?
            <FlatList 
                horizontal={false}    
                numColumns={5}
                data={Productdata.options[1].values}  
                renderItem={({item}) => 
                       
                    <View 
                        style ={{ width: Dimensions.get('screen').width /5 - 20,
                        height:35,
                        alignItems:"center",
                        marginLeft:10,
                        borderColor:"#3b2322",
                        borderWidth:1,
                        marginTop:10,
                        backgroundColor: Productdata.variants[0].selectedOptions.findIndex((em) => em.value === item.value)>-1 ? '#3b2322' : null}}>

                        <Text style={{ marginTop:8, color: Productdata.variants[0].selectedOptions.findIndex((em) => em.value === item.value)>-1 ? '#fff' : null}}>{item.value}</Text>
                    </View>}/>
            : null }        
            </View>


            <View>
                <TouchableOpacity style={isdisable?styles.enabled:styles.disabled} disabled={!isdisable} onPress={() => AddToCart(Productdata)}>
                <View style={styles.cover2}>
                      <Entypo name="shopping-bag" color={isdisable ? '#3b2322' : '#c9c5c5'} size={18}/>
                      <Text style={isdisable?styles.textenabled:styles.textdisabled}>{isdisable ? 'ADD TO CART' : 'SOLD OUT'}</Text>
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

            <View >{isVisible ?
              <Text style={styles.details1}>{Productdata.description}</Text> : null}
              {/* <View style={styles.details1}><HTML source={{ html: Productdata.descriptionHtml }}/></View> */}
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
    marginRight:10
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

export default connect(mapStateToProps,mapDispatchToProps) (ProductList);