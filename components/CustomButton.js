import React from "react";
import { TouchableOpacity, Text, Touchable } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS } from '../constants/theme.js'


const CustomButton = function({buttonText, buttonContainerStyle, colors, textColor, onPress}){
    
    //if we supply background colour for the button
    if(colors.length > 0){
        return (
            <TouchableOpacity onPress={onPress}>
                <LinearGradient
                    start={{x:0,y:0}}
                    end={{x:1,y:0}}
                    colors={colors}
                    style={{...buttonContainerStyle}}
                >
                    <Text style={{textAlign: 'center', color: textColor, ...FONTS.h3}}>
                        {buttonText}
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        )
    }
    else {
        return (
            <TouchableOpacity onPress={onPress} style={{...buttonContainerStyle}}>
                <Text style={{textAlign: 'center', color: textColor, ...FONTS.h3}}>
                    {buttonText}
                </Text>
            </TouchableOpacity>
        )
    }
}

export default CustomButton;