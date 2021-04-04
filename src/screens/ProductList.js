import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, FlatList, TouchableOpacity, Dimensions, Text } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import shopify from '../config/shopify';
import Loader from '../component/Loader';
import EmptyShow from '../component/EmptyShow';
import { connect } from 'react-redux';
import { addItemAction, removeItemAction, editItemAction, StorageAction } from '../actions/wishlistItemAction'

const defaultimg = 'https://cdn.shopify.com/s/files/1/1317/9855/products/image_73e2d385-0629-467b-b5d8-53e2882348c2_1024x1024@2x.jpg?v=1615670259'
const lenth = 0;
const ProductList = (props) => {
 
  const [isfavorite, setIsFavorite] = useState();
  const [isload, loading] = useState(true);
  const [ProductList, setData] = useState(null);
 
  const navigation = useNavigation();


  console.log("ok",props.wishlist.data);

  useEffect(() => {
    if(props.wishlist.data.length===0){
      setIsFavorite([])
      console.log('nullok',props.wishlist.data);
    }else{
      setIsFavorite(props.wishlist.data.map((item) => {return item.id}))
      console.log('update',props.wishlist.data);
    }
  }, [props.wishlist]);

  useEffect(() => {
    shopify.collection.fetchWithProducts(props.route.params.collectionid).then((collection) => {
    setData(collection.products),
    loading(false);
    }).catch((error)=> {console.log("error",error);})
  }, [props.route.params.collectionid]);
  
  
 const AddToWishlist = (item) => {
  let oldItem = props.wishlist.data.findIndex((em) => em.id=== item.id);
  if(isfavorite.indexOf(item.id)>-1){    
    props.removeItemAction(oldItem);
    // daa();
   console.log('inactivenot', oldItem);
  }else{
    setIsFavorite([...isfavorite, item.id])
    const cardItem = {
      id: item.id,
      Image: item.images[0].src,
      title:  item.title,
      amount: item.variants[0].priceV2.amount,
     }
     props.addItemAction(cardItem);
    console.log('checkactive');
  }
  
 }
  
  const  emptyComponent= () => {
    return(
        <EmptyShow>PRODUCT IS NOT AVAILABLE AT THE MOMENT</EmptyShow>
    )}

  if(isload===true && !ProductList ){
    return (
      <Loader/>
    )
  }
    return (
        <View style={{flex:1}}> 
                <FlatList  horizontal={false}
                    numColumns={2}
                    data={ProductList} 
                    ListEmptyComponent={emptyComponent}
                    style={{flex:1}} 
                    contentContainerStyle={{flexGrow:1, flex:1}}
                    renderItem={({item, index}) => 
                   { 
                   return (
                     <View>
                      <TouchableOpacity onPress={() => navigation.navigate("ScreenStack",{ screen: 'ProductDetails', params: { Productid: item.id }})}> 
                          <Image source={{ uri: item.images[0]?.src ||defaultimg}} style={{ width: Dimensions.get('screen').width / 2 - 10, height: 250, margin: 5, }} /> 
                          <Text style={styles.itemtitle}>{item.title}</Text> 
                      </TouchableOpacity>
                      <View style={styles.cover}>
                            <Text style={styles.itemtitle1}>${item.variants[0].priceV2.amount}</Text>
                            <TouchableOpacity onPress={() => AddToWishlist(item)}>
                              <AntDesign  style={{ marginLeft:10,marginTop:13}} name={isfavorite.indexOf(item.id)>-1  ? 'heart' : 'hearto'}  color="#29110d" size={15} />
                            </TouchableOpacity>  
                      </View>
                      </View>)}}/>           
        </View>
    );
  }


const styles = StyleSheet.create({
    titleStyle:{
      fontFamily:'Roboto',
      textAlign:'center',
      color:'gray',
      // marginTop:'50%',
      fontSize:25,
    },
    itemtitle: {
      paddingRight:10,
      paddingLeft:10,
      width: Dimensions.get('screen').width / 2 - 10,
      margin:5,
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
      marginBottom:10
    }
  });

  const mapStateToProps = (state) => ({
    wishlist: state.wishlistItemReducer,
  });
  
  
  const mapDispatchToProps = (dispatch) => ({
    addItemAction: (cardItem) => dispatch(addItemAction(cardItem)),
    removeItemAction: (Id) => dispatch(removeItemAction(Id)),
  });

export default connect(mapStateToProps,mapDispatchToProps) (ProductList);