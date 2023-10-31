import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { FONTS, COLORS, SIZES } from "../constants/theme.js"
import { useNavigation } from '@react-navigation/native';

const ResultCard = function({navigation , containerStyle, categoryItem, onPress}){
    
    var recipeLabels = [];

    var uri, label, image, source, url, shareAs, serving, dietLabels, healthLabels, cautionLabels, ingredientLines;
    var diet, health, caution, ingredient;

    function extractDetails(){
        categoryItem[0] = categoryItem[0].slice(0,-1);
        recipeLabels = categoryItem[0].split(',"');

        uri = recipeLabels[0].slice(8,-1)
        label = recipeLabels[1].slice(8,-1)
        image = recipeLabels[2].slice(8,-1)
        source = recipeLabels[3].slice(9,-1)
        url = recipeLabels[4].slice(6,-1)
        shareAs = recipeLabels[5].slice(10,-1)
        serving = recipeLabels[6].slice(7)

        categoryItem[1] = categoryItem[1].slice(1);

        diet = categoryItem[1].split(',"healthLabels":')
        dietLabels = diet[0].slice(1,-1);

        health = diet[1].split(',"cautions":')
        healthLabels = health[0].slice(1,-1);

        caution = health[1].split(',"ingredientLines":')
        cautionLabels = caution[0].slice(1,-1);

        ingredient = caution[1].split(',"ingredients"')
        ingredientLines = ingredient[0].slice(1,-1);

    }

    {extractDetails()}
    navigation = useNavigation();
    
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
            onPress={()=>navigation.navigate("Recipe",{
                link1: uri, 
                title: label, 
                img: image, 
                oriSource: source, 
                link2: url, 
                apiSource: shareAs, 
                servings: serving,
                dietLabel: dietLabels, 
                healthLabel: healthLabels, 
                cautionLabel: cautionLabels, 
                ingredientLine: ingredientLines
            })}
        >
            {/* Image */}

            <Image
                source={{uri:image}}
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
                    {label}
                </Text>
                                
                {/* Servings */}
                <Text style={{color: COLORS.grey, ...FONTS.body4}}>
                    {serving} servings | {source}
                </Text>
            </View>          

        </TouchableOpacity>
    )

}


export default ResultCard;