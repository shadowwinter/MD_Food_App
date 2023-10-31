import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native';
import { FONTS, COLORS, SIZES } from "../constants/theme.js"
import { ICONS } from "../constants/icons.js"
import { IMAGES } from "../constants/images.js"
import { DUMMYDATA } from "../constants/dummyData.js"
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';

import CategoryCard from "../components/CategoryCard.js"
import HorizontalCard from "../components/HorizontalCard.js"

const Home = function({navigation}) {
  

  function renderHeader(){
    return(
      <View style={styles.headerContainer}>
        
        {/* Text */}
        <View style={{flex:1}}>
          <Text style={{color:COLORS.darkGreen,...FONTS.h1}}>Hello User,</Text>
          <Text style={{marginTop:3,color:COLORS.grey,...FONTS.body3}}>What's your appetite whispering to you?</Text>
        </View>

        {/* Image */}
        <TouchableOpacity onPress={()=>navigation.navigate("Landing")}>
          <Image 
            source={ICONS.profile}
            style={{width:40,height:40,borderRadius:20}}
            tintColor={COLORS.darkGreen}
          />
        </TouchableOpacity>
      </View>
    )
  }
  
  const [search, setSearch] = useState("");

  function renderSearchBar(){
    return(
      <View style={styles.searchBarContainer}>
        {/* ///////////////////////////////// */}
        <TouchableOpacity onPress={()=>navigation.navigate("Results",{searchQuery:search})}> 
          <Image
            source={ICONS.search}
            style={{width:20, height:20, tintColor:COLORS.grey}}
          />
        </TouchableOpacity>
        <TextInput
          style={{marginLeft: SIZES.radius, width:'100%', ...FONTS.body3}}
          placeholderTextColor={COLORS.grey}
          placeholder="Search Recipes"
          onChangeText={text => setSearch(text)}
        />
      </View>
    )
  }

  function renderSeeRecipeCard(){
    return(
      <View style={styles.recipeCardContainer}>
        
        {/* Image */}
        <View style={{width:100, alignItems:'center', justifyContent:'center'}}>
          
          <Image
            source={IMAGES.recipe}  
            style={{width:80,height:80}}
          />

        </View>
        
        {/* Text */}
        <View style={{flex:1, paddingVertical:SIZES.radius}}>
          
          <Text style={{width:'70%',...FONTS.body4}}>
            You have 7 saved recipes that you have yet to try
          </Text>
          
          <TouchableOpacity 
            style={{marginTop:10}}
            onPress={()=>navigation.navigate("Bookmarks")}
          >  
            <Text style={{color:COLORS.darkGreen,textDecorationLine:'underline',...FONTS.h4}}>
              See Recipes
            </Text>
          </TouchableOpacity>

        </View>

      </View>
    )
  }

  function renderTrendingSection(){
    return(
      <View style={{marginTop: SIZES.padding}}>
        
        <Text style={{marginHorizontal: SIZES.padding, ...FONTS.h2}}>
          Trending Recipes
        </Text>

        <FlatList
          data={DUMMYDATA.trendingRecipes}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item=>`${item.id}`}
          renderItem={({item,index})=>{
            return(
              <HorizontalCard
                containerStyle={{marginLeft: index == 0 ? SIZES.padding : 0}}
                recipeItem={item}
                onPress={()=>navigation.navigate("Recipe",{recipe:item})}
              />
            )
          }}
        />

      </View>
    )
  }

  function renderCategoryHeader(){
    return(
      <View style={styles.categoryContainer}>
        
        {/* Section Title */}
        <Text style={{flex:1,...FONTS.h2}}> 
          Categories 
        </Text>

        {/* View all  */}
        <TouchableOpacity>
          <Text style={{color:COLORS.grey,textDecorationLine:'underline',...FONTS.body4}}>
            View All
          </Text>
        </TouchableOpacity>


      </View>
    )
  }

  return (
    <SafeAreaView style={{flex:1, backgroundColor:COLORS.white}}>
      
      <FlatList
        data={DUMMYDATA.categories}
        keyExtractor={item=>`${item.id}`}
        keyboardDismissMode='on-drag'
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* Header */}
            {renderHeader()}

            {/* Search bar */}
            {renderSearchBar()}
            
            {/* See Recipe Card */}
            {renderSeeRecipeCard()}
            
            {/* Trending Section */}
            {renderTrendingSection()}
            
            {/* Category Header */}
            {renderCategoryHeader()}

          </View>
        }
        renderItem={({item})=>{
          return(
            <CategoryCard
              containerStyle={{
                marginHorizontal: SIZES.padding
              }}
              categoryItem={item}
              onPress={()=>navigation.navigate("Recipe",{recipe:item})}
            />
          )
        }}
        ListFooterComponent={
          <View
            style={{marginBottom:100}}
          />
        }
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    marginHorizontal: SIZES.padding,
    alignItems: 'center',
    height: 80
  },

  searchBarContainer: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    marginHorizontal: SIZES.padding,
    paddingHorizontal: SIZES.radius,
    borderRadius: 10,
    backgroundColor: COLORS.lightGrey
  },

  recipeCardContainer: {
    flexDirection: 'row',
    marginTop: SIZES.padding,
    marginHorizontal: SIZES.padding,
    borderRadius: 10,
    backgroundColor: COLORS.lightGreen
  },

  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: SIZES.padding
  },

});


export default Home;