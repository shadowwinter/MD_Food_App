import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Animated,  Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { FONTS, COLORS, SIZES } from "../constants/theme.js"
import { ICONS } from '../constants/icons.js'

const HEADER_HEIGHT = 350;


const Recipe = function({navigation, route}) {

    const scrollY = useRef(new Animated.Value(0)).current;

    let uri = route.params.link1
    let label = route.params.title
    let image = route.params.img
    let source = route.params.oriSource
    let oriUrl = route.params.link2
    let shareAs = route.params.apiSource
    let serving = route.params.servings

    let dietLabel = route.params.dietLabel
    let healthLabel = route.params.healthLabel
    let cautionLabel = route.params.cautionLabel
    let ingredientLine = route.params.ingredientLine

    let dietLabels = []
    let healthLabels = []
    let cautionLabels = []
    let ingredientLines = []

    const currentRecipe = {
        uri : uri,
        label : label,
        source: source,
        serving : serving,
        image : image
    }

    function extractData(){

        // diet portion
        const diet = dietLabel.split(',')
        if(diet.length==1 && diet[0]==''){
            dietLabels.push("No Labels")
        }
        for (var i=0; i<diet.length; i++){
            if(i==(diet.length-1)){
                diet[i] = diet[i].slice(1,-1)
            }
            else {
                diet[i] = diet[i].slice(1,-1) + ', '
            }
            dietLabels.push(diet[i])
        }

        // health portion
        const health = healthLabel.split(',')
        if(health.length==1 && health[0]==''){
            healthLabels.push("No Labels")
        }
        for (var i=0; i<health.length; i++){
            if(i==(health.length-1)){
                health[i] = health[i].slice(1,-1)
            }
            else {
                health[i] = health[i].slice(1,-1) + ', '
            }
            healthLabels.push(health[i])
        }
        
        // caution portion
        const caution = cautionLabel.split(',')
        if(caution.length==1 && caution[0]==''){
            cautionLabels.push("No Labels")
        }
        for (var i=0; i<caution.length; i++){           
            if(i==(caution.length-1)){
                caution[i] = caution[i].slice(1,-1)
            }
            else {
                caution[i] = caution[i].slice(1,-1) + ', '
            }
            cautionLabels.push(caution[i])
        }
        
        // ingredeient portion
        const ingredient = ingredientLine.split(',')
        for (var i=0; i<ingredient.length; i++){           
            ingredient[i] = ingredient[i].slice(1,-1)
            ingredientLines.push({"key":`${ingredient[i]}`})
        }

    }

    useEffect(()=>{
        saveRecipe()
    },[])

    const saveRecipe = async() => {
        try {
            await AsyncStorage.setItem("recipes", JSON.stringify(currentRecipe));
            console.log("SAVED RECIPE")
          } catch (error) {
            console.log(error);
          }
    }


    function renderHeaderBar(){
        
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
                    <Text style={{color:COLORS.white2, ...FONTS.h3}}>{source}</Text>

                </Animated.View>


                {/* back button */}
                <TouchableOpacity 
                    style={styles.headerBackButton}
                    onPress={()=>navigation.goBack()}
                >
                    <Image
                        source={ICONS.back}
                        style={{width:15, height:15, tintColor:COLORS.lightGrey}}
                    />
                </TouchableOpacity>

                {/* bookmark button */}
                <TouchableOpacity
                    styles={styles.headerBookmarkButton}
                    onPress={()=>saveRecipe()}
                >
                    <Image
                        source={ICONS.bookmark}
                        style={{width:35, height:35, tintColor:COLORS.darkGreen}}
                    />
                </TouchableOpacity>

            </View>
        )
    }

    function RecipeCreatorCardInfo() {
        return(
            <BlurView 
                style={{flex:1, borderRadius:SIZES.radius}}
                tint='dark'
                overflow='hidden'
            >

                <View style={{flex:1, flexDirection: 'row', alignItems: 'center'}}>
                            
                    {/* labels */}
                    <View style={{flex:1, marginHorizontal:20}}>
                        <Text style={{color:COLORS.grey2, ...FONTS.body4}}>
                            Recipe by:
                        </Text>

                        <Text style={{color:COLORS.white2, ...FONTS.h3}}>
                            {source}
                        </Text>
                    </View>
        
                    {/* button */}
                    <TouchableOpacity style={styles.recipeCreatorCardButton}>
                        <Image
                            source={ICONS.rightArrow}
                            style={{width:15, height:15, tintColor:COLORS.lightGreen1}}
                            onPress={()=>Linking.openURL(oriUrl)}
                        />
                    </TouchableOpacity>
        
                </View>
            </BlurView>
        )
    }

    function renderRecipeCardHeader(){
        return(
            <View style={styles.recipeCardContainer}>
                
                {/* background image */}
                <Animated.Image 
                    source={{uri:image}}
                    resizeMode="contain"
                    style={{
                        height: HEADER_HEIGHT, 
                        width:'200%',
                        transform:[{
                            translateY: scrollY.interpolate({
                                inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                                outputRange: [-HEADER_HEIGHT/2, 0, HEADER_HEIGHT*0.75]
                            })
                        },
                        {
                            scale: scrollY.interpolate({
                                inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                                outputRange: [2, 1, 0.75]
                            })
                        }
                        ]
                    }}
                    
                />

                {/* recipe creator Card */}
                <Animated.View style={{
                    position: 'absolute',
                    bottom: 10, 
                    left: 30,
                    right: 30,
                    height: 80,
                    transform: [
                        {
                            translateY: scrollY.interpolate({
                                inputRange: [0, 170, 250],
                                outputRange: [0, 0, 100],
                                extrapolate: 'clamp'
                            })
                        }
                    ]
                }}>
                    <RecipeCreatorCardInfo/>
                </Animated.View>

            </View>
        )
    }

    function renderRecipeInfo(){
        return(
            <View style={styles.recipeInfoContainer}>
                {/* recipe */}
                <View style={{flex:1.5, justifyContent:'center'}}>
                    <Text style={{...FONTS.h2}}>{label}</Text>
                    <Text style={{marginTop:5, color:COLORS.lightGrey2, ...FONTS.body4}}>
                        {serving} servings 
                    </Text>
                </View>
            </View>
        )
    }

    function renderHealthInfo(){
  
        return(
            <View style={styles.healthInfoContainer}>
                
                <View style={{flex:1, justifyContent:'center'}}>
                    <Text style={{...FONTS.h3}}>Diet Labels:</Text>
                    <Text style={{marginTop:5, color:COLORS.lightGrey2, ...FONTS.body3}}>
                        {dietLabels} 
                    </Text>
                </View>
                
                <View style={{flex:1, marginTop:10, justifyContent:'center'}}>
                    <Text style={{...FONTS.h3}}>Health Labels:</Text>
                    <Text style={{marginTop:5, color:COLORS.lightGrey2, ...FONTS.body3}}>
                        {healthLabels} 
                    </Text>
                </View>
                
                <View style={{flex:1, marginTop:10, justifyContent:'center'}}>
                    <Text style={{...FONTS.h3}}>Caution Labels:</Text>
                    <Text style={{marginTop:5, color:COLORS.lightGrey2, ...FONTS.body3}}>
                        {cautionLabels}
                    </Text>
                </View>

                
            </View>
        )
    }

    function renderIngredientHeader(){
        return(
            <View style={styles.ingredientHeaderContainer}>
                <Text style={{flex:1,...FONTS.h3}}>Ingredients</Text>
                <Text style={{color:COLORS.lightGrey2,...FONTS.body4}}>{ingredientLines.length} items </Text>
            </View>
        )
    }

    {extractData()} 

    return (
        <View
            style={{
                flex: 1,
                backgroundColor:COLORS.white
            }}
        >
            <Animated.FlatList
                data={ingredientLines}
                keyExtractor={item=>`${item.id}`}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
                        {/* header  */}
                        {renderRecipeCardHeader()}

                        {/* info */}
                        {renderRecipeInfo()}

                        {/* dietary info */}
                        {renderHealthInfo()}

                        {/* ingredient title */}
                        {renderIngredientHeader()}
                    </View>
                }
                scrollEventThrottle={16}
                onScroll={Animated.event([
                    {nativeEvent:{contentOffset:{y:scrollY}}}
                ], {useNativeDriver: true})}
                renderItem={({item})=>(
                  
                    <View style={styles.ingredientRow} >

                        {/* icon */}
                        <View style={styles.ingredientIcon}>
                            <Image
                                source={ICONS.tick}
                                style={{height:30,width:30}}
                            />
                        </View>
                        
                        {/* description */} 
                        <View style={styles.ingredientDescription}>
                            <Text style={{...FONTS.body3}}>{item.key}</Text>
                        </View>
                        
                    </View>
                )}
            />
            {/* header bar */}
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


export default Recipe;