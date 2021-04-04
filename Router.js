import React from 'react';
import {Button, Image, View, TouchableOpacity, Dimensions} from 'react-native';
import {NavigationContainer, getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Home from './src/screens/Home';
import Search from './src/screens/Search';
import Wishlist from './src/screens/Wishlist';
import ProductList from './src/screens/ProductList';
import ProductDetails from './src/screens/ProductDetails';
import Account from './src/screens/account';
import Cart from './src/screens/Cart';
import MyAddress from './src/screens/MyAddress';
import AddEditAddress from './src/screens/AddEditAddress';
import Collections from './src/screens/Collections';
import CartIcon from './src/component/CartIcon';
import SideMenu from './src/component/SideMenu';
import DemoGrapql from './src/screens/DemoGrapql';
import GraphQlCollection from './src/screens/GraphQlCollection';
import GraphQlProduct from './src/screens/GraphQlProduct';
import GraphQlProductDetails from './src/screens/GraphQlProductDetails';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign, Entypo, Ionicons, Feather, EvilIcons } from '@expo/vector-icons';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import * as StorageKeys from './src/constants/StorageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();


const NavigationDrawerStructure = (props) => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
    return true
  };

 
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={() => toggleDrawer()}>
        <Entypo name="menu" color='#3b2322' size={26} style={{ marginLeft: 10}} />
      </TouchableOpacity>
     
    </View>
  );
};

const BackActionButton = (props) => {
  const Back = () => {
    //Props to open/close the drawer
    props.navigationProps.goBack()
    
  };

  return(
    <TouchableOpacity >
        <Ionicons  onPress={() => Back()} name="chevron-back" color='#3b2322' size={26} style={{ marginLeft: 10}} />
    </TouchableOpacity>
  )
}



const getHeaderTitle = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

  switch (routeName) {
    case 'Home':
      return 'HEELS N SPURS';
    case 'Search':
      return 'Search';
    case 'Wishlist':
      return 'Wishlist';
  }
};

const BottomTabStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor:"#3b2322",
        inactiveTintColor: 'gray',
        style: {
          backgroundColor: '#ffffff',
        },
        labelStyle: {
          textAlign: 'center',
          fontSize: 12,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" color={color} size={26} />)
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color }) => (
            <AntDesign name="search1" color={color} size={26} />)
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={Wishlist}
        options={{
          tabBarLabel: 'Wishlist',
          tabBarIcon: ({ color }) => (
            <AntDesign name="hearto" color={color} size={26} />)
        }}
      />
    </Tab.Navigator>
  );
};

const HomeScreenStack = ({navigation}) => {
  // onPress={ () => navigation.Navigator('ProductDetailScreenStack')}
  // const userclick = () => {
  //   const navigation = NavigationContainer();
  //   navigation.Navigator('ProductDetailScreenStack')
  // };

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="BottomTabtack"
        component={BottomTabStack}
        options={({route, navigation}) => ({
          headerTitle: getHeaderTitle(route),
          headerLeft: () => (
            <NavigationDrawerStructure
              navigationProps={navigation}
            />
          ),
          headerRight: () => (
            <View style={{flexDirection: 'row'}}> 
              <TouchableOpacity style={{paddingRight:18}} onPress={ () => navigation.navigate('ScreenStack', { screen: 'Account' })}>
                  <AntDesign name="user" color='#3b2322' size={26}/>
              </TouchableOpacity>
              <TouchableOpacity style={{paddingRight:8}} onPress={ () => navigation.navigate('ScreenStack', { screen: 'Cart' })}>
                  <CartIcon/>
              </TouchableOpacity>
            
            </View>  
          ),
          headerStyle: {
            backgroundColor: '#ffffff', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold',
            color: "#3b2322",
            textAlign:"center" //Set Header text style
          },
        })}
      />
    </Stack.Navigator>
  );
};

const DrawerScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
    initialRouteName="Login">

       
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ 
          headerLeft: () => (
          <TouchableOpacity >
            <Ionicons  onPress={() => navigation.navigate('HomeScreenStack')} name="chevron-back" color='#3b2322' size={26} style={{ marginLeft: 10}} />
        </TouchableOpacity>
        ),  
        headerRight: false, headerTitle: false, headerStyle: false, headerTransparent: true}}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ 
          headerLeft: () => (
            <TouchableOpacity >
                <Ionicons  onPress={() => navigation.navigate('DrawerScreenStack', { screen: 'Login' })} name="chevron-back" color='#3b2322' size={26} style={{ marginLeft: 10}} />
            </TouchableOpacity>
        ), 
        headerRight: false, headerTitle: false, headerStyle: false, headerTransparent: true}}
      />
    </Stack.Navigator>
  );
};


const menuScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
    initialRouteName="Collections">

       
      <Stack.Screen
        name="Collections"
        component={Collections}
        options={({navigation}) => ({
          headerTitle: 'Collections',
          headerLeft: () => (
            <NavigationDrawerStructure
              navigationProps={navigation}
            />
          ),
          headerRight: () => (
            <View style={{flexDirection: 'row'}}> 
              <TouchableOpacity style={{paddingRight:18}} onPress={ () => navigation.navigate('ScreenStack', { screen: 'Account' })}>
                  <AntDesign name="user" color='#3b2322' size={26} />
              </TouchableOpacity>
              <TouchableOpacity style={{paddingRight:8}} onPress={ () => navigation.navigate('ScreenStack', { screen: 'Cart' })}>
                  <CartIcon/>
              </TouchableOpacity>
            
            </View>  
          ),
          headerStyle: {
            backgroundColor: '#ffffff', //Set Header color
          },
          headerTitleAlign: 'center',
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold',
            color: "#3b2322",
             //Set Header text style
          },
        })}
      />
      <Stack.Screen
        name="GraphQlCollection"
        component={GraphQlCollection}
        options={({route, navigation}) => ({
          headerTitle: 'GraphQlCollection',
          headerLeft: () => (
            <NavigationDrawerStructure
              navigationProps={navigation}
            />
          ),
          headerRight: () => (
            <View style={{flexDirection: 'row'}}> 
              <TouchableOpacity style={{paddingRight:18}} onPress={ () => navigation.navigate('ScreenStack', { screen: 'Account' })}>
                  <AntDesign name="user" color='#3b2322' size={26} />
              </TouchableOpacity>
              <TouchableOpacity style={{paddingRight:8}} onPress={ () => navigation.navigate('ScreenStack', { screen: 'Cart' })}>
                  <CartIcon/>
              </TouchableOpacity>
            
            </View>  
          ),
          headerStyle: {
            backgroundColor: '#ffffff', //Set Header color
          },
          headerTitleAlign: 'center',
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold',
            color: "#3b2322",
             //Set Header text style
          },
        })}
      />
    </Stack.Navigator>
  );
};


const ScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator>

    <Stack.Screen
    name="ProductList"
    component={ProductList}
    options={{
      headerLeft: () => (
        <BackActionButton
            navigationProps={navigation}
          />
        // <TouchableOpacity >
        //    <Ionicons  onPress={() => navigation.navigate('HomeScreenStack')} name="chevron-back" color='#3b2322' size={26} style={{ marginLeft: 10}} />
        // </TouchableOpacity>
      ),
      headerRight: () => ( 
          <TouchableOpacity style={{paddingRight:8}}  >
              <AntDesign name="menu-unfold" color='#3b2322' size={26}  />
          </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: '#ffffff', //Set Header color
      },
      headerTitleAlign: 'center',
      headerTintColor: '#3b2322', //Set Header text color
      headerTitleStyle: {
        fontWeight: 'bold',
      },           
    }}
  />  

   <Stack.Screen
    name="ProductDetails"
    component={ProductDetails}
    options={{
      headerLeft: () => (
        <TouchableOpacity >
           <Ionicons  onPress={() => navigation.navigate('ScreenStack', { screen: 'ProductList' })} name="chevron-back" color='#3b2322' size={26} style={{ marginLeft: 10}} />
        </TouchableOpacity>
      ),
      headerRight: () => ( 
        <View style={{flexDirection: 'row'}}> 
        <TouchableOpacity style={{paddingRight:18}} >
            <AntDesign name="user" color='#3b2322' size={26}  />
        </TouchableOpacity>
        <TouchableOpacity style={{paddingRight:8}}  >
          <CartIcon/>
        </TouchableOpacity>
      
      </View>
      ),
      headerStyle: {
        backgroundColor: '#ffffff', //Set Header color
      },
      headerTitleAlign: 'center',
      headerTintColor: '#3b2322', //Set Header text color
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  />
  <Stack.Screen
    name="Account"
    component={Account}
    options={{
      headerLeft: () => (
        <BackActionButton
            navigationProps={navigation}
          />
      ),
      headerRight: () => ( 
        <View style={{flexDirection: 'row'}}> 
        <TouchableOpacity style={{paddingRight:18}} >
            <AntDesign name="user" color='#3b2322' size={26}  />
        </TouchableOpacity>
        <TouchableOpacity style={{paddingRight:8}}  >
            <CartIcon/>
        </TouchableOpacity>
      
      </View>
      ),
      headerStyle: {
        backgroundColor: '#ffffff', //Set Header color
      },
      headerTitleAlign: 'center',
      headerTintColor: '#3b2322', //Set Header text color
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  />
   <Stack.Screen
    name="MyAddress"
    component={MyAddress}
    options={{
      headerLeft: () => (
        <TouchableOpacity >
           <Ionicons  onPress={() => navigation.navigate('ScreenStack', { screen: 'Account' })} name="chevron-back" color='#3b2322' size={26} style={{ marginLeft: 10}} />
        </TouchableOpacity>
      ),
     title:'YOUR ADDRESSES',
      headerRight: () => ( 
        <TouchableOpacity style={{paddingRight:18}} onPress={() => navigation.navigate('ScreenStack', { screen: 'AddEditAddress' ,params: { active:true },})} >
            <AntDesign name="plus" color='#3b2322' size={26}  />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: '#ffffff', //Set Header color
      },
      headerTitleAlign: 'center',
      headerTintColor: '#3b2322', //Set Header text color
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  />
  <Stack.Screen
    name="AddEditAddress"
    component={AddEditAddress}
    options={{
      headerLeft: () => (
        <TouchableOpacity >
           <Ionicons  onPress={() => navigation.navigate('ScreenStack', { screen: 'MyAddress' })} name="chevron-back" color='#3b2322' size={26} style={{ marginLeft: 10}} />
        </TouchableOpacity>
      ),
      headerRight: () => ( 
        <View style={{flexDirection: 'row'}}> 
        <TouchableOpacity style={{paddingRight:18}} >
            <AntDesign name="user" color='#3b2322' size={26}  />
        </TouchableOpacity>
        <TouchableOpacity style={{paddingRight:8}}  >
            <CartIcon/>
        </TouchableOpacity>
      
      </View>
      ),
     title:'ADD NEW ADDRESS',
      headerStyle: {
        backgroundColor: '#ffffff', //Set Header color
      },
      headerTitleAlign: 'center',
      headerTintColor: '#3b2322', //Set Header text color
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  />
  <Stack.Screen
    name="Cart"
    component={Cart}
    options={{
    
      headerLeft: () => (
        <BackActionButton
            navigationProps={navigation}
          />
      ),
      headerRight: () => ( 
        <View style={{flexDirection: 'row'}}> 
        <TouchableOpacity style={{paddingRight:18}} >
            <AntDesign name="user" color='#3b2322' size={26}  />
        </TouchableOpacity>
        <TouchableOpacity style={{paddingRight:8}}  >
            <CartIcon/>
        </TouchableOpacity>
      
      </View>
      ),
      headerStyle: {
        backgroundColor: '#ffffff', //Set Header color
      },
      headerTitleAlign: 'center',
      headerTintColor: '#3b2322', //Set Header text color
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  /> 
  <Stack.Screen
    name="DemoGrapql"
    component={DemoGrapql}
    options={{
      headerLeft: () => (
        <BackActionButton
            navigationProps={navigation}
          />
        // <TouchableOpacity >
        //    <Ionicons  onPress={() => navigation.navigate('HomeScreenStack')} name="chevron-back" color='#3b2322' size={26} style={{ marginLeft: 10}} />
        // </TouchableOpacity>
      ),
      headerRight: () => ( 
          <TouchableOpacity style={{paddingRight:8}}  >
              <AntDesign name="menu-unfold" color='#3b2322' size={26}  />
          </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: '#ffffff', //Set Header color
      },
      headerTitleAlign: 'center',
      headerTintColor: '#3b2322', //Set Header text color
      headerTitleStyle: {
        fontWeight: 'bold',
      },           
    }}
  />
  <Stack.Screen
    name="GraphQlProduct"
    component={GraphQlProduct}
    options={{
      headerLeft: () => (
        <BackActionButton
            navigationProps={navigation}
          />
        // <TouchableOpacity >
        //    <Ionicons  onPress={() => navigation.navigate('HomeScreenStack')} name="chevron-back" color='#3b2322' size={26} style={{ marginLeft: 10}} />
        // </TouchableOpacity>
      ),
      headerRight: () => ( 
          <TouchableOpacity style={{paddingRight:8}}  >
              <AntDesign name="menu-unfold" color='#3b2322' size={26}  />
          </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: '#ffffff', //Set Header color
      },
      headerTitleAlign: 'center',
      headerTintColor: '#3b2322', //Set Header text color
      headerTitleStyle: {
        fontWeight: 'bold',
      },           
    }}
  />
  <Stack.Screen
    name="GraphQlProductDetails"
    component={GraphQlProductDetails}
    options={{
      headerLeft: () => (
        <TouchableOpacity >
           <Ionicons  onPress={() => navigation.navigate('ScreenStack', { screen: 'GraphQlProduct' })} name="chevron-back" color='#3b2322' size={26} style={{ marginLeft: 10}} />
        </TouchableOpacity>
      ),
      headerRight: () => ( 
        <View style={{flexDirection: 'row'}}> 
        <TouchableOpacity style={{paddingRight:18}} >
            <AntDesign name="user" color='#3b2322' size={26}  />
        </TouchableOpacity>
        <TouchableOpacity style={{paddingRight:8}}  >
          <CartIcon/>
        </TouchableOpacity>
      
      </View>
      ),
      headerStyle: {
        backgroundColor: '#ffffff', //Set Header color
      },
      headerTitleAlign: 'center',
      headerTintColor: '#3b2322', //Set Header text color
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  />
    </Stack.Navigator>
  );
};


const Router = () => {
    return (
      <NavigationContainer>
      <Drawer.Navigator 
      initialRouteName="HomeScreenStack"
       gesturesEnabled={true}
       drawerContent={(props) => <SideMenu {...props}/>}
        // drawerContentOptions={{
        //   activeTintColor: '#3b2322',
        //   itemStyle: {marginVertical: 5},
        // }}
        >
         
         
        <Drawer.Screen
          name="HomeScreenStack"
          options={{drawerLabel: 'Home'}}
          component={HomeScreenStack}
        />
        <Drawer.Screen
          name="DrawerScreenStack"
          options={{drawerLabel: 'Login',}}
          component={DrawerScreenStack}
        />
        <Drawer.Screen
          name="menuScreenStack"
          options={{drawerLabel: 'menuScreenStack'}}
          component={menuScreenStack}
        />
        <Drawer.Screen
          name="ScreenStack"
          options={{drawerLabel: 'ScreenStack'}}
          component={ScreenStack}
         />    
      </Drawer.Navigator>
    </NavigationContainer>
    );
  };
export default Router;