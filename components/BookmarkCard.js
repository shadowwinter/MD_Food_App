import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { FONTS, COLORS, SIZES } from "../constants/theme.js"
import { useNavigation } from '@react-navigation/native';


const BookmarkCard = function({navigation, route, containerStyle, categoryItem, onPress}){
       
    let label = categoryItem[0]
    let serving = categoryItem[1]
    let source = categoryItem[2]
    let uri = categoryItem[3]
    let image = categoryItem[4]

    navigation = useNavigation();
       

    return(
        <TouchableOpacity 
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
                marginTop: 10,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.lightGrey,
                ...containerStyle
            }}
            onPress={()=>navigation.navigate("BookmarkRecipe",{uri:uri})}
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


export default BookmarkCard;