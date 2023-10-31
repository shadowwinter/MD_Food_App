import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { FONTS, COLORS, SIZES } from "../constants/theme.js"

const CategoryCard = function({containerStyle, categoryItem, onPress}){
    return(
        <TouchableOpacity 
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
                marginTop: 10,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.grey2,
                ...containerStyle
            }}
            onPress={onPress}
        >
            {/* Image */}

            <Image
                source={categoryItem.image}
                resizeMode="cover"
                style={{
                    width:100,
                    height:100,
                    borderRadius: SIZES.radius
                }}
            />

            {/* Details */}

            <View style={{width: '65%', paddingHorizontal: 20}} >
                {/* Name */}
                <Text style={{flex:1, ...FONTS.h2}} >
                    {categoryItem.name}
                </Text>
                
                {/* Servings */}
                <Text style={{color: COLORS.grey, ...FONTS.body4}}>
                    {categoryItem.duration} | {categoryItem.serving} servings
                </Text>
            </View>          



        </TouchableOpacity>
    )
}


export default CategoryCard;