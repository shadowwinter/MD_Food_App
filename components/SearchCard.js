import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { FONTS, COLORS, SIZES } from "../constants/theme.js"

const SearchCard = function({containerStyle, recipeItem, onPress}){
    
    return(
        <TouchableOpacity 
            style={{
                height:120,
                width:100,
                marginTop: SIZES.radius,
                marginRight: 10,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.grey,
                ...containerStyle
            }}
            onPress={onPress}
        >
            {/* Icon Image */}
            <Image
                source={recipeItem.image}
                resizeMode='cover'
                style={styles.iconImage}
            />

            {/* Name */}
            <View style={styles.itemNameLabel}>
                <Text style={{color:COLORS.white, ...FONTS.h4}}>
                    {recipeItem.name}
                </Text>
            </View>
            
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    iconImage: {
        position: 'absolute',
        left: 10,
        right: 10,
        top: 10,
        width: 80,
        height: 80,
        borderRadius: SIZES.radius
    },

    itemNameLabel: {
        position: 'absolute',
        bottom: 0,
        left: 2,
        right: 2,
        alignItems: 'center',
        paddingHorizontal: SIZES.radius,
        paddingVertical: 5,
        borderRadius: SIZES.radius
    },

    recipeCardContainer: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
        height: 100,
        paddingVertical: SIZES.radius,
        paddingHorizontal: SIZES.base,
        borderRadius: SIZES.radius
    },

    recipeCardText: {
        width: '85%', 
        marginTop: -2,
        marginLeft: 2,
        color: COLORS.white, 
        ...FONTS.h3, 
        fontSize: 18
    },

    recipeCardBookmarkIcon: {
        width: 25, 
        height: 25, 
        marginRight: SIZES.base-7, 
        marginTop: -3,
        tintColor: COLORS.darkGreen
    }

});

export default SearchCard;