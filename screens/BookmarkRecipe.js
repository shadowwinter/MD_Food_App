import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Animated,  Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { FONTS, COLORS, SIZES } from "../constants/theme.js"
import { ICONS } from '../constants/icons.js'
import { DUMMYDATA } from '../constants/dummyData.js'

const HEADER_HEIGHT = 350;


const BookmarkRecipe = function({navigation, route}) {

    const scrollY = useRef(new Animated.Value(0)).current;

    const [errorMsg, setErrorMsg] = useState(null);
    const [responseMsg, setResponseMsg] = useState('');

    const APP_KEY = 'edaf40f6b8e73418600e642c64c17e97'
    const APP_ID = '8bf92b34'
    
    let uri = route.params.uri

    var responseBreakdown = [];
    var recipesRetrieved = [];

    useEffect( ()=> {
        getRecipes()
    },[extractRecipes()])

    const getRecipes = async() =>{
        var encoded = encodeURIComponent(uri);
        var url = `https://api.edamam.com/api/recipes/v2/by-uri?type=public&uri=${encoded}&app_id=${APP_ID}&app_key=${APP_KEY}`
        const response = await fetch(url,{
            method:"GET",
            headers:{
                Accept:'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response)=>response.json())
        .then((json)=>{
            setResponseMsg(JSON.stringify(json));
            console.log("HERE")
            console.log(responseMsg)

        })
        .catch((error)=>{
            setErrorMsg(error);
            console.log("Error: " + errorMsg)
        })
    }
    
    function extractRecipes(){
                
        var newResponse = responseMsg;
        
        // the first item in array will be the labels 
        // the next N items are each recipes
        responseBreakdown = newResponse.split('"recipe":')
        
        for (var i=1; i<responseBreakdown.length; i++){
            var temp = responseBreakdown[i].split('"dietLabels"')
            recipesRetrieved.push(temp);
        }

        // console.log("BREAKDOWN: "+ recipesRetrieved)

    }


    function renderHeaderBar(){
        
        {getRecipes()}

        return(
            <View style={styles.headerBarContainer}>
                
                {/* screen overlay */}
                <Animated.View 
                    style={{
                        position: 'absolute',
                        top: -10,
                        left: 0,
                        right: 0,
                        botttom: 0,
                        width:'150%', 
                        height: 110,
                        backgroundColor: COLORS.black,
                        opacity: scrollY.interpolate({
                            inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT -70],
                            outputRange: [0, 1]
                        })
                    }}
                />

                {/* header bar title  */}
                <Animated.View
                    style={{
                        position: 'absolute',
                        top: -10, 
                        left: 0,
                        right: 0, 
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        paddingBottom: 10,
                        opacity: scrollY.interpolate({
                            inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT -70],
                            outputRange: [0, 1]
                        }),
                        transform: [
                            {
                                translateY: scrollY.interpolate({
                                    inputRange: [HEADER_HEIGHT-100, HEADER_HEIGHT-50],
                                    outputRange: [50, 0],
                                    extrapolate: 'clamp'
                                })
                            }
                        ]
                    }}
                >
                    <Text style={{color:COLORS.lightGrey2, ...FONTS.body4}}>Recipe by:</Text>
                    {/* <Text style={{color:COLORS.white2, ...FONTS.h3}}>{source}</Text> */}

                </Animated.View>


                {/* back button */}
                <TouchableOpacity 
                    style={styles.headerBackButton}
                    onPress={()=>navigation.goBack()}
                >
                    {/* <Image
                        source={ICONS.back}
                        style={{width:15, height:15, tintColor:COLORS.lightGrey}}
                    /> */}
                </TouchableOpacity>

                {/* bookmark button */}
                <TouchableOpacity
                    styles={styles.headerBookmarkButton}
                    // onPress={()=>saveRecipe()}
                >
                    <Image
                        source={ICONS.bookmark}
                        style={{width:35, height:35, tintColor:COLORS.darkGreen}}
                    />
                </TouchableOpacity>

            </View>
        )
    }

    return (
    
        <View
            style={{
                flex: 1,
                backgroundColor:COLORS.white
            }}
        >
            <Animated.FlatList
                data={DUMMYDATA.trendingRecipes}
                keyExtractor={item=>`${item.id}`}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
                        {/* header  */}
                        {/* {renderRecipeCardHeader()} */}

                        {/* info */}
                        {/* {renderRecipeInfo()} */}

                        {/* dietary info */}
                        {/* {renderHealthInfo()} */}

                        {/* ingredient title */}
                        {/* {renderIngredientHeader()} */}
                    </View>
                }
                scrollEventThrottle={16}
                onScroll={Animated.event([
                    {nativeEvent:{contentOffset:{y:scrollY}}}
                ], {useNativeDriver: true})}
                renderItem={({item})=>(
                  
                    <View style={styles.ingredientRow} >

                        {/* icon */}
                        {/* <View style={styles.ingredientIcon}>
                            <Image
                                source={ICONS.tick}
                                style={{height:30,width:30}}
                            />
                        </View> */}
                        
                        {/* description */} 
                        {/* <View style={styles.ingredientDescription}>
                            <Text style={{...FONTS.body3}}>{item.key}</Text>
                        </View> */}
                        
                    </View>
                )}
            />

        {renderHeaderBar()}

        </View>
    )
}
const styles = StyleSheet.create({

    ingredientRow:{
        flexDirection: 'row',
        paddingHorizontal: 30,
        marginVertical: 5,
        marginTop: -15,
        paddingBottom: 20,
    },

    ingredientIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: 40, 
        borderRadius: 5,
        backgroundColor: COLORS.lightGrey
    },

    ingredientDescription: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center'
    },

    recipeCardContainer: {
        marginTop: -1000,
        paddingTop: 1000,
        alignItems: 'center', 
        overflow: 'hidden'
    },

    recipeCreatorCardButton: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLORS.lightGreen1
    },

    headerBarContainer: {
        position: 'absolute',
        top: 10,
        left: 0,
        right: 0,
        height: 90,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingHorizontal: SIZES.padding,
        paddingBottom: 10
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

    headerBookmarkButton: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 35,
        width: 35
    },

    recipeInfoContainer: {
        flexDirection: 'row',
        width: SIZES.width,
        paddingHorizontal: 30,
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: COLORS.lightGrey
    },

    healthInfoContainer: {
        flexDirection: 'column',
        width: SIZES.width,
        paddingHorizontal: 30,
        paddingVertical: 10,
        alignItems: 'flex-start',
        
    },

    ingredientHeaderContainer: {
        flexDirection: 'row',
        paddingHorizontal: 30,
        marginBottom: SIZES.padding
    },

});

export default BookmarkRecipe;