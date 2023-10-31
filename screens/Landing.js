import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, FONTS } from '../constants/theme.js'
import { IMAGES } from "../constants/images.js"
import CustomButton from '../components/CustomButton.js';

const Landing = function({navigation}) {

    function renderHeader(){
        return(
            <View style={{height:'65%'}}>

                <ImageBackground 
                    source={IMAGES.grill} 
                    style={styles.header}
                    resizeMode='cover'
                >
                    <LinearGradient
                        start={{x:0,y:0}}
                        end={{x:0,y:1}}
                        colors={[COLORS.transparent, COLORS.black]}
                        style={styles.headerGradient}
                    >
                        <Text style={styles.headerText}>
                            PocketPantry: Your all-in-one kitchen buddy
                        </Text>
                    </LinearGradient>
                </ImageBackground>
            </View>
        )
    }

    function renderDetail(){
        return(
            <View style={styles.detail}>
                {/* Description  */}
                <Text style={styles.detailText}>
                    Discover thousands of recipes right at your fingertips!
                </Text>

                {/* Buttons */}

                <View style={{flex:1, backgroundColor:'black'}}>
                    {/* Login button */}
                    <CustomButton
                        buttonText = "Login"
                        buttonContainerStyle={styles.loginButton}
                        colors={[COLORS.darkGreen, COLORS.lime]}
                        textColor={COLORS.white}
                        onPress={()=>navigation.replace("Login")}
                    />
                    {/* Sign Up button */}
                    <CustomButton
                        buttonText = "Sign Up"
                        buttonContainerStyle={styles.signUpButton}
                        colors={[]}
                        textColor={COLORS.white}
                        onPress={()=>navigation.navigate("Login")}
                    />

                    <TouchableOpacity onPress={()=>navigation.replace("Home")}>
                        <Text style={styles.continueText}>Continue without account</Text>
                    </TouchableOpacity>

                </View>

            </View>
        )
    }

    return (
        <View style={styles.container}>
            
            <StatusBar style="light-content" />

            {/* Header */}
            {renderHeader()}

            {/* Detail */}
            {renderDetail()}


        </View>
  );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: COLORS.black
    },

    header: {
    flex: 1,
    justifyContent: 'flex-end',
    },

    headerGradient: {
    height: 200,
    justifyContent: 'flex-end',
    paddingHorizontal: SIZES.padding
    },

    headerText: {
    width:'80%', 
    color: COLORS.white, 
    ...FONTS.largeTitle, 
    lineHeight: 45
    },

    detail: {
    flex:1, 
    paddingHorizontal: SIZES.padding
    },

    detailText: {
    marginTop: SIZES.radius,
    width: "70%",
    color: COLORS.grey,
    ...FONTS.body3
    },

    loginButton: {
    marginTop:SIZES.radius,
    paddingVertical:18,
    borderRadius:20
    },

    signUpButton:{
        paddingVertical:18,
        borderRadius:20,
        marginTop: SIZES.radius,
        borderColor: COLORS.darkLime,
        borderWidth: 1
    },

    continueText: {
    color: COLORS.white,
    marginTop: SIZES.radius,
    textAlign: 'center',
    textDecorationLine: 'underline'
    }

});

export default Landing;