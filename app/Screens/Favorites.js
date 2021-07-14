import React, {Component} from 'react';
import {  View , ScrollView, ActivityIndicator,TouchableOpacity,Text } from 'react-native';
import {connect} from 'react-redux';
import * as favoritesAction from '../store/actions/favoriteAction'
import { styles } from '../style/style';
import LaunchCard from '../Common/LaunchCard';
import { WebView } from 'react-native-webview';
import * as wikiAction from '../store/actions/wikiAction'


class Favorites extends Component {

  constructor(props){
        super(props)
    }

 /** 
   * Return to application from Wiki WebView
   */
   handleBackButton = () => {
          this.props.showWiki(false,this.props.wikiURL)
      };

      renderContent() {
        return (
          <View style={{flex:1}}>
          <WebView
            source={{
               uri: this.props.wikiURL
              }}
            startInLoadingState={true}
            renderLoading={() => (
              <ActivityIndicator
                color='black'
                size='large'
                style={styles.flexContainer}
              />
            )}
        /> 
          {/*Back to application button */}
          <TouchableOpacity onPress={this.handleBackButton}>
              <Text style={styles.back_button}>Back To Application</Text>
            </TouchableOpacity>
          </View>
      
        );
       }
        
    render(){
        return(
          <View style={{flex:1}}>
            {/* Check if to show wiki page */}
            {this.props.showWebView ? 
                 this.renderContent()
                 :
                 //Check if the favorites list is empty
                    this.props.favorites.length===0  ?                       
                      <View style={styles.container}>
                        <Text styles={{fontSize:20}}>Your favorites list is empty</Text>
                      </View>
                      :
                      <ScrollView >
                        {this.props.favorites.map((u, i) => {
                        return (
                          <View key={i} >
                              {/*Create a card for each favorite launch*/}
                              <LaunchCard name={u.name} image={u.image} country={u.country} date={u.date} url={u.wiki} status={u.status} />
                           
                      </View>
              );
            }
            )}
            </ScrollView>
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
  mapDispatchToProps)(Favorites);

