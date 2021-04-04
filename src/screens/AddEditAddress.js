import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TextInput, FlatList, TouchableOpacity, ImageBackground, Dimensions, SafeAreaView,TouchableHighlight, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Entypo, Ionicons, Feather, EvilIcons } from '@expo/vector-icons';
import Button from '../component/Button';
import {addressValidationSchema} from '../yupValidation/ValidationSchema';
import { Formik } from 'formik';
import * as yup from 'yup';



const AddEditAddress = (props) => {
  const navigation = useNavigation(); 
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  console.log("props",props);


  useEffect(() => {
    if (props.route.params.active===true) {
        navigation.setOptions({title: 'ADD NEW ADDRESS', headerRight:false});   
    }else{
        navigation.setOptions({title: 'EDIT ADDRESS'}); 
    }
  }, [navigation, props.route]);
  
  useEffect(() => {
    if(props.route.params.active===true){
      setFirstName(''),
      setLastName(''),
      setCompany(''),
      setAddress1(''),
      setAddress2(''),
      setCity(''),
      setPincode('')
      console.log('add');
    }else{
        setFirstName(props.route.params.data.firstname),
        setLastName(props.route.params.data.lastname),
        setCompany(props.route.params.data.company),
        setAddress1(props.route.params.data.address1),
        setAddress2(props.route.params.data.address2),
        setCity(props.route.params.data.city),
        setPincode(props.route.params.data.pincode)
        console.log('edit',props.route.params.data.firstname);
    }    
  }, [props.route]);
        
    return (
      <ScrollView>
          <Formik
            enableReinitialize={true}
            validationSchema={addressValidationSchema}
            initialValues={{ firstname: firstname, lastname: lastname, company: company, address1: address1, address2: address2, city: city, pincode: pincode }}
            onSubmit={values => console.log(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, isValid,}) => (
            <>
            <View>
                <Text style={styles.name}>First Name</Text>  
                <View style={styles.inputView} >
                    <TextInput style={styles.inputText}
                     placeholder="First Name"
                     name="firstname"
                     onChangeText={handleChange('firstname')}
                     onBlur={handleBlur('firstname')}
                     value={values.firstname}
                     keyboardType="firstname"
                    //  onChangeText={first}
                    //  value={text}    
                     />
                </View>
            </View>

            {errors.firstname &&
               <Text style={{ fontSize: 13, color: 'red', marginLeft: 40, marginTop: 10 }}>{errors.firstname}</Text>
            }

            <View>
                <Text style={styles.name}>Last Name</Text>  
                <View style={styles.inputView} >
                    <TextInput style={styles.inputText}
                     placeholder="Last Name"
                     name="lastname"
                     onChangeText={handleChange('lastname')}
                     onBlur={handleBlur('lastname')}
                     value={values.lastname}
                     keyboardType="lastname"
                     />
                </View>
            </View>

            {errors.lastname &&
               <Text style={{ fontSize: 13, color: 'red', marginLeft: 40, marginTop: 10 }}>{errors.lastname}</Text>
            }

            <View>
                <Text style={styles.name}>Company</Text>  
                <View style={styles.inputView} >
                    <TextInput style={styles.inputText}
                     placeholder="Company"
                     name="company"
                     onChangeText={handleChange('company')}
                     onBlur={handleBlur('company')}
                     value={values.company}
                     keyboardType="company"
                     />
                </View>
            </View>

            {errors.company &&
               <Text style={{ fontSize: 13, color: 'red', marginLeft: 40, marginTop: 10 }}>{errors.company}</Text>
            }

            <View>
                <Text style={styles.name}>Address 1</Text>  
                <View style={styles.inputView} >
                    <TextInput style={styles.inputText}
                     placeholder="Address 1"
                     name="address1"
                     onChangeText={handleChange('address1')}
                     onBlur={handleBlur('address1')}
                     value={values.address1}
                     keyboardType="address1"
                     />
                </View>
            </View>

            {errors.address1 &&
               <Text style={{ fontSize: 13, color: 'red', marginLeft: 40, marginTop: 10 }}>{errors.address1}</Text>
            }

            <View>
                <Text style={styles.name}>Address 2</Text>  
                <View style={styles.inputView} >
                    <TextInput style={styles.inputText}
                     placeholder="Address 2"
                     name="address2"
                     onChangeText={handleChange('address2')}
                     onBlur={handleBlur('address2')}
                     value={values.address2}
                     keyboardType="address2"
                    />
                </View>
            </View>

            {errors.address2 &&
               <Text style={{ fontSize: 13, color: 'red', marginLeft: 40, marginTop: 10 }}>{errors.address2}</Text>
            }

            <View>
                <Text style={styles.name}>City</Text>  
                <View style={styles.inputView} >
                    <TextInput style={styles.inputText}
                     placeholder="City"
                     name="city"
                     onChangeText={handleChange('city')}
                     onBlur={handleBlur('city')}
                     value={values.city}
                     keyboardType="city"
                     />
                </View>
            </View>

            {errors.city &&
               <Text style={{ fontSize: 13, color: 'red', marginLeft: 40, marginTop: 10 }}>{errors.city}</Text>
            }

            {/* <View>
                <Text style={styles.name}>Country</Text>  
                <View style={styles.inputView} >
                    <Text style={styles.inputText}>India</Text>
                </View>
            </View>
            <View>
                <Text style={styles.name}>State</Text>  
                <View style={styles.inputView} >
                    <Text style={styles.inputText}>Gujarat</Text>
                </View>
            </View> */}
            <View>
                <Text style={styles.name}>Zip</Text>  
                <View style={styles.inputView} >
                    <TextInput style={styles.inputText}
                     placeholder="Pin code"
                     name="pincode"
                     onChangeText={handleChange('pincode')}
                     onBlur={handleBlur('pincode')}
                     value={values.pincode}
                     keyboardType="numeric"
                     />
                </View>
            </View>

            {errors.pincode &&
               <Text style={{ fontSize: 13, color: 'red', marginLeft: 40, marginTop: 10 }}>{errors.pincode}</Text>
            }

            {/* <View>
                <Text style={styles.name}>Language</Text>  
                <View style={styles.inputView} >
                    <Text style={styles.inputText}>Language</Text>
                </View>
            </View>  */}

            
            <Button onPress={handleSubmit} disabled={!isValid}>SAVE</Button>
          
         </>
         )}
         </Formik>   
      </ScrollView>
  
    );
  
}


const styles = StyleSheet.create({
  cover: {
    marginTop:10,
    marginLeft:15,
    marginRight:15,
    backgroundColor:"#fff"
  },
  name: {
    marginTop: 20,
    marginLeft: 21,
    marginBottom:4, 
    fontSize:12,
    fontWeight: 'bold',
    color: '#808080',  
  },
  inputView: {
    flex:1,
    marginLeft:20,
    marginRight:20,
    backgroundColor:"white",
    borderRadius:10,
    height:20,
    borderColor:'white',
    borderWidth:1,
    justifyContent:"center",
    padding:10  
  },
});

export default AddEditAddress;