import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import { FONTS, COLORS, SIZES } from "../constants/theme.js"
import { ICONS } from "../constants/icons.js"
import { DUMMYDATA } from "../constants/dummyData.js"
import SearchCard from "../components/SearchCard.js"


const Search = function({navigation}){

  const [search, setSearch] = useState("");

  function renderSearchBar(){
    return(
      <View style={styles.searchBarContainer}>
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

  function renderIngredientSection(){
    return(
      <View>

        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>
            Search by Ingredients
          </Text>

          <TouchableOpacity style={{justifyContent:'center'}}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
          
        </View>

        <FlatList
          data={DUMMYDATA.ingredients}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item=>`${item.id}`}
          renderItem={({item,index})=>{
            return(
              <SearchCard
                containerStyle={{marginLeft: index == 0 ? 10 : 0}}
                recipeItem={item}
                onPress={()=>navigation.navigate("Results",{searchQuery:item.name, excluded:false})}
              />
            )
          }}
        />

      </View>
    )
  }

  function renderMealTypeSection(){
    return(
      <View>

        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>
            Search by Meal Types
          </Text>

          <TouchableOpacity style={{justifyContent:'center'}}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
          
        </View>

        <FlatList
          data={DUMMYDATA.mealtype}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item=>`${item.id}`}
          renderItem={({item,index})=>{
            return(
              <SearchCard
                containerStyle={{marginLeft: index == 0 ? 10 : 0}}
                recipeItem={item}
                onPress={()=>navigation.navigate("Results",{searchQuery:item.name, excluded:false})}
              />
            )
          }}
        />

      </View>
    )
  }

  function renderDishTypeSection(){
    return(
      <View>

        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>
            Search by Dish Types
          </Text>

          <TouchableOpacity style={{justifyContent:'center'}}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
          
        </View>

        <FlatList
          data={DUMMYDATA.dishtype}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item=>`${item.id}`}
          renderItem={({item,index})=>{
            return(
              <SearchCard
                containerStyle={{marginLeft: index == 0 ? 10 : 0}}
                recipeItem={item}
                onPress={()=>navigation.navigate("Results",{searchQuery:item.name, excluded:false})}
              />
            )
          }}
        />

      </View>
    )
  }

  function renderIntoleranceTypeSection(){
    return(
      <View>
        
        <View style={styles.headingContainer}>

          <View style={styles.textContainer}>
            <Text style={styles.headingText}>
              Search by Intolerance Types
            </Text>
            <Text style={styles.subheadingText}>
              *Recipes will exclude selected ingredients
            </Text>
          </View>

          <TouchableOpacity style={{justifyContent:'center'}}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
          
        </View>

        <FlatList
          data={DUMMYDATA.intolerancetype}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item=>`${item.id}`}
          renderItem={({item,index})=>{
            return(
              <SearchCard
                containerStyle={{marginLeft: index == 0 ? 10 : 0}}
                recipeItem={item}
                onPress={()=>navigation.navigate("Results",{searchQuery:item.name,excluded:true})}
              />
            )
          }}
        />

      </View>
    )
  }

  function renderPrepTypeSection(){
    return(
      <View>
        
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>
            Search by Preparation Types
          </Text>

          <TouchableOpacity style={{justifyContent:'center'}}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
          
        </View>

        <FlatList
          data={DUMMYDATA.preptype}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item=>`${item.id}`}
          renderItem={({item,index})=>{
            return(
              <SearchCard
                containerStyle={{marginLeft: index == 0 ? 10 : 0}}
                recipeItem={item}
                onPress={()=>navigation.navigate("Results",{searchQuery:item.name, excluded:false})}
              />
            )
          }}
        />

      </View>
    )
  }

  return(
      <SafeAreaView style={{flex:1, backgroundColor:COLORS.white}}>

        {/* Text */}
        <View style={styles.headerContainer}>
          <Text style={{color:COLORS.grey,...FONTS.body3}}>What's tickling your taste buds today?</Text>
        </View>

        {renderSearchBar()}

        <FlatList
          keyExtractor={item=>`${item.id}`}
          keyboardDismissMode='on-drag'
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View>
              {/* search by ingredients */}
              {renderIngredientSection()}
              
              {/* search by meal type */}
              {renderMealTypeSection()}
              
              {/* search by dish type */}
              {renderDishTypeSection()}
              
              {/* search by intolerance type */}
              {renderIntoleranceTypeSection()}
              
              {/* search by preparation type */}
              {renderPrepTypeSection()}
            </View>
          }

        >
        

        </FlatList>

       </SafeAreaView>

  )

  // return (
  //   <div className="App">
  //     <form onSubmit={getSearch} className="search-form">
  //       <input className="search-bar" type="text" value={search} onChange={updateSearch}></input>
  //       <button className="search-button" type="submit">Search</button>
  //     </form>
  //     <div className="recipes">
  //     {recipes.map(recipe => (
  //       <Recipe 
  //       key={recipe.recipe.label}
  //       title={recipe.recipe.label} 
  //       calories={recipe.recipe.calories} 
  //       image={recipe.recipe.image} 
  //       ingredients={recipe.recipe.ingredients}
  //       />
  //     ))}
  //     </div>
  //   </div>
  // )
}

const styles = StyleSheet.create({

  headerContainer: {
    flexDirection: 'row',
    marginHorizontal: SIZES.padding,
    marginTop: -20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
  },

  searchBarContainer: {
    flexDirection: 'row',
    height: 50,
    marginTop: -20,
    marginBottom: 10,
    alignItems: 'center',
    marginHorizontal: SIZES.padding,
    paddingHorizontal: SIZES.radius,
    borderRadius: 10,
    backgroundColor: COLORS.lightGrey
  },

  headingContainer: {
    flexDirection: 'row',
  },

  textContainer: {
    flexDirection: 'column',
    flex:1,
  },

  headingText: {
    flex:1,
    marginTop: 10, 
    marginHorizontal: SIZES.padding, 
    ...FONTS.h2
  },

  subheadingText: {
    flex:1,
    marginHorizontal: SIZES.padding, 
    ...FONTS.body4
  },

  viewAllText: {
    right: 10,
    // top: 15,
    color: COLORS.lightGrey2,
    textDecorationLine: 'underline',
    ...FONTS.body4,
  },

})


export default Search;