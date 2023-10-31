import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Platform } from 'react-native';
import { FONTS, COLORS, SIZES } from "../constants/theme.js"
import { ICONS } from '../constants/icons.js'
import { BlurView } from 'expo-blur';

const HorizontalCard = function({containerStyle, recipeItem, onPress}){
    
    const RecipeCardDetails = function({recipeItem}){
        return(
            <View style={{flex:1}}>
                {/* Name and bookmark */}
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
                
                    <Text style={styles.recipeCardText}>
                        {recipeItem.name}
                    </Text>
                
                    <Image
                        source={recipeItem.isBookmarked ? ICONS.bookmarkFilled : ICONS.bookmark}
                        style={styles.recipeCardBookmarkIcon}
                    />
                
                </View>
    
                {/* Duration and serving */}
                <Text style={{color: COLORS.lightGrey, ...FONTS.body4}}>
                    {recipeItem.duration} | {recipeItem.serving} servings
                </Text>
    
            </View>
        )
    }
    
    const RecipeCardInfo = function({recipeItem}){
        return(
            <BlurView
                tint='dark'
                overflow='hidden'
                style={styles.recipeCardContainer}
            >
                <RecipeCardDetails
                    recipeItem={recipeItem}
                />
    
            </BlurView>
        )
    }
    
    
    return(
        <TouchableOpacity 
            style={{
                height:350,
                width:250,
                marginTop: SIZES.radius,
                marginRight: 20,
                borderRadius: SIZES.radius,
                ...containerStyle
            }}
            onPress={onPress}
        >
            {/* Background Image */}
            <Image
                source={recipeItem.image}
                resizeMode='cover'
                style={{width:250,height:350,borderRadius:SIZES.radius}}
            />

            {/* Category */}
            <View style={styles.categoryLabel}>
                <Text style={{color:COLORS.white, ...FONTS.h4}}>
                    {recipeItem.category}
                </Text>
            </View>
            
            {/* Card Info */}
            <RecipeCardInfo
                recipeItem={recipeItem}
            />


        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    categoryLabel: {
        position: 'absolute',
        top: 20,
        left: 15,
        paddingHorizontal: SIZES.radius,
        paddingVertical: 5,
        backgroundColor: COLORS.transparentGrey,
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

export default HorizontalCard;