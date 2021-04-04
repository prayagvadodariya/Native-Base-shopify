import React, {useState,useEffect, Component} from 'react';
import { connect } from 'react-redux';
import { CartStorageAction } from '../actions/cartItemAction';
import { WishlistStorageAction } from '../actions/wishlistItemAction';


const InitialLoadData = (props) => {
  useEffect(() => {
    props.CartStorageAction()
    props.WishlistStorageAction()
    console.log('chackinitialdata')
    },[])
    return null
}
  
// const mapStateToProps = (state) => ({
//     Local_data_list: state.cartItemReducer,
//   });
  

const mapDispatchToProps = (dispatch) => ({
  CartStorageAction: () => dispatch(CartStorageAction()),
  WishlistStorageAction: () => dispatch(WishlistStorageAction()),
});

export default connect(null, mapDispatchToProps) (InitialLoadData);