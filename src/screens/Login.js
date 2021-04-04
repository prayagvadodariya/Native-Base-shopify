import React, { useState } from 'react';
import { View, Image, StyleSheet, TextInput, FlatList, TouchableOpacity, ImageBackground, Dimensions, SafeAreaView,TouchableHighlight, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as yup from 'yup';
import {loginValidationSchema, forgetValidationSchema} from '../yupValidation/ValidationSchema';
import Dialog, { SlideAnimation, DialogContent } from 'react-native-popup-dialog';
import Button from '../component/Button';
import FButton from '../component/FButton';


const Login = () => {
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const navigation = useNavigation(); 

    return (
      <View>
           
          <View style={styles.logo}>
          <Image resizeMode="contain" style={styles.logopossition} source={require('../assets/images/logo.webp')}/> 
          </View>

          <View>
              <Text style={styles.title}>LOGIN</Text>
              <Image resizeMode="contain" style={styles.img} source={require('../assets/images/2.webp')}/> 
          </View>

          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{ email: '', password: '' }}
            onSubmit={values => console.log(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, isValid,}) => (
          <View>
            <View style={styles.inputView} >
              <TextInput
              name="email"
              style={styles.inputText}
              placeholder="Enter your email here" 
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
              />
              </View>
              
              {errors.email &&
                <Text style={{ fontSize: 13, color: 'red', marginLeft: 40 }}>{errors.email}</Text>
              }

              <View style={styles.inputView} >
              <TextInput
              name="password"
              style={styles.inputText}
              placeholder="Enter your password here"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry 
              />
              </View>

              {errors.password &&
                <Text style={{ fontSize: 13, color: 'red', marginLeft: 40 }}>{errors.password}</Text>
              }

              <Button  onPress={handleSubmit} disabled={!isValid}>LOGIN</Button>
            </View>
            )}
            </Formik>
        
            <View>
              <TouchableOpacity><Text style={styles.forget}  onPress={showModal} >FORGET PASSWORD ?</Text></TouchableOpacity>
              <TouchableOpacity><Text style={styles.signup} onPress={ () => navigation.navigate('DrawerScreenStack', { screen: 'Signup' })}>DON'T HAVE AN ACCOUNT ? SIGN UP</Text></TouchableOpacity>
            </View>

            <View style={styles.container}>
              <Dialog
                onTouchOutside={() => {
                 setVisible(false)
                }}
                visible={visible} onPress={hideModal}
                dialogAnimation={new SlideAnimation({
                  slideFrom: 'bottom',})}>
                <DialogContent>

                <View>
                  <Text style={styles.fname}>FORGOT PASSWORD ?</Text>
                  <Text style={styles.fdetail}>Well'll send you a reset link.</Text>
                </View>

              <Formik
                  validationSchema={forgetValidationSchema}
                  initialValues={{ email: ''}}
                  onSubmit={values => console.log(values)}
              >
            {({ handleChange, handleBlur, handleSubmit, values, errors, isValid,}) => (
                <>    
                <View>
                    <Text style={styles.name}>Email</Text>  
                    <View style={styles.inputView1} >
                        <TextInput
                        style={styles.inputText}
                        name="email"
                        placeholder="Enter your email here" 
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        keyboardType="email-address"
                        />
                    </View>
                </View>

                {errors.email &&
                  <Text style={{ fontSize: 13, color: 'red', marginLeft: 25, marginTop:10 }}>{errors.email}</Text>
                }

                <FButton  onPress={handleSubmit} disabled={!isValid}>GET LINK</FButton>
                </>
                 )}
                 </Formik>


                </DialogContent>
              </Dialog>
            </View>
      </View>
  
    );
  
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    justifyContent:"center"
  },
 logo: {
   flex:1,
   justifyContent:"center"
 },
 logopossition: {
  width:"100%",
  height:130,
  marginTop:50,
 },
 title: {
  fontSize:45,
  fontFamily:"Roboto",
  color:"#1c4252",
  marginTop:18,
  // margin:15,
  textAlign:"center"
 },
 img: {
  width:"100%",
  height:20,
 },
 inputView: {
  flex:1,
  marginTop: 25,
  marginLeft:20,
  marginRight:20,
  backgroundColor:"white",
  borderRadius:30,
  height:50,
  marginBottom:20,
  borderColor:'#5e290e',
  borderWidth:1,
  justifyContent:"center",
  padding:20  
},
inputText:{
  height:50,
  color:"black"
},
forget: {
  textAlign:"center",
  color:'#5e290e',
  marginTop: 10,
  fontWeight: 'bold'
},
signup: {
  textAlign:'center',
  color:'#5e290e',
  marginTop: 20,
  marginBottom:10,
  fontWeight: 'bold',
},
fname: {
  marginTop:10,
  fontSize:30,
  fontFamily:"Roboto",
  color:"#1c4252",
},
fdetail: {
 fontSize:15,
 fontWeight:'bold',
 color:"#54524d",
},
inputView1: {
  flex:1,
  backgroundColor:"white",
  borderRadius:30,
  height:50,
  borderColor:'#5e290e',
  borderWidth:1,
  justifyContent:"center",
  padding:20  
},
name: {
  marginTop: 15,
  marginLeft: 25,
  marginBottom:4, 
  fontSize:18,
  fontWeight: 'bold',
  color: '#808080',  
},

});

export default Login;