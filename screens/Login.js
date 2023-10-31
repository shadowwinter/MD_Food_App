import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Pressable, Image, ImageBackground } from 'react-native';
import Checkbox from 'expo-checkbox';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FONTS, COLORS, SIZES } from "../constants/theme.js"
import { IMAGES } from '../constants/images.js'
import { ICONS } from '../constants/icons.js'
import CustomButton from '../components/CustomButton.js';



export default function LoginPage({navigation, route}) {
  const [emailText, setEmailText] = useState('');
  const [passwordText, setPasswordText] = useState('');
  const {passwordVisibility, rightIcon, handlePasswordVisibility} = useTogglePasswordVisibility();
  const [selection, setSelection] = useState(false);

  function useTogglePasswordVisibility(){
    const [passwordVisibility, setPasswordVisibility] = useState(true);
      const [rightIcon, setRightIcon] = useState('eye');
    
      const handlePasswordVisibility = () => {
        if (rightIcon === 'eye') {
          setRightIcon('eye-off');
          setPasswordVisibility(!passwordVisibility);
        } else if (rightIcon === 'eye-off') {
          setRightIcon('eye');
          setPasswordVisibility(!passwordVisibility);
        }
      };
    
      return {
        passwordVisibility,
        rightIcon,
        handlePasswordVisibility
      };
  }

  function renderHeader(){
    return(         

        <View style={styles.headerContainer}>
            
            {/* back button */}
            <TouchableOpacity 
                style={styles.headerBackButton}
                onPress={()=>navigation.navigate("Home")}
            >
                <Image
                    source={ICONS.back}
                    style={{width:15, height:15, tintColor:COLORS.lightGrey}}
                />
            </TouchableOpacity> 
            
            {/* text */}
            <View style={styles.textContainer}>
                <Text style={styles.headerText}>Login</Text>
            </View>

            <View style={styles.spacer}></View>             

        </View>
    )
}
  return(
  
   <SafeAreaView style={{flex:1, backgroundColor:COLORS.white}}>
      <ImageBackground source={IMAGES.kitchen} resizeMode="cover" style={styles.bgImage} imageStyle={{opacity:0.2}}>
      {renderHeader()}  

      {/* container of entire page */}
      <View style={styles.container}> 

        {/* container of title portion */}
        <View style={{...FONTS.largeTitle}}>
          <Text style={styles.title}>Welcome to</Text>  
          <Text style={[styles.title,{marginTop: 10}]}>PocketPantry</Text>  
        </View>

        <TextInput
          style={styles.emailInput}
          placeholder="Email address"
          onChangeText={emailText => setEmailText(emailText)}
          inputMode='email'
          defaultValue={emailText}
        />

        {/* password container */}
        <View style={styles.passwordInput}>
          <TextInput
            style={styles.inputField}
            placeholder="Password"
            secureTextEntry={passwordVisibility}
            onChangeText={passwordText => setPasswordText(passwordText)}
            inputMode='text'
            defaultValue={passwordText}
          />

          <Pressable onPress={handlePasswordVisibility}>
            <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
          </Pressable>
        </View>

        {/* forget and remember me container  */}
        <View style={styles.links}>

          <View style={styles.rememberMe}>
            <Checkbox
              value={selection}
              onValueChange={setSelection}
              style={styles.checkbox}
            />
            <Text>Remember Me</Text>
          </View>

          <View style={styles.forgetPassword}>
            <TouchableOpacity>
              <Text style={{color:'mediumblue', textDecorationLine: 'underline'}}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        
        </View>

        {/* buttons container */}
        <View style={{flex:1, flexDirection:'row'}}>
          <CustomButton
            buttonText = "Login"
            buttonContainerStyle={styles.loginButton}
            colors={[COLORS.darkGreen, COLORS.lime]}
            textColor={COLORS.white}
            onPress={() => {navigation.navigate("Home")}}
          />

          <CustomButton
            buttonText = "Sign Up"
            buttonContainerStyle={styles.signUpButton}
            colors={[]}
            textColor={COLORS.black}
            onPress={() => {navigation.navigate("Home")}}          
          />

        </View>
        
      </View>   
      </ImageBackground>
    </SafeAreaView>
    
  )
}

const styles = StyleSheet.create({

  bgImage: {
    flex: 1,
    width: null,
    height: null,
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SIZES.padding
  },

  title: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    ...FONTS.h1
  },

  inputField: {
    width: '90%'
  },

  emailInput: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    marginHorizontal: SIZES.padding,
    paddingHorizontal: SIZES.radius,
    borderRadius: 10,
    backgroundColor: COLORS.lightGrey,
    marginLeft: SIZES.radius, 
    width:'80%', 
    marginBottom: 20,
    marginTop: 20,
    ...FONTS.body3
  },

  passwordInput:{
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    marginHorizontal: SIZES.padding,
    paddingHorizontal: SIZES.radius,
    borderRadius: 10,
    backgroundColor: COLORS.lightGrey,
    marginLeft: SIZES.radius, 
    marginBottom: 20,
    width:'80%', 
    ...FONTS.body3
  },  

  links: {
    flexDirection:'row',
    width: '80%'
  },

  loginButton: {
    marginTop:SIZES.radius,
    marginRight: SIZES.radius,
    padding:20,
    borderRadius:20,
    height: 60,
    borderColor: COLORS.black,
    borderWidth: 1
    },

  signUpButton:{
    padding:20,
    borderRadius:20,
    marginTop: SIZES.radius,
    marginLeft: SIZES.radius,
    height: 60,
    borderColor: COLORS.darkLime,
    borderWidth: 1
  },

  checkbox: {
    marginTop: 2,
    marginRight: 5
  },

  rememberMe: {
    flexDirection: 'row',
    flex:1,
    alignItems: 'flex-start',
    padding: 10,
  },

  forgetPassword: {
    alignItems: 'flex-end',
    padding: 10,
    
  },

  signUp: {
    backgroundColor: 'beige',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    margin: 10
  },

  signUpText: {
    color: 'green'
  },

  headerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    paddingTop:50,
    marginTop:-60,
    alignItems: 'center',
    backgroundColor: COLORS.grey2,
},

textContainer: {
    height: 80,
    flex: 1,
    justifyContent: 'center',
},

headerBackButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    width: 35,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
    backgroundColor: COLORS.transparentBlack5
},

spacer: {
    width: 35,
    backgroundColor: COLORS.transparent
},

headerText: {
    marginTop: 3,
    textAlign: 'center',
    color: COLORS.black,
    ...FONTS.body3
}

});