import React, { useState } from 'react';
import { View, Image, StyleSheet, FlatList, TouchableOpacity, Dimensions, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as StaticData from '../constants/StaticData';
import { AntDesign, Entypo, Ionicons, Feather, EvilIcons } from '@expo/vector-icons';
import EmptyShow from '../component/EmptyShow';
import { connect } from 'react-redux';
import { addItemAction, removeItemAction, editItemAction, StorageAction } from '../actions/wishlistItemAction';

const Wishlist = (props) => {
  const [isVisible, setIsVisible] = useState(true);
  const navigation = useNavigation();

console.log('wishlistdata',props.wishlist);


const DeleteItem = (index) =>{
  console.log("delete",index);
  props.removeItemAction(index);
}

    return (
        <View style={{flex:1}}> 
                 {props.wishlist.data.length!=0 ? 
                <FlatList  horizontal={false}
                    // numColumns={2}
                    data={props.wishlist.data}  
                    renderItem={({item, index}) => 
                      <View style={styles.lay}>
                      <TouchableOpacity > 
                        <Image source={item.Image} style={{ width: 60 , height: 100, borderRadius:10, margin: 10, }} /> 
                      </TouchableOpacity>
                      <View style={styles.inlay}>
                      <Text style={styles.itemtitle}>{item.title}</Text> 
                      <Text style={styles.itemtitle1}>${item.amount}</Text>
                      </View>
                      <TouchableOpacity style={styles.icon} onPress={() => DeleteItem(index)}>
                        <AntDesign  name="delete" color='red' size={21}/>
                      </TouchableOpacity>
                      </View>
                      
                    }/> : null} 

                <View style={{flex:1}}>
                    {props.wishlist.data.length===0 ?
                        <EmptyShow>YOUR WISHLIST IS EMPTY !!!</EmptyShow>: null}
                </View>    
        </View>
    );
  }



const styles = StyleSheet.create({
    lay: {
      flexDirection:"row",
      margin:10,
      marginTop: 10,
      borderRadius:10,
      backgroundColor:"#fff",

    },
    inlay: {
      flexDirection:"column"
    },
    itemtitle: {
      marginTop:35,
      color:"#000000",
      fontSize:15,
      fontWeight:"bold",  

    },
    cover: {
      flex:1,
      flexDirection:"row",
      justifyContent:"center"

    },
    itemtitle1: {
      marginTop:5,
      color:"gray"
    }, 
    icon:{
    flex:1,
    alignItems:"flex-end",
    marginRight:20,
    marginTop:50
    }
  });


  const mapStateToProps = (state) => ({
    wishlist: state.wishlistItemReducer,
  });
  
  const mapDispatchToProps = (dispatch) => ({
    removeItemAction: (Id) => dispatch(removeItemAction(Id)),

  }); 

    export default connect(mapStateToProps,mapDispatchToProps) (Wishlist);