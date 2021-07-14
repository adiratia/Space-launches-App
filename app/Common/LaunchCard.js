
import React,{Component} from 'react'
import { Card,CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import {connect} from 'react-redux';
import * as favoritesAction from '../store/actions/favoriteAction'
import * as wikiAction from '../store/actions/wikiAction'
import {  View , ActivityIndicator,Alert } from 'react-native';

class LaunchCard extends Component {
    constructor(props){
        super(props)
        this.currentRocket = []
    }  

 /**
 * Get Wiki url from api
 * @param {Object} u The selected launch
 */
  showWikiWebView = async(url) => {  
  //Get current launch instance
  if(typeof(url) !=='undefined'){
       this.props.is_Loading(true)
      //Get rocket details
      await fetch(url) 
      .then((response) => response.json()).catch((error) => console.error(error)) // response from API
      .then((json) => {
        this.currentRocket=json
      } )
      .catch((error) => console.error(error))
      //Check if wiki_url exist
      if(typeof(this.currentRocket.manufacturer) !=='undefined'){
        //set the wiki url to the global state
          this.props.showWiki(true,this.currentRocket.manufacturer.wiki_url)
          this.props.is_Loading(false)

      }
      else{
        Alert.alert(
          "Error",
          "Request was throttled",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }]
        );
        this.props.is_Loading(false)
      }

     }
  else{
      Alert.alert(
        "Error",
        "Request was throttled",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
      this.props.is_Loading(false)

      }
  }
    render(){
        return(
        <View style={{flex:1}}>
            {/*Check if to show the WebView of launches list */}
         {
             this.props.isLoading ? <ActivityIndicator size="large"  />
         :
         
            <Card>
            <CardImage 
              source={{uri: this.props.image}} 
              title={this.props.name}
            />
            <CardContent text={'Date of launch :' + this.props.date} />
            <CardContent text={"Location :"+ this.props.country} />
            <CardContent text={"Status : " + this.props.status} />
            <CardAction 
              separator={true} 
              inColumn={false}>
           {/*Favorite button */}
            <CardButton
                onPress={
                  this.props.favorites.filter(f => f.name === this.props.name).length > 0 ?
                  ()=>{this.props.removeFromFavorites(this.props.name)}
                   :
                  ()=>{this.props.addToFavorites(this.props.name,this.props.image,this.props.date,this.props.status,
                                                  this.props.country,this.props.url)}}
           
                title={this.props.favorites.filter(f => f.name === this.props.name).length > 0 ? "Remove From Favorites" : "Add to favorites"}
                color={this.props.favorites.filter(f => f.name === this.props.name).length > 0 ? "red" : "blue"}

              />
            {/*Wiki page button */}
              <CardButton
                onPress={()=>{
                    this.showWikiWebView(this.props.url)}
                }
                title="Wiki page"
                color="blue"
              />
            </CardAction>
          </Card>
    }
    </View>
        )
    }


}

/**
 * Map the global favorites state to props
*/
const mapStateToProps = state =>{
    return {
      ...state.favorites,
      ...state.wiki

    }
}
/**
 * Map the dispatch to props
*/
const mapDispatchToProps =dispatch =>{
    return {
      addToFavorites:(name,image,date,status,country,wiki)=>{
        dispatch(favoritesAction.addToFavorites(name,image,date,status,country,wiki));
    },
    removeFromFavorites:(name)=>{
      dispatch(favoritesAction.removeFromFavorites(name));
  },
    showWiki: (showWebView,wikiURL) =>{
      dispatch(wikiAction.showWiki(showWebView,wikiURL));

    },
    is_Loading : (isLoading) =>{
      dispatch(wikiAction.is_Loading(isLoading))
    }
}
}
export default connect(
  mapStateToProps,
  mapDispatchToProps)(LaunchCard);

