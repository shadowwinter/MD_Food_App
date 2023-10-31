import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { COLORS } from "../constants/theme.js"

const TabIcon = ({focused, icon}) => {
    return (
        <View styles={styles.iconContainer}>

            <Image
                source={focused ? icon[1] : icon[0]}
                resizeMode='contain'
                style={{
                    width: 40,
                    height: 30,
                    tintColor: focused ? COLORS.darkGreen : COLORS.lightLime
                }}
            />

            {focused &&
                <View
                    style={styles.focusedLine}
                />
            }
        </View>
    )
}


const styles = StyleSheet.create({
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
        width: 50,
    },
    
    focusedLine: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -10,
        height: 5,
        borderRadius: 5,
        backgroundColor: COLORS.darkGreen
    },

  });

  
  export default TabIcon;